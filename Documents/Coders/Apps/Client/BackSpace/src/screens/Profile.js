import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeaderProfile} from '../components/ScreenComponents/ProfileAllComponent';
import Mbg from '../components/basic/Mbg';

const Profile = () => {
  return (
    <Mbg>
      <HeaderProfile />
    </Mbg>
  );
};

export default Profile;

const styles = StyleSheet.create({});
