import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = (props) => (
  <Text style={{ ...styles.bodyStyle, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  bodyStyle: {
    // fontFamily: 'open-sans-bold',
    fontFamily: 'open-sans',
  },
});

export default BodyText;
