import { Stack } from "expo-router";

function RootLayout() {
  return <Stack />;
}

let AppEntryPoint = RootLayout;

const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";
if (storybookEnabled) {
  AppEntryPoint = require("../.storybook").default;
}

export default AppEntryPoint;
