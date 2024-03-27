import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SessionProvider } from "../auth/ctx";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useSession } from "../auth/ctx";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Colors, { ColorScheme } from "@/constants/Colors";
import { useRouter } from "expo-router";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const navigation = useRouter();
  const { session } = useSession();
  const [initialScreenName, setInitialScreenName] = useState<string>(() => {
    return session ? "(app)" : "(login)";
  });

  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <RootLayoutNav
        initialScreenName={initialScreenName}
        setInitialScreenName={setInitialScreenName}
      />
    </SessionProvider>
  );
}
type propsRootLayoutNav = {
  initialScreenName: string;
  setInitialScreenName: React.Dispatch<React.SetStateAction<string>>;
};
function RootLayoutNav({

}: propsRootLayoutNav) {
  type ColorScheme = "light" | "dark";

  const colorScheme: ColorScheme = useColorScheme() || "light";
  const navigation = useRouter();
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      navigation.replace("/(app)/");
    } else {
      navigation.replace("/(login)");
    }
  }, [session, navigation]);

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const backgroundColor =
    colorScheme === "light" ? Colors.light.background : Colors.dark.background;

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: backgroundColor }]}
      >
        <ThemeProvider
          value={{ ...theme, colors: Colors[colorScheme ?? "light"] }}
        >
         {session? <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(components)/confirmationModal" options={{presentation: "transparentModal"}} />
           
            <Stack.Screen name= "(inventory)/home" options={{headerShown:false}}/>
            <Stack.Screen name="(login)" options={{headerShown:false}}/>
            <Stack.Screen name = "errorModal" options={{presentation: "transparentModal"}}/>
            <Stack.Screen name = "informationModal" options={{presentation: "transparentModal"}}/>
           
          </Stack> : <Slot/>}
         
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
