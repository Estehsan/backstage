import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {theme} from '../theme';

const Btn = ({children, onPress}) => {
  return (
    <Button mode="contained" color={theme.colors.grey} onPress={onPress}>
      {children}
    </Button>
  );
};

export default Btn;

const styles = StyleSheet.create({});
