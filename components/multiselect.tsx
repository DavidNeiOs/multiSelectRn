import React from "react";
import { View, Switch, Text, TextStyle, ViewStyle } from "react-native";

import { OptionObject, SwitchColorOptions } from "../types";

interface IMultiSelectProps {
  options: OptionObject[];
  selected: string[];
  /**Style for every option text */
  textStyle?: TextStyle;
  /**Style for every option container */
  optionContainerStyle?: ViewStyle;
  switchTrackColors?: SwitchColorOptions;
  switchThumbColor?: string;
  /**Action when an option is selected */
  onSelect: (key: string) => void;
  /**Add a component that would go at the button, like a submit button */
  bottomComponent?: React.ReactNode;
}

export const MultiSelect: React.FunctionComponent<IMultiSelectProps> = ({
  options,
  selected,
  onSelect,
  textStyle = {},
  optionContainerStyle = {},
  switchTrackColors = { false: "#28307c", true: "#41aafe" },
  switchThumbColor = "#FFF",
  bottomComponent
}) => {
  return (
    <View>
      {options.map(shift => (
        <View key={shift.key} style={[OPTION_CONTAINER, optionContainerStyle]}>
          <Text style={[OPTION_TEXT, textStyle]}>{shift.label}</Text>
          <Switch
            value={selected.includes(shift.key)}
            onValueChange={newVal => onSelect(shift.key)}
            ios_backgroundColor={switchTrackColors.false}
            thumbColor={switchThumbColor}
            trackColor={switchTrackColors}
          />
        </View>
      ))}
      {Boolean(bottomComponent) && bottomComponent}
    </View>
  );
};

const OPTION_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
  paddingHorizontal: 16
};

const OPTION_TEXT: TextStyle = {
  fontSize: 16
};
