import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./navigation/BottomTabs";
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#000",
    card: "#000",
    text: "#fff",
  },
};
export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <BottomTabs />
    </NavigationContainer>
  );
}
