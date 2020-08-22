import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = (props) => {
  const { title } = props;
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    // backgroundColor: '#f7287b',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    // fontSize: 18,  //this prop set by default in TitleText
    // fontFamily: 'open-sans-bold', //this prop set by default in TitleText
  },
});

export default Header;
