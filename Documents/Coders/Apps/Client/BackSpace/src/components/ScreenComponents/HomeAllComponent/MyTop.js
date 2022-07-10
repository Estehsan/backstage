import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalCSS, H1, H2, Heading, Mbg, RedText} from '../../basic';

const MyTop = ({children, color, fcolor}) => {
  return (
    <View
      style={{
        backgroundColor: color ? color : '#164854',
        paddingVertical: 5,
        alignItems: 'center',
      }}>
      <H1 color={fcolor ? fcolor : '#fff'}>{children}</H1>
    </View>
  );
};

export default MyTop;

const styles = StyleSheet.create({});
