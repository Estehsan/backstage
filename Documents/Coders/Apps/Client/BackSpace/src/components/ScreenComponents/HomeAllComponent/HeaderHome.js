import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {GlobalCSS, H1, H2, Heading, Mbg, RedText} from '../../basic';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {Headline, Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Btn from '../../basic/Btn';
const HeaderHome = () => {
  return (
    <>
      <View style={[GlobalCSS.row, GlobalCSS.padding.ymd]}>
        <View style={[GlobalCSS.flexHalf, GlobalCSS.alignItemsCenter]}>
          <Image
            // resizeMode="contain"
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
            }}
            style={{
              height: 110,
              width: 110,
              borderRadius: 4,
            }}
          />
        </View>
        {/* Right Side */}
        <View style={[GlobalCSS.flex, GlobalCSS.row, GlobalCSS.justifyBetween]}>
          <View style={[]}>
            <H1>
              Mike,48
              <MaterialIcons name="verified-user" size={24} color="#3498db" />
              [edit]
            </H1>
            <H2>You can write anything here and let</H2>
            <H2>www.what.com</H2>
            <Btn>Add to friends</Btn>
          </View>
          <View style={[GlobalCSS.justifyEvenly]}>
            <Feather name="message-square" size={28} color="black" />
            <AntDesign name="star" size={28} color="black" />
            <Ionicons name="backspace" size={28} color="black" />
            <AntDesign name="infocirlce" size={28} color="black" />
          </View>
        </View>
      </View>
      <View style={[GlobalCSS.row, GlobalCSS.justifyEvenly]}>
        <H2>
          Friends:
          <RedText>24,234</RedText>
        </H2>
        <H2>
          Friends:
          <RedText>24,234</RedText>
        </H2>
        <H2>
          Friends:
          <RedText>24,234</RedText>
        </H2>
      </View>
    </>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({});
