import { getLocalizedText } from "@/languages/languages";
import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getLocalizedText('CFBundleDisplayName')}</Text>
      <View style={styles.buttons}>
        <Button title={getLocalizedText('sign-in')} onPress={() => router.push("/sign-in")} />
        <Button title={getLocalizedText('sign-up')} onPress={() => router.push("/sign-up")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 72,
    fontWeight: "bold",
  },
  buttons: {
    gap: 20,
  }
});
