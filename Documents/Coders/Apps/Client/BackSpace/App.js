import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';

import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
  Title,
} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation';
// import {LogBox} from 'react-native';
import BottomTabNavi from './src/navigation/BottomTabNavi';

// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <BottomTabNavi />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
