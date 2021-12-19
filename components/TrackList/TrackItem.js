import moment from "moment";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS, icons, SIZES } from "../../constants";

const TrackItem = ({ item, navigation, data }) => {
  return (
    <TouchableOpacity
      style={styles.albumCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("MusicPlayer", { track: item, data: data })
      }
    >
      <View style={styles.avatar}>
        <Image source={icons.Music} style={{ width: 35, height: 35 }} />
      </View>
      <View style={styles.albumDetails}>
        <View style={styles.albumDetailsCont}>
          <Text style={styles.albumName}>{item.name}</Text>
        </View>
        {item.playbackSeconds !== undefined ? (
          <Text style={styles.albumTrackCount}>
            {Math.round(item.playbackSeconds / 60)} minutes
          </Text>
        ) : null}
        <View style={styles.albumDetailsCont}>
          <Text style={styles.artistName}>{item.artistName}</Text>
        </View>
        {item.originallyReleased !== undefined ? (
          <Text style={styles.releasedDate}>
            {moment(item.originallyReleased).format("MMMM YYYY")}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default TrackItem;

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
