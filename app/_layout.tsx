import { TITLE_VALUES, db, useAndStartPersister } from "@/services/database/database";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useCreateStore } from "tinybase/ui-react";

function RootLayout() {
  // Initialize the (memoized) TinyBase store and persist it.
  const store = useCreateStore(() => db);
  useAndStartPersister(store);
  store.setValue(TITLE_VALUES, 'Todo App');

  return (
    // Wrap the app in TinyBase context, so the store is default throughout and
    // a SafeAreaProvider/SafeAreaView so it fits the screen.
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Stack />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

let AppEntryPoint = RootLayout;

const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";
if (storybookEnabled) {
  AppEntryPoint = require("../.storybook").default;
}

export default AppEntryPoint;

// Styles for the app.
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 16,
  },
});
