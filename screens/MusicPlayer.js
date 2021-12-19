import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

import { COLORS, FONTS, icons, SIZES } from "../constants";

const MusicPlayer = (props) => {
  const track = props.route.params.track;
  const tracks = props.route.params.data;

  const initIndex = tracks.findIndex((t) => t.id === track.id);

  const [songIndex, setSongIndex] = useState(initIndex);

  const ref = React.useRef(null);
  // const scrollX = React.useRef(new Animated.Value(0)).current;

  console.log("Index>>>>>>>>", initIndex);

  useEffect(() => {
    // scrollX.addListener(({ value }) => {
    //   const index = Math.round((value * initIndex) / SIZES.width);
    //   setSongIndex(index);
    //   console.log(index);
    // });
    // ref.current?.scrollToIndex({
    //   songIndex,
    //   animated: true,
    //   // viewPosition, //percentage from the viewport starting from LHS
    // });
  }, [songIndex]);

  const renderSongs = ({ index, item }) => {
    console.log("Flatlist>>>>>", index);
    return (
      <Animated.View
        style={{
          width: SIZES.width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.trackImageWrapper}>
          <Image
            source={icons.Track}
            style={styles.trackImg}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.trackName}>{item.name}</Text>
          <Text style={styles.trackArtistName}>{item.artistName}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={ref}
        renderItem={renderSongs}
        data={tracks}
        keyExtractor={(item) => item.id}
        horizontal
        initialScrollIndex={songIndex}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        // onScroll={Animated.event(
        //   [
        //     {
        //       nativeEvent: {
        //         contentOffset: { x: scrollX },
        //       },
        //     },
        //   ],
        //   { useNativeDriver: true }
        // )}
      />
      <View>
        <Slider
          style={styles.progressContainer}
          value={10}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor={COLORS.secondary}
          minimumTrackTintColor={COLORS.secondary}
          maximumTrackTintColor={COLORS.white}
          onSlidingComplete={() => {}}
        />
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>0:00</Text>
          <Text style={styles.progressLabelText}>3:00</Text>
        </View>
      </View>
      <View style={styles.musicControls}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons
            name="play-skip-back-outline"
            size={35}
            color={COLORS.neutral}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="ios-pause-circle" size={70} color={COLORS.neutral} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons
            name="play-skip-forward-outline"
            size={35}
            color={COLORS.neutral}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  trackImageWrapper: {
    width: 300,
    height: 320,
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
    width: "60%",
    justifyContent: "space-between",
    marginTop: SIZES.SPACING,
  },
});
