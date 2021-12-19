import React from "react";
// import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SIZES } from "../../constants";
import TrackItem from "./TrackItem";

const TrackList = ({ data, navigation }) => {
  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: SIZES.SPACING * 8,
      }}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <TrackItem item={item} navigation={navigation} data={data} />
      )}
    />
  );
};

export default TrackList;
