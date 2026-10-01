import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Expo UI Repro",
  slug: "expo-ui-ios-repro",
  version: "1.0.0",
  orientation: "landscape",
  icon: "./assets/images/icon.png",
  scheme: "exporepro",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.example.exporepro"
  },
  android: {
    package: "com.example.exporepro"
  },
  plugins: [
    "@clerk/expo",
    "expo-router",
    "expo-secure-store",
    "expo-sqlite",
    "expo-asset",
    "expo-font",
    "expo-web-browser",
    "expo-image",
    "expo-status-bar",
    "@react-native-vector-icons/ionicons",
    "@react-native-community/datetimepicker",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      }
    ],
    ["expo-audio", { microphonePermission: "Microphone access." }],
    [
      "expo-camera",
      {
        cameraPermission: "Camera access.",
        microphonePermission: false,
        recordAudioAndroid: false,
        barcodeScannerEnabled: false
      }
    ],
    ["expo-image-picker", { photosPermission: "Photo library access." }],
    [
      "@sentry/react-native/expo",
      {
        url: "https://sentry.io/",
        organization: "example-org",
        project: "example-project"
      }
    ]
  ]
});
