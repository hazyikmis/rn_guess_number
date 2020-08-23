//useState added for validation of the value entered into to Input
import React, { useState, useEffect } from 'react';
import {
  View,
  // Text,
  StyleSheet,
  // TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = (props) => {
  const { onStartGame } = props;
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  );

  /*
  const updateLayout = () => {
    setButtonWidth(Dimensions.get('window').width / 4);
  };
  
  //the event below runs when the orientation changes
  Dimensions.addEventListener('change', updateLayout);
  */

  useEffect(() => {
    //this is cleaner
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };

    Dimensions.addEventListener('change', updateLayout);
    //below is for prevent unnecessary re-renders (cleanup function)
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be between 1 and 99', [
        { text: 'OK', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(parseInt(chosenNumber));
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        {/* <Button
          title="Start Game"
          onPress={() => onStartGame(selectedNumber)}
        /> */}
        <MainButton onPress={() => onStartGame(selectedNumber)}>
          Start Game
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            {/* <Text style={styles.title}>Start a New Game!</Text> */}
            <TitleText style={{ fontSize: 24 }}>Start a New Game!</TitleText>
            {/* <View style={styles.inputContainer}> */}
            <Card style={styles.inputContainer}>
              {/* <Text style={styles.selectNumber}>Select a number</Text> */}
              <BodyText>Select a number</BodyText>
              {/* <TextInput /> */}
              {/* <Input style={styles.input} /> */}
              {/* since in the definition of Input component, there is {...props}, this helps us to send all properties of TextInput as props to Input component */}
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                {/* Each button wrapped with Button, in order to style them precisely, for example making each same width */}
                {/* <View style={styles.button}> */}
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.accent}
                  />
                </View>
                {/* <View style={styles.button}> */}
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {/* </View> */}
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  // title: {
  //   fontSize: 20,
  //   marginVertical: 10,
  //   fontFamily: 'open-sans-bold',
  // },
  inputContainer: {
    // width: 300,
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
    //all the other styles below already exist in the Card component
    // shadowColor: 'black', //for iOS
    // shadowOffset: { width: 0, height: 2 }, //for iOS
    // shadowRadius: 6, //for iOS
    // shadowOpacity: 0.26, //for iOS
    // elevation: 8, //for android
    // padding: 20,
    // backgroundColor: 'white',
    // borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  button: {
    // width: 100,
    //since there are 2 buttons in the same row divide by 2 (/2) is good but, think about the margins, etc.
    //PROBLEM: This is calculated ONCE in lifecycle of the app, when aoo starts, when orientation changes, never again calculated
    width: Dimensions.get('window').width / 4,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
  },
  // selectNumber: {
  //   fontFamily: 'open-sans',
  // },
});

export default StartGameScreen;
