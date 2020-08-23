import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import { ScreenOrientation } from 'expo';
import * as ScreenOrientation from 'expo-screen-orientation';

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

/*
const renderListItem = (item, numOfRound) => (
  <View key={item} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{item}</BodyText>
  </View>
);
*/

//This function called by FlatList component. The 2nd parameter (itemData) passed to this function by default. HOW?
const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  //THE LINE BELOW, LOCKS YOUR SCREEN PORTRAIT FOR THIS SCREEN!
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const { userChoice, onGameOver } = props;
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  //const [rounds, setRounds] = useState(0);
  //const rounds = useRef(0);  //also possible
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  // const [detectedDeviceWidth, setDetectedDeviceWidth] = useState(
  //   Dimensions.get('window').width
  // );
  const [detectedDeviceHeight, setDetectedDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const currentMin = useRef(1);
  const currentMax = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setDetectedDeviceHeight(Dimensions.get('window').height);
      //setDetectedDeviceWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', updateLayout);
    //below is for prevent unnecessary re-renders (cleanup function)
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

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
    setPastGuesses((curPastGuesses) => [
      nextGuessedNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  //According to device screen sizes, we can return completely different views:
  /*
  if (Dimensions.get('window').height > 600) {
    return <View>...</View>;
  } else {
    return <View>...</View>;
  }
*/

  if (detectedDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuessHandler('lower')}>
            <Ionicons name="md-remove" size={24} color="white" />{' '}
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => nextGuessHandler('greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card
          style={
            Dimensions.get('window').height > 600
              ? styles.buttonContainer
              : styles.buttonContainerSmall
          }
        >
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
          {/*
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index) //renderListItem(guess, index + 1))
            )}
          </ScrollView>
            */}
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }
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
    //marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%',
  },
  buttonContainerSmall: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //marginTop: 20,
    marginTop: 5,
    width: 400,
    //maxWidth: '90%',
    maxWidth: Dimensions.get('window').width > 400 ? '90%' : '80%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  listContainer: {
    flex: 1,
    // width: '80%',
    width: Dimensions.get('window').width > 400 ? '60%' : '80%',
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
