import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';

const Mbg = ({children}) => {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {children}
    </SafeAreaView>
  );
};

export default Mbg;

const styles = StyleSheet.create({});
