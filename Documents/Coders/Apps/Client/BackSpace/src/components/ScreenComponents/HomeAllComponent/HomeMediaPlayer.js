import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalCSS, H1} from '../../basic';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeMediaPlayer = () => {
  return (
    <View style={styles.bg}>
      <View style={[GlobalCSS.alignItemsCenter]}>
        <H1 color={'#fff'}>All the way up</H1>
      </View>
      <View
        style={[
          GlobalCSS.row,
          GlobalCSS.justifyEvenly,
          GlobalCSS.padding.xxl,
          GlobalCSS.padding.ysm,
        ]}>
        <Entypo name="shuffle" size={40} color={'#fff'} />
        <AntDesign name="stepbackward" size={40} color={'#fff'} />
        <AntDesign name="pausecircleo" size={40} color={'#fff'} />

        <AntDesign name="stepforward" size={40} color={'#fff'} />
        <AntDesign name="retweet" size={40} color={'#fff'} />
      </View>
    </View>
  );
};

export default HomeMediaPlayer;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#164854',
    paddingVertical: 5,
    width: '100%',
  },
});
