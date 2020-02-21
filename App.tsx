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
import { usershifts, globalShiftList } from "./data/shifts";
import { getAvailableShifts, getShiftOptions } from "./utils/shifts";

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

  const shiftsToSelect = getAvailableShifts(usershifts, globalShiftList);
  const options = getShiftOptions(shiftsToSelect);
  return (
    <SafeAreaView style={SCREEN}>
      <ScrollView style={CONTAINER}>
        <View style={TITLE_CONTAINER}>
          <Text style={TITLE}>Select Available Shifts</Text>
        </View>
        <MultiSelect
          options={options}
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
