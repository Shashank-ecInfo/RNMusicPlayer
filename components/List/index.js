import React from "react";
// import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SIZES } from "../../constants";
import ListItem from "./ListItem";

const List = ({ data, navigation }) => {
  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: SIZES.SPACING * 8,
      }}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <ListItem item={item} navigation={navigation} />
      )}
    />
  );
};

export default List;
