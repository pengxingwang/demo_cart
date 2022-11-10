import { StatusBar } from "expo-status-bar";

import React from "react";
import { AppProviders } from "./context/appProvider";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppProviders>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </AppProviders>
    );
  }
}
