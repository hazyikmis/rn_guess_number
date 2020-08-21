import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//sole purpose of this component is providing style to card-like components
const Card = (props) => {
  //const {} = props;
  //return <View style={styles.card}>{props.children}</View>;
  //usage of spread operator in styling provides some flexibility that you can send some styles as props
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
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
});

export default Card;
