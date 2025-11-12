
import * as Sentry from '@sentry/react-native';
import { setJSExceptionHandler } from 'react-native-exception-handler';

Sentry.init({
  dsn: 'https://6cb54fa7f1912a577afcb38bee62a81b@o4510345329967104.ingest.us.sentry.io/4510345337896960',
  enableInExpoDevelopment: true,
  debug: true, // Set this to `true` to see Sentry logs in your console
});

// 2. تسجيل جميع الأخطاء غير المعالجة
setJSExceptionHandler((error, isFatal) => {
  Sentry.Native.captureException(error); // إرسال الخطأ للموقع
  console.log("Caught by global handler:", error.message);
}, true);

import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import {
  NotoNaskhArabic_400Regular,
  NotoNaskhArabic_500Medium,
  NotoNaskhArabic_600SemiBold,
  NotoNaskhArabic_700Bold,
} from '@expo-google-fonts/noto-naskh-arabic';
import {
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_700Bold,
} from '@expo-google-fonts/tajawal';
import { SystemBars } from 'react-native-edge-to-edge';
import { useAthkarStore } from '@/stores/athkarStore';
import { getColors } from '@/styles/commonStyles';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = useAthkarStore((state) => state.isDarkMode);
  const loadFromStorage = useAthkarStore((state) => state.loadFromStorage);
  const colors = getColors(isDarkMode);

  const [fontsLoaded] = useFonts({
    NotoNaskhArabic_400Regular,
    NotoNaskhArabic_500Medium,
    NotoNaskhArabic_600SemiBold,
    NotoNaskhArabic_700Bold,
    Tajawal_400Regular,
    Tajawal_500Medium,
    Tajawal_700Bold,
  });

  useEffect(() => {
    // اختبار إرسال خطأ تلقائي بعد 3 ثواني
    setTimeout(() => {
      throw new Error("🔥 Test crash from _layout.tsx!");
    }, 3000);
  }, []);

  useEffect(() => {
    async function prepareApp() {
      if (fontsLoaded) {
          Sentry.captureMessage("✅ Test Sentry connection from Expo");
        try {
          await SplashScreen.hideAsync();
          await loadFromStorage();
          console.log('Fonts loaded and storage initialized');
        } catch (error) {
          console.log('Error in app preparation:', error);
        }
      }
    }

    prepareApp();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const theme = isDarkMode
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.background,
          card: colors.card,
          text: colors.text,
          border: colors.border,
          primary: colors.accent,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
          card: colors.card,
          text: colors.text,
          border: colors.border,
          primary: colors.accent,
        },
      };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={theme}>
        <SystemBars style={isDarkMode ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="athkar/[id]"
            options={{
              headerShown: false,
              presentation: 'card',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="transparent-modal"
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
            }}
          />
        </Stack>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

