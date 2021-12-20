import React from "react";
import { StyleSheet, View } from "react-native";
import { Spinner } from "native-base";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../constants";
import ListItem from "./ListItem";

const List = ({ data, navigation, isLoading, handleLoadMore }) => {
  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <Spinner size="lg" color={COLORS.accent} />
      </View>
    ) : null;
  };
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
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  loader: {
    marginTop: SIZES.base,
    alignItems: "center",
  },
});
