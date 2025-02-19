import { Image, StyleSheet, Platform } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Text } from "@/components/Text";
import { ThemedView } from "@/components/ThemedView";
import TestingComp from "@/components/TestingComp";

export default function HomeScreen() {
  // return (
  //   <ParallaxScrollView
  //     headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
  //     headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.reactLogo} />}
  //   >
  //     <ThemedView style={styles.titleContainer}>
  //       <Text type="title">Welcome! សួស្ដី</Text>
  //       <HelloWave />
  //     </ThemedView>
  //     <ThemedView style={styles.stepContainer}>
  //       <Text type="subtitle">Step 1: Try it</Text>
  //       <Text>
  //         Edit <Text type="subtitle">app/(tabs)/index.tsx</Text> to see changes. Press{" "}
  //         <Text type="subtitle">
  //           {Platform.select({
  //             ios: "cmd + d",
  //             android: "cmd + m",
  //             web: "F12",
  //           })}
  //         </Text>{" "}
  //         to open developer tools.
  //       </Text>
  //     </ThemedView>
  //     <ThemedView style={styles.stepContainer}>
  //       <Text type="subtitle">Step 2: Explore</Text>
  //       <Text>Tap the Explore tab to learn more about what's included in this starter app.</Text>
  //     </ThemedView>
  //     <ThemedView style={styles.stepContainer}>
  //       <Text type="subtitle">Step 3: Get a fresh start</Text>
  //       <Text>
  //         When you're ready, run <Text type="subtitle">npm run reset-project</Text> to get a fresh <Text type="subtitle">app</Text> directory. This
  //         will move the current <Text type="subtitle">app</Text> to <Text type="subtitle">app-example</Text>.
  //       </Text>
  //     </ThemedView>
  //   </ParallaxScrollView>
  // );
  return <TestingComp />;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
