import {SplashScreen, Stack} from "expo-router";
import { useFonts } from "expo-font";
import { useEffect} from "react";
import * as Sentry from '@sentry/react-native';
import "./globals.css"
import useAuthStore from "@/store/auth.store";

// JSM da sentry shu yerda joylashgan

export default Sentry.wrap(function RootLayout() {
    const { isLoading, fetchAuthenticatedUser } = useAuthStore();

    const [fontsLoaded, error] = useFonts({
        "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
        "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
        "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
        "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
        "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    });

Sentry.init({
  dsn: 'https://980c0b611d027690b944eb6976bed819@o4509622959407104.ingest.us.sentry.io/4509871082504192',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

    useEffect(() => {
        if(error) throw error;
        if(fontsLoaded) SplashScreen.hideAsync()
    }, [fontsLoaded, error])

    useEffect(() => {
        fetchAuthenticatedUser()
    }, []);

    if(!fontsLoaded || isLoading) return  null;

  return <Stack screenOptions={{headerShown: false}} />;
});