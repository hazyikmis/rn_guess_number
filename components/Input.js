import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
  //const {} = props;
  //return <TextInput style={{ ...styles.container, ...props.style }} />;
  //You are forwarding all props to child component
  return (
    <TextInput {...props} style={{ ...styles.container, ...props.style }} />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Input;
