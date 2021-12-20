import React from "react";
import { View, Text, Modal, Image, StyleSheet, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS, icons, SIZES } from "../constants";

export default function TrackPlayerScreen({
  isVisible,
  onCloseModal,
  selectedMusic,
  isPlaying,
  playOrPause,
  onSeekTrack,
  onPressNext,
  onPressPrev,
  selectedMusicIndex,
  tracksArr,
  progress,
  fiveSecBackward,
  fiveSecForward,
}) {
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      presentationStyle="fullScreen"
    >
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary, COLORS.semantic]}
        style={styles.container}
      >
        <Pressable
          onPress={onCloseModal}
          style={{
            position: "absolute",
            top: 45,
            left: 30,
          }}
        >
          <Ionicons name="chevron-down" size={30} color={COLORS.white} />
        </Pressable>
        <Text style={styles.mainText}>Playing from RN music Player</Text>
        <Text style={[styles.mainText, { fontWeight: "bold" }]}>
          {selectedMusic.album}
        </Text>
        <View style={styles.trackImageWrapper}>
          <Image
            source={icons.Track}
            style={styles.trackImg}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.trackName}>{selectedMusic.title}</Text>
          <Text style={styles.trackArtistName}>{selectedMusic.artist}</Text>
        </View>
        <Slider
          style={styles.progressContainer}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor={COLORS.secondary}
          minimumTrackTintColor={COLORS.secondary}
          maximumTrackTintColor={COLORS.white}
          onSlidingComplete={(value) => {
            onSeekTrack(value);
          }}
        />

        {/* Track progress indicators */}
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
          </Text>
          <Text style={styles.progressLabelText}>
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
          </Text>
        </View>

        {/* All the media controls */}
        <View style={styles.musicControls}>
          {/* Button for backwarding song 5 seconds */}
          <Pressable onPress={fiveSecBackward}>
            <Ionicons
              name="play-back-outline"
              size={35}
              color={COLORS.neutral}
            />
          </Pressable>

          {/* Button for playing previous song */}
          <Pressable
            onPress={onPressPrev}
            disabled={selectedMusicIndex === 0 ? true : false}
          >
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color={selectedMusicIndex === 0 ? COLORS.gray : COLORS.neutral}
            />
          </Pressable>

          {/* Button for playing and pausing current track */}
          <Pressable onPress={playOrPause}>
            <Ionicons
              name={isPlaying ? "ios-pause-circle" : "ios-play-circle"}
              size={70}
              color={COLORS.neutral}
            />
          </Pressable>

          {/* Button for playing next song */}
          <Pressable
            onPress={onPressNext}
            disabled={
              selectedMusicIndex === tracksArr.length - 1 ? true : false
            }
          >
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color={
                selectedMusicIndex === tracksArr.length - 1
                  ? COLORS.gray
                  : COLORS.neutral
              }
            />
          </Pressable>

          {/* Button for backwarding song 5 seconds */}
          <Pressable onPress={fiveSecForward}>
            <Ionicons
              name="play-forward-outline"
              size={35}
              color={COLORS.neutral}
            />
          </Pressable>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191414",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 20,
  },
  boldMainText: {
    ...FONTS.h2,
    color: COLORS.white,
    fontWeight: "500",
  },
  mainText: {
    ...FONTS.h3,
    color: COLORS.white,
    opacity: 0.8,
  },
  linearGradient: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWidth: {
    width: 30,
    height: 30,
    tintColor: COLORS.white,
  },
  timeStampHolder: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  playButtonHolder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  trackImageWrapper: {
    width: 300,
    height: 320,
    marginVertical: SIZES.height * 0.08,
  },
  trackImg: {
    width: "100%",
    height: "100%",
  },
  trackName: {
    ...FONTS.h1,
    fontWeight: "600",
    color: COLORS.white,
    textAlign: "center",
  },
  trackArtistName: {
    ...FONTS.h4,
    fontWeight: "500",
    color: COLORS.gray,
    textAlign: "center",
  },
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: SIZES.SPACING,
    flexDirection: "row",
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    ...FONTS.h5,
    color: COLORS.neutral,
    fontWeight: "normal",
  },
  musicControls: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width * 0.7,
    justifyContent: "space-between",
    marginTop: SIZES.SPACING,
  },
});
