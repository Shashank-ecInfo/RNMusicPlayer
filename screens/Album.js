import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import List from "../components/List";
import { COLORS, FONTS, SIZES } from "../constants";
import { API_KEY } from "../utils/https";
import styled from "styled-components/native";
import { Spinner } from "native-base";
import TrackList from "../components/TrackList";

const Album = (props) => {
  const [loading, setLoading] = useState(false);
  const [tracksArr, setTracksArr] = useState([]);

  const { images, tracks } = props.route.params.album.links;

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${tracks.href}?apikey=${API_KEY}`,
    })
      .then((res) => {
        console.log(res.data.tracks);
        setLoading(false);
        setTracksArr(res.data.tracks);
      })
      .catch((err) => {
        setLoading(false);
        setTracksArr([]);
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading ? (
        <SpinnerCont>
          <Spinner size="lg" color="#00BFF9" />
        </SpinnerCont>
      ) : (
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Album</Text>
          <TrackList data={tracksArr} navigation={props.navigation} />
        </SafeAreaView>
      )}
    </>
  );
};

export default Album;

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
});
