import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#1A0938",
  secondary: "#ED1BA3",
  gray: "#A7A7A7",
  neutral: "#E7E7E7",
  semantic: "#361E60",
  accent: "#22DDF2",
  white: "#fff",
  black: "#000000",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  AVATAR_SIZE: 70,
  SPACING: 20,

  // font sizes
  title: 28,
  h1: 27,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  title: { fontSize: SIZES.title, fontWeight: "bold" },
  h1: { fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontSize: SIZES.h4, lineHeight: 20 },
  h5: { fontSize: SIZES.h5, lineHeight: 20 },
  body1: {
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

export const STYLES = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  authHeaders: {
    color: "#F43E3E",
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 36,
    textAlign: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
});

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
