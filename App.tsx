import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  ViewStyle,
  Platform,
  StatusBar,
  TextStyle,
  View
} from "react-native";

import { OptionObject } from "./types";
import { MultiSelect } from "./components/multiselect";

const OPTIONS: OptionObject[] = [
  {
    key: "1",
    label: "From 0000 To 0600"
  },
  {
    key: "2",
    label: "From 1000 To 1600"
  },
  {
    key: "3",
    label: "From 1200 To 1800"
  },
  {
    key: "4",
    label: "From 1600 To 2359"
  },
  {
    key: "5",
    label: "From 2000 To 2359"
  }
];

export default function App() {
  let [selected, setSelected] = useState<string[]>([]);

  const onSelectedValue = (key: string) => {
    // I'm assuming each key is a unique identifier for the option
    if (selected.includes(key)) {
      const index = selected.findIndex(selection => selection === key);
      setSelected([
        ...selected.slice(0, index),
        ...selected.slice(index + 1, selected.length)
      ]);
    } else {
      setSelected([...selected, key]);
    }
  };
  return (
    <SafeAreaView style={SCREEN}>
      <ScrollView style={CONTAINER}>
        <View style={TITLE_CONTAINER}>
          <Text style={TITLE}>Select Available Shifts</Text>
        </View>
        <MultiSelect
          options={OPTIONS}
          selected={selected}
          onSelect={onSelectedValue}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const SCREEN: ViewStyle = {
  flex: 1,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const CONTAINER: ViewStyle = {
  flex: 1
};

const TITLE_CONTAINER: ViewStyle = {
  marginVertical: 20,
  alignItems: "center"
};

const TITLE: TextStyle = {
  fontSize: 24,
  fontWeight: "bold"
};
