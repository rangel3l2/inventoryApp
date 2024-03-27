import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React, { FC } from "react";
import { Product } from "@/src/model/products";
const { width, height } = Dimensions.get("window");

type Props = {
  item: Product;
  setOnSelectSearchItem: (data: string) => void;
 
};
const MySearch: FC<Props> = ({ item, setOnSelectSearchItem }) => {
  return (
    <>
      <Pressable onPress={()=>setOnSelectSearchItem(item.name)}>
        <Text style={styles.itemText}>{item.name}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  itemText: {
    margin: 2,
    padding: 2,
    fontSize: 15,
    backgroundColor: "#fffff0",
    borderWidth: 1,
    borderTopWidth: 0,
    height: height / 20,
    width: width / 1.1,
  },
});

export default MySearch;
