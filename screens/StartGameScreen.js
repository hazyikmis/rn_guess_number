import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const StartGameScreen = (props) => {
  const {} = props;
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <View style={styles.inputContainer}>
        <Text>Select a number</Text>
        <TextInput />
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={() => {}} />
          <Button title="Confirm" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    shadowColor: 'black', //for iOS
    shadowOffset: { width: 0, height: 2 }, //for iOS
    shadowRadius: 6, //for iOS
    shadowOpacity: 0.26, //for iOS
    elevation: 8, //for android
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

export default StartGameScreen;
