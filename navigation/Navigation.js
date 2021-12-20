import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Feather from "react-native-vector-icons/Feather";
import { COLORS } from "../constants";
import Album from "../screens/Album";
import Home from "../screens/Home";

const Stack = createStackNavigator();

const headerOptions = ({ navigation }) => {
  return {
    headerShown: true,
    headerStyle: {
      backgroundColor: COLORS.primary,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTitleAlign: "center",
    title: "",
    headerLeft: () => (
      <Feather
        name="chevron-left"
        size={30}
        onPress={() => {
          navigation.goBack();
        }}
        style={{ marginLeft: 10, width: 50 }}
        color={COLORS.white}
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
        options={({ navigation }) => headerOptions({ navigation })}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
