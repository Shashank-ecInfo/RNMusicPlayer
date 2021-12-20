import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { COLORS, FONTS, SIZES, STYLES } from "../constants";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../store/actions/albumAction";
import List from "../components/List";
import { Spinner } from "native-base";

const Home = (props) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(getAlbums(offset));
    return () => {};
  }, [offset]);

  const albums = useSelector((state) => state.albumState.albums);
  const isLoading = useSelector((state) => state.albumState.isLoading);

  useEffect(() => {
    setFilteredAlbums(albums);
  }, [albums]);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    setFilteredAlbums(
      albums.filter((album) =>
        album.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const handleLoadMore = () => {
    setOffset(offset + 20);
  };

  return (
    <>
      {isLoading ? (
        <SpinnerCont>
          <Spinner size="lg" color="#00BFF9" />
        </SpinnerCont>
      ) : (
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Library</Text>
          <View style={styles.searchBar}>
            <Icon
              name="search1"
              color={COLORS.gray}
              size={SIZES.h2}
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="search"
              placeholder="Search for Album"
              placeholderTextColor={COLORS.gray}
              value={searchText}
              onChangeText={(text) => handleSearch(text)}
            />
          </View>
          <View>
            <View>
              <Text style={styles.subHeader}>Top Albums</Text>
            </View>
            <List
              data={filteredAlbums}
              navigation={props.navigation}
              isLoading={isLoading}
              handleLoadMore={handleLoadMore}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Home;

const SpinnerCont = styled.SafeAreaView`
  flex: 1;
  background: ${COLORS.primary};
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: SIZES.SPACING,
  },
  header: {
    ...FONTS.title,
    color: COLORS.secondary,
    lineHeight: 36,
  },
  subHeader: {
    ...FONTS.h2,
    color: COLORS.neutral,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: COLORS.semantic,
    padding: 10,
    ...STYLES.shadow,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    marginVertical: SIZES.SPACING,
  },
  searchInput: {
    ...FONTS.h3,
    color: COLORS.gray,
    marginLeft: SIZES.base,
  },
});
