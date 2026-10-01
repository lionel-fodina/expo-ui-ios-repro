# @expo/ui 57.0.20 — iOS build never builds Pods targets

Reproduction for an iOS build failure that appears with `@expo/ui` 57.0.20
(pulled in by `expo-router` 57.0.23's `^57.0.20` range).

Xcode never builds the CocoaPods targets: no "Resolve Package Graph" step, the
dependency graph contains only the app target, and compilation fails with
~30 `<Pod>.modulemap not found` errors followed by `no such module 'Expo'`.

The GitHub Actions workflow builds the app for the iOS simulator in Release
(Xcode 26.6, CocoaPods 1.16.2) twice:

- `@expo/ui` 57.0.20 — as resolved by the lockfile
- `@expo/ui` 57.0.19 — control, via a pnpm override

Each job uploads the generated Podfile, Podfile.lock, workspace, project files
and the full xcodebuild log as an artifact.

Layout: pnpm workspace, app in `apps/mobile`, Expo SDK 57 (`expo` 57.0.25,
`react-native` 0.86.3), continuous native generation (no committed `ios/`).
