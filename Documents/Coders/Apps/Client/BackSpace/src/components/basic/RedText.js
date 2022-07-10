import {StyleSheet, useColorScheme, Text} from 'react-native';
import React from 'react';
import {Title} from 'react-native-paper';
import {theme} from './../theme';

const RedText = ({children, color, size, lineHeight}) => {
  // const isDarkMode = useColorScheme() === 'light';

  return (
    <>
      <Text
        style={{
          fontSize: size ? size : 20,
          color: color ? color : theme.colors.red,
          fontWeight: '600',
          letterSpacing: 1,
          lineHeight: lineHeight ? lineHeight : 24,
        }}>
        {children}
      </Text>
    </>
  );
};

export default RedText;

const styles = StyleSheet.create({});
