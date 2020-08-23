import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';
import BodyText from '../components/BodyText';
import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

//HERE IN THIS COMPONENT, YOU CAN SEE 3 DIFFERENT WAYS OF USING styles
//NORMALLY, BodyText COMPONENT HAS DEFAULT styles, BUT WE ARE SENDING SOME styles
//TO IT TO OVERWRITE DEFAULTS

const GameOverScreen = (props) => {
  const { totalRounds, userNumber, onRestartGame } = props;
  return (
    <View style={styles.container}>
      <BodyText style={DefaultStyles.title}>The Game is Over!</BodyText>
      <View style={styles.imageContainer}>
        <Image
          //fadeDuration={1000}
          //source={require('../assets/images/success.png')}
          source={{
            uri:
              'https://abrahamswallet.com/wp-content/uploads/2017/12/samuel-ferrara-117219-1180x770.jpg',
          }}
          style={styles.image}
          //resizeMode="contain" //"cover" is the default
        />
      </View>
      <BodyText style={{ color: 'blue' }}>
        Number of rounds: <Text style={styles.highlight}>{totalRounds}</Text>
      </BodyText>
      <BodyText style={styles.infoText}>Number was: {userNumber}</BodyText>
      {/* <View style={styles.newGameButton}>
        <Button title="New Game" onPress={onRestartGame} />
      </View> */}
      <MainButton onPress={onRestartGame}>New Game</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    color: 'grey',
  },
  imageContainer: {
    //width: '80%',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 20,
  },
  // image: {
  //   width: '80%',
  //   height: 300,
  //   borderRadius: 50,
  // },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: Colors.primary,
  },
  newGameButton: {
    width: '50%',
    marginTop: 10,
  },
});

export default GameOverScreen;
