import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  View,
  StyleSheet,
  ViewStyle,
  Text,
  Dimensions,
} from "react-native";
import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { color } from "@rneui/base";
const { width, height } = Dimensions.get("window");
const RightSideDialog = ({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible: boolean;
}) => {
  const colorScheme = useColorScheme() || "light";
  const theme = colorScheme === "light" ? Colors.dark : Colors.light;
  const [isOpen, setIsOpen] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible !== isOpen) {
      setIsOpen(visible);
      animateDialog(visible);
    }
  }, [visible]);

  const animateDialog = (isVisible: boolean) => {
    Animated.timing(translateX, {
      toValue: isVisible ? -width / 13 : 0, // Adjust offset as needed
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const dialogStyles: ViewStyle = {
    transform: [{ translateX }],
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 5,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.secundary,
  };

  return (
    <Animated.View style={[styles.container, dialogStyles]}>
      <Text style={{color: theme.text}}> {children}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RightSideDialog;
