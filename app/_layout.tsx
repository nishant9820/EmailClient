import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import ThemeProviderWrapper from "./navigation/ThemeProviderWrapper";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { LogBox } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProviderWrapper>
        <DrawerNavigator />
        <StatusBar style="auto" />
      </ThemeProviderWrapper>
    </Provider>
  );
}
