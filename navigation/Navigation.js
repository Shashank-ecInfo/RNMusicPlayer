import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Feather from "react-native-vector-icons/Feather";
import { COLORS, FONTS } from "../constants";
import { useSelector } from "react-redux";
import Album from "../screens/Album";
import MusicPlayer from "../screens/MusicPlayer";
import Home from "../screens/Home";

const Stack = createStackNavigator();

const headerOptions = ({ navigation, title }) => {
  return {
    headerShown: true,
    headerStyle: {
      borderBottomColor: "#CCCCCC",
      borderBottomWidth: 0.2,
      backgroundColor: "#ffffff",
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTitleAlign: "center",
    title: title ? title : "",
    headerLeft: () => (
      <Feather
        name="chevron-left"
        size={26}
        onPress={() => {
          navigation.goBack();
        }}
        style={{ marginLeft: 10, width: 50 }}
        color="#000000"
      />
    ),
  };
};

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Library" component={Home} />
      <Stack.Screen
        name="Album"
        component={Album}
        // options={({ navigation }) =>
        //   headerOptions({ navigation, title: "Album" })
        // }
      />
      <Stack.Screen
        name="MusicPlayer"
        component={MusicPlayer}
        // options={({ navigation }) =>
        //   headerOptions({ navigation, title: "Music Player" })
        // }
      />
    </Stack.Navigator>
  );
};

export default AppStack;
