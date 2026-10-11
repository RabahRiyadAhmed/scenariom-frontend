const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Expo SDK 57 detects pnpm workspaces and configures Metro's monorepo
// resolution automatically. Keep this file focused on NativeWind only.
module.exports = withNativewind(config);
