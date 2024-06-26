import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { Place } from "../model/place";
import { Fonts } from "../constants/Fonts";
type RadioButtonProps = {
  value: string;
  item: Place;
  onSelect: (str: Place) => void;
};
const CustomRadioButton = ({
  item,
  value,
  onSelect,
}: RadioButtonProps) => {
  
  return (
    <Pressable
      style={styles.radioButtonContainer}
      onPress={() => onSelect(item)}
    >
      <View >
        <RadioButton
          uncheckedColor="#000"
          theme={{ colors: { primary: "#000" , background:'#ffff'} }}
          color="#000" // Cor do RadioButton selecionado         
          value={item.id.toString()}
          status={value === item.id.toString() ? "unchecked" : "checked"}
          onPress={() => {
            
            onSelect(item);
          }}
        />
      </View>

      <Text style={styles.radioButtonLabel}>{item.nome}</Text>
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
    borderBottomWidth: 1,
    padding: 10,
  },
  radioButtonLabel: {
    flex: 1,
    width: "90%",
    minHeight: 20,
    borderRadius: 20,
    padding: 2,
    paddingLeft: 10,
    textAlign: "center",
    fontSize: 16,
    fontFamily: 'RobotoRegular',
  },
  radioButtonEmpty: {
    width: '20%',
    height: '20%',
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

export default CustomRadioButton;
