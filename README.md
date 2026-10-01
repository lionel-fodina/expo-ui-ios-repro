# iOS: damaged Pods.xcodeproj with `spm_dependency` on React Native 0.86.3

End-to-end reproduction (real `pod install` + `xcodebuild`) of
[expo/expo#50794](https://github.com/expo/expo/issues/50794).

A pod that declares a Swift package through React Native's `spm_dependency`
(here `@clerk/expo` → `clerk-ios`) can make `pod install` write a
`Pods.xcodeproj` whose root `PBXProject` is overwritten by one of the Swift
package objects: `rootObject = 46EB2E00000000` resolves to an
`XCSwiftPackageProductDependency`. Xcode reports the project as damaged
(`-[XCSwiftPackageProductDependency _setSavedArchiveVersion:]: unrecognized
selector`), builds only the app target (`Target dependency graph (1 target)`),
and compilation fails with `<Pod>.modulemap not found` / `no such module 'Expo'`.

Whether it happens depends on the total object count in the Pods project. In
this app, `@expo/ui` 57.0.20 (pulled in by `expo-router` 57.0.23) adds the few
objects that land the count on a bad value.

The GitHub Actions workflow builds the app for the iOS simulator in Release
(Xcode 26.6, CocoaPods 1.16.2) three ways:

| Variant | `@expo/ui` | React Native `spm.rb` | Expected |
|---|---|---|---|
| `unpatched` | 57.0.20 | 0.86.3 as published | ❌ |
| `rn-57576-patch` | 57.0.20 | with [facebook/react-native#57576](https://github.com/facebook/react-native/pull/57576) (`patches/`) | ✅ |
| `control-expo-ui-57.0.19` | 57.0.19 | 0.86.3 as published | ✅ (object count shifted) |

Each job uploads the generated Podfile, Podfile.lock, workspace, project files
and the full xcodebuild log as an artifact.

Layout: pnpm workspace, app in `apps/mobile`, Expo SDK 57 (`expo` 57.0.25,
`react-native` 0.86.3), continuous native generation (no committed `ios/`).
