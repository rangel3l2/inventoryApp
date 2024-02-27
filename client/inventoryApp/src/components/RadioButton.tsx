import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
type RadioButtonProps = {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
};
const RadioButton = ({
  label,
  value,
  selected,
  onSelect,
}: RadioButtonProps) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handlePress = () => {
    setIsSelected(true);
    onSelect(value);
  };

  return (
    <Pressable style={styles.radioButtonContainer} onPress={handlePress}>
      {isSelected && <View style={styles.radioButtonFilled} />}
      {!isSelected && <View style={styles.radioButtonEmpty} />}
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flex: 1,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderBottomWidth:1,
    padding: 10,
  },
  radioButtonLabel: {
    flex: 1,
    width: '90%',
    minHeight: 20,
    borderRadius: 20,
    padding: 2,
    paddingLeft: 10,
    textAlign:'center'
   
  },
  radioButtonEmpty: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: 1,
  },
  radioButtonFilled: {
    width: 20,
    height: 20,
    backgroundColor: "#000",
    borderRadius: 20,
  },
});

export default RadioButton;
