import React from "react";
import Switch from "./Switch";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import TextInput from "./TextInput";
import { Button } from "./Button";
import { User } from "lucide-react-native";
import { toast } from "./Toast";
import { ThemedView } from "./ThemedView";

const TestingComp = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={{ gap: 16 }}>
          <Switch
            value={UnistylesRuntime.themeName === "dark"}
            onChange={(value) => {
              UnistylesRuntime.setTheme(value ? "dark" : "light");
            }}
          />
          <Button onPress={() => toast.show("Hello World!", { position: "bottom", type: "success", animation: "slide" })}>Click Me</Button>
          <Button onPress={() => toast.show("Hello World!", { position: "bottom", type: "success", animation: "bounce" })}>Click Me</Button>
          <TextInput variant="outline" label="Username" left={<User color={styles.icon.color} size={22} />} />
          <TextInput variant="outline" label="Username" />
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create((theme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.base,
  },
  container: {
    padding: 16,
    flex: 1,
  },
  icon: {
    color: theme.colors.placeholder,
  },
}));

export default TestingComp;
