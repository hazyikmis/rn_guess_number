import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameOverScreen = (props) => {
  const { totalRounds, userNumber, onRestartGame } = props;
  return (
    <View style={styles.container}>
      <Text>The Game is Over!</Text>
      <Text>Number of rounds: {totalRounds}</Text>
      <Text>Number was: {userNumber}</Text>
      <Button title="New Game" onPress={onRestartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameOverScreen;
