import React from "react";
import Switch from "./Switch";
import { SafeAreaView, ScrollView, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import TextInput from "./TextInput";
import { Button } from "./Button";
import { User } from "lucide-react-native";
import { toast } from "./Toast";

const TestingComp = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Switch
          value={UnistylesRuntime.themeName === "dark"}
          onChange={(value) => {
            UnistylesRuntime.setTheme(value ? "dark" : "light");
          }}
        />
        <Button onPress={() => toast.show("Hello World!", { position: "bottom", type: "success", animation: "spring" })}>Click Me</Button>
        <TextInput variant="outline" label="Username" left={<User color="gray" />} />
        <TextInput variant="outline" label="Username" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create((theme) => ({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: theme.colors.background,
    gap: 16,
    padding: 16,
  },
}));

export default TestingComp;
