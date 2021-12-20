import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

import PlayerModal from "../components/TrackPlayerScreen";
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { COLORS, FONTS, icons, SIZES } from "../constants";

const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.RemotePlay,
  Event.RemotePause,
];

export default function TrackListScreen(props) {
  // Methods related to react-native-track-player
  const playbackState = usePlaybackState();
  const progress = useProgress();

  // Data coming from previous screen
  const tracksArr = props.route.params.tracks;
  const albumImg = props.route.params.image;

  // state variables to hold the state of selected track and modal for music player
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedMusicIndex, setSelectedMusicIndex] = useState(null);
  const [isPlayerModalVisible, setisPlayerModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(tracksArr);
  };

  useEffect(() => {
    setupPlayer();
  }, []);

  const { position } = useProgress();

  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn("An error occured while playing the current track.");
    }
    if (event.type === Event.PlaybackState) {
      console.log(event.type);
    }
    if (event.type === Event.RemotePlay) {
      console.log(event.type);
    }
    if (event.type === Event.RemotePause) {
      console.log(event.type);
    }
  });

  const PlaylistImageView = () => (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary, COLORS.semantic]}
      style={styles.linearGradient}
    >
      <Image
        style={{ width: 200, height: 200, marginVertical: SIZES.SPACING }}
        source={albumImg === "" ? icons.Track : { uri: albumImg }}
      />
      <Text style={styles.musicTitle}>{props.route.params.album.name}</Text>
      <Text style={styles.trackCount}>
        {props.route.params.album.trackCount} songs
      </Text>
    </LinearGradient>
  );

  const onSelectTrack = async (selectedTrack, index) => {
    await TrackPlayer.skip(index);
    setSelectedMusic(selectedTrack);
    setSelectedMusicIndex(index);
    playOrPause();
  };

  const playOrPause = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    const isCurrentTrack = currentTrack === selectedMusicIndex;

    if (currentTrack !== null) {
      if (playbackState === State.Paused && isCurrentTrack) {
        setIsPlaying(!isPlaying);
        await TrackPlayer.play();
        return;
      }

      if (playbackState === State.Playing && isCurrentTrack) {
        setIsPlaying(!isPlaying);
        await TrackPlayer.pause();
        return;
      }
    }
    setIsPlaying(true);
    await TrackPlayer.play();
  };

  const onSeekTrack = async (newTimeStamp) => {
    await TrackPlayer.seekTo(newTimeStamp);
  };

  const fiveSecForward = async () => {
    await TrackPlayer.seekTo(progress.position + 5);
  };

  const fiveSecBackward = async () => {
    await TrackPlayer.seekTo(progress.position - 5);
  };

  const onPressNext = async () => {
    setSelectedMusic(tracksArr[(selectedMusicIndex + 1) % tracksArr.length]);
    setSelectedMusicIndex(selectedMusicIndex + 1);
    await TrackPlayer.skipToNext();
    playOrPause();
  };

  const onPressPrev = async () => {
    if (selectedMusicIndex === 0) {
      return;
    }
    setSelectedMusic(tracksArr[(selectedMusicIndex - 1) % tracksArr.length]);
    setSelectedMusicIndex(selectedMusicIndex - 1);
    await TrackPlayer.skipToPrevious();
    playOrPause();
  };

  const renderSingleMusic = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => onSelectTrack(item, index)}
        style={styles.albumCard}
      >
        <View style={styles.avatar}>
          {index === selectedMusicIndex ? (
            <Ionicons name="play-outline" size={40} color={COLORS.white} />
          ) : (
            <Image source={icons.Music} style={{ width: 35, height: 35 }} />
          )}
        </View>
        <View>
          <Text style={styles.musicTitle}>{item.title}</Text>
          <Text style={styles.artisteTitle}>{item.artist}</Text>
          <Text style={styles.albumTrackCount}>
            {Math.round(item.duration / 60)} minutes
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <PlaylistImageView />
      {selectedMusic && (
        <PlayerModal
          onCloseModal={() => setisPlayerModalVisible(false)}
          isVisible={isPlayerModalVisible}
          isPlaying={isPlaying}
          playOrPause={playOrPause}
          selectedMusic={selectedMusic}
          onSeekTrack={onSeekTrack}
          timestamp={Math.round(position)}
          onPressNext={onPressNext}
          onPressPrev={onPressPrev}
          selectedMusicIndex={selectedMusicIndex}
          tracksArr={tracksArr}
          progress={progress}
          fiveSecBackward={fiveSecBackward}
          fiveSecForward={fiveSecForward}
        />
      )}
      <FlatList
        data={tracksArr}
        keyExtractor={(item) => item.url}
        renderItem={renderSingleMusic}
        style={{ backgroundColor: COLORS.primary }}
      />
      {selectedMusic && (
        <Pressable onPress={() => setisPlayerModalVisible(true)}>
          <LinearGradient
            style={styles.widgetContainer}
            colors={[COLORS.secondary, COLORS.primary, COLORS.gray]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                resizeMode="cover"
                source={{ uri: selectedMusic.artwork }}
                style={styles.widgetImageStyle}
              />
              <View>
                <Text style={styles.widgetMusicTitle}>
                  {selectedMusic.title}
                </Text>
                <Text style={styles.widgetArtisteTitle}>
                  {selectedMusic.artist}
                </Text>
              </View>
            </View>
            <Pressable onPress={() => playOrPause()}>
              <Ionicons
                name={isPlaying ? "ios-pause-circle" : "ios-play-circle"}
                size={50}
                color={COLORS.neutral}
              />
            </Pressable>
          </LinearGradient>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  albumCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.SPACING,
    marginBottom: SIZES.SPACING,
  },
  avatar: {
    width: SIZES.AVATAR_SIZE,
    height: SIZES.AVATAR_SIZE,
    borderRadius: SIZES.AVATAR_SIZE,
    backgroundColor: COLORS.semantic,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SIZES.SPACING,
  },
  musicTitle: {
    ...FONTS.h3,
    color: COLORS.white,
    fontWeight: "600",
  },
  trackCount: {
    ...FONTS.h3,
    color: COLORS.neutral,
    marginVertical: SIZES.SPACING / 2,
  },
  artisteTitle: {
    color: COLORS.gray,
    ...FONTS.h5,
    fontWeight: "500",
  },
  widgetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.base,
    height: 70,
    width: "100%",
  },
  widgetMusicTitle: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "500",
    marginLeft: SIZES.base,
  },
  widgetArtisteTitle: {
    ...FONTS.h4,
    color: COLORS.white,
    opacity: 0.8,
    marginLeft: SIZES.base,
  },
  widgetImageStyle: {
    width: 55,
    height: 60,
    marginTop: 3,
  },
  linearGradient: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.SPACING,
  },
  shuffleButton: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  shuffleButtonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 40,
    alignSelf: "center",
    backgroundColor: "#1DB954",
  },
  albumTrackCount: {
    color: COLORS.gray,
    ...FONTS.h5,
    fontWeight: "500",
  },
});
