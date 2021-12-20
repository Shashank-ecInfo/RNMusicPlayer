import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { API_KEY } from "../../utils/https";

const ListItem = ({ item, navigation }) => {
  const [loading, setLoading] = useState(false);

  const initTrackData = () => {
    setLoading(true);

    const getTracks = axios.get(`${item.links.tracks.href}?apikey=${API_KEY}`);
    const getImages = axios.get(`${item.links.images.href}?apikey=${API_KEY}`);

    let temp_tracks = [];
    let temp_image = {};

    axios
      .all([getTracks, getImages])
      .then(
        axios.spread((...responseJson) => {
          if (responseJson[0].status === 200) {
            setLoading(false);
            temp_tracks = responseJson[0].data.tracks.map((t) => ({
              url: t.previewURL,
              title: t.name,
              artist: t.artistName,
              album: t.albumName,
              genre: "Rock",
              artwork: "https://www.bensound.com/bensound-img/punky.jpg",
              duration: t.playbackSeconds,
            }));
          } else {
            setLoading(false);
            console.log("Something wrong");
          }
          if (responseJson[1].status === 200) {
            setLoading(false);
            temp_image = responseJson[1].data.images.filter(
              (i) => i.height === 500
            )[0];
          } else {
            setLoading(false);
            console.log("Something wrong");
          }
          navigation.navigate("Album", {
            tracks: temp_tracks,
            image: temp_image.url,
            album: item,
          });
        })
      )
      .catch((error) => console.error(error))
      .done(() => {
        setLoading(false);
      });
  };

  return (
    <TouchableOpacity
      style={styles.albumCard}
      activeOpacity={0.8}
      onPress={initTrackData}
    >
      <View style={styles.avatar}>
        <Image source={icons.Music} style={{ width: 35, height: 35 }} />
      </View>
      <View style={styles.albumDetails}>
        <View style={styles.albumDetailsCont}>
          <Text style={styles.albumName}>{item.name}</Text>
        </View>
        <View style={styles.albumDetailsCont}>
          <Text style={styles.artistName}>{item.artistName}</Text>
        </View>
        {item.trackCount !== undefined ? (
          <Text
            style={styles.albumTrackCount}
          >{`${item.trackCount} songs`}</Text>
        ) : null}
        {item.originallyReleased !== undefined ? (
          <Text style={styles.releasedDate}>
            {moment(item.originallyReleased).format("MMMM YYYY")}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
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
  albumDetails: {
    flexDirection: "column",
  },
  albumDetailsCont: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: SIZES.width * 0.65,
  },
  albumName: {
    color: COLORS.white,
    ...FONTS.h4,
    fontWeight: "600",
  },
  albumTrackCount: {
    color: COLORS.gray,
    ...FONTS.h5,
    fontWeight: "500",
  },
  artistName: {
    color: COLORS.gray,
    ...FONTS.h5,
    fontWeight: "500",
  },
  releasedDate: {
    color: COLORS.accent,
    ...FONTS.h5,
    fontWeight: "500",
    opacity: 0.8,
  },
});
