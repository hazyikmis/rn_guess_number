import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude); //recursion
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  const [rounds, setRounds] = useState(0);
  //const rounds = useRef(0);  //also possible
  const currentMin = useRef(1);
  const currentMax = useRef(100);

  useEffect(() => {
    //Every time this component rendered, then AFTER, this function executed
    if (currentGuess === userChoice) {
      // onGameOver(rounds.current); //also possible
      onGameOver(rounds); //also possible
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      currentMax.current = currentGuess;
    } else {
      currentMin.current = currentGuess;
    }
    const nextGuessedNumber = generateRandomBetween(
      currentMin.current,
      currentMax.current,
      currentGuess
    );
    setCurrentGuess(nextGuessedNumber);
    setRounds((currentRounds) => currentRounds + 1);
    //rounds.current++;  //also possible
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        {/* <Button title="Lower" onPress={nextGuessHandler.bind(this, 'lower')} /> */}
        <Button title="Lower" onPress={() => nextGuessHandler('lower')} />
        <Button title="Greater" onPress={() => nextGuessHandler('greater')} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

export default GameScreen;
