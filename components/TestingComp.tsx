import React from "react";
import Switch from "./Switch";
import { SafeAreaView, ScrollView } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import TextInput from "./TextInput";
import { Button } from "./Button";
import { User } from "lucide-react-native";

type Props = {};

const TestingComp = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.container]}>
        <Switch
          value={UnistylesRuntime.themeName === "dark" ? true : false}
          onChange={(value) => {
            UnistylesRuntime.setTheme(value ? "dark" : "light");
          }}
        />
        <Button>Click Me</Button>
        <TextInput variant="outline" label="Username" left={<User color="gray" />} />
        <TextInput variant="outline" label="Username" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    gap: 16,
    padding: 16,
  },
}));

export default TestingComp;
