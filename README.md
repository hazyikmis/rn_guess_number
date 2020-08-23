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
