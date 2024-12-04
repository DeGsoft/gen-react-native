import { Stack } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createStore } from 'tinybase';
import {
  Provider,
  useCreatePersister,
  useCreateStore
} from 'tinybase/ui-react';

const useAndStartPersister = (store) =>
  // Persist store to Expo SQLite or local storage; load once, then auto-save.
  useCreatePersister(
    store,
    (store) =>
      Platform.OS === 'web'
        ? require('tinybase/persisters/persister-indexed-db').createIndexedDbPersister(store, 'todos')
        : require('tinybase/persisters/persister-expo-sqlite').createExpoSqlitePersister(store, require('expo-sqlite').openDatabaseSync('todos.db')),
    [],
    (persister) => persister.load().then(persister.startAutoSave)
  );

function RootLayout() {
  // Initialize the (memoized) TinyBase store and persist it.
  const store = useCreateStore(createStore);
  store.setValues({ title: "TinyBase Example" });
  useAndStartPersister(store);
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
