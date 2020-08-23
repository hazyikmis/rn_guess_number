TouchableWithoutFeedback & Keyboard used form closing the keyboard when you touch screen...

# Installing expo-font

Depending on the version of Expo you're using, you very likely need to install the expo-font package.

You can do this in two different ways and it's important to understand the difference:

1. npm install --save expo-font

2. expo install expo-font

3. is recommended - but what is the difference?

npm install installs a packages a dependency into the project - we use this command for most packages which we do install.

Some packages (typically all expo-\* packages) can break the app if you install the wrong version though - because they closely work together with Expo itself.

To get the right package version for the specific version of Expo your app relies on, expo install is the right "tool". It also just executes npm install behind the scenes but it picks a specific (i.e. the correct) version of the package to be installed.

Hence for all expo-\* packages, npm install can be used but expo install is the preferred command to avoid errors. Of course you could always try npm install first and only run expo install if you thereafter do face any errors.

# RN Features

- Text component can contain other Text components
- When adding styles to a < Text > (no matter if that happens via inline styles or a StyleSheet object), the styles will actually be shared with any nested < Text > components. This differs from the behavior of < View > (or actually any other component - < Text > is the exception): There, any styles are only applied to the component to which you add them. Styles are never shared with any child component!
- For ScrollView & FlatView, better to use "contentContainerStyle" prop while assigning a style
- In the "app.json", "orientation": landscape/portrait/default
- You can check the dimensions (height & width) of the window by using "Dimensions" from react-native. But this never provides you info about the orientation of you device.
- "ScreenOrientation" from "expo-screen-orientation" provides useful info about the orientation of the device.
- IF "import { ScreenOrientation } from 'expo';" DOES NOT WORK, THEN execute "expo install expo-screen-orientation" on the terminal AND USE "import \* as ScreenOrientation from 'expo-screen-orientation';" IN YOUR CODE.
- If you want to lock some of your screens as PORTRAIT for example, you must write the code below as as a first line in your code.

`ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);`

# Using platform-specific code files

- You can name your files like (If you have too much logic difference):
  - MainButton.android.js
  - MainButton.ios.js
- and in your code, include/import these files just "MainButton", not with the extension "android" or "js", Expo automatically loads the required platform specific file. You do not need to check "if (Platform.OS === 'ios') "...
-
