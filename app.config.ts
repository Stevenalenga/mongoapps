import 'dotenv/config';

interface ExpoConfig {
  name: string;
  slug: string;
  version?: string;
  orientation?: 'portrait' | 'landscape';
  icon?: string;
  userInterfaceStyle?: 'light' | 'dark' | 'automatic';
  splash?: {
    image?: string;
    resizeMode?: 'contain' | 'cover' | 'native';
    backgroundColor?: string;
  };
  updates?: {
    url?: string;
    fallbackToCacheTimeout?: number;
  };
  assetBundlePatterns?: string[];
  ios?: {
    supportsTablet?: boolean;
    bundleIdentifier?: string;
  };
  android?: {
    adaptiveIcon?: {
      foregroundImage?: string;
      backgroundColor?: string;
    };
    package?: string;
    config?: {
      googleMaps?: {
        apiKey?: string;
      };
    };
  };
  web?: {
    favicon?: string;
  };
  extra?: {
    eas?: {
      projectId?: string;
    };
  };
  runtimeVersion?: string;
}

const config: ExpoConfig = {
  name: "myapp",
  slug: "myapp",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  updates: {
    url: "https://u.expo.dev/411a8200-b730-4763-b749-2ef550350dfc",
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.yourcompany.myapp"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    },
    package: "com.mola.mymaps",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_ANDROID_API_KEY || ''
      }
    }
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    eas: {
      projectId: "411a8200-b730-4763-b749-2ef550350dfc"
    }
  },
  runtimeVersion: "1.0.0",
};

export default config;
