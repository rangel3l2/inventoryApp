import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SessionProvider } from '../auth/ctx';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useState } from 'react';
import { useSession } from '../auth/ctx';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [sessionReconfigure, setSessionReconfigure] = useState(false)
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'] || Colors.light;
  const { session } = useSession();
  
  useEffect(()=>{
    if(session === null){
      setSessionReconfigure(false)
    }else{
      setSessionReconfigure(true)
    }
  }),[]
  return (
  
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {sessionReconfigure ? (
            <SessionProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
              </Stack>
            </SessionProvider>
          ) : (
            <SessionProvider>
            <Stack>
               <Stack.Screen name="(screens)" options={{ headerShown: false }}  />
            </Stack>
            </SessionProvider>
           
          )}
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
