import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabNavi from './BottomTabNavi';

const Stack = createNativeStackNavigator();

const HomeNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTa" component={BottomTabNavi} />
      {/* <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
      <Stack.Screen name="DishDetailPage" component={DishDetailPage} /> */}
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
    </Stack.Navigator>
  );
};

export default HomeNavi;

const styles = StyleSheet.create({});
