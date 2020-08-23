import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

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

const renderListItem = (item, numOfRound) => (
  <View key={item} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  //const [rounds, setRounds] = useState(0);
  //const rounds = useRef(0);  //also possible
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentMin = useRef(1);
  const currentMax = useRef(100);

  useEffect(() => {
    //Every time this component rendered, then AFTER, this function executed
    if (currentGuess === userChoice) {
      // onGameOver(rounds.current); //also possible
      //onGameOver(rounds);
      onGameOver(pastGuesses.length);
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
      //lower boundary included
      currentMin.current = currentGuess + 1;
    }
    const nextGuessedNumber = generateRandomBetween(
      currentMin.current,
      currentMax.current,
      currentGuess
    );
    setCurrentGuess(nextGuessedNumber);
    //setRounds((currentRounds) => currentRounds + 1);
    //rounds.current++;  //also possible
    setPastGuesses((curPastGuesses) => [nextGuessedNumber, ...curPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        {/* <Button title="Lower" onPress={nextGuessHandler.bind(this, 'lower')} /> */}
        {/* <Button title="Lower" onPress={() => nextGuessHandler('lower')} />
        <Button title="Greater" onPress={() => nextGuessHandler('greater')} /> */}
        {/* <MainButton onPress={() => nextGuessHandler('lower')}>Lower</MainButton>
        <MainButton onPress={() => nextGuessHandler('greater')}>Greater</MainButton> */}
        <MainButton onPress={() => nextGuessHandler('lower')}>
          <Ionicons name="md-remove" size={24} color="white" />{' '}
        </MainButton>
        <MainButton onPress={() => nextGuessHandler('greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {/* {pastGuesses.map((guess, index) => renderListItem(guess, index + 1))} */}
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
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
    width: 400,
    maxWidth: '90%',
  },
  listContainer: {
    flex: 1,
    width: '80%',
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    width: '50%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default GameScreen;
