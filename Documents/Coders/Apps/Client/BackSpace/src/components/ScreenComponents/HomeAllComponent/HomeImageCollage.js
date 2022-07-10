import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalCSS} from '../../basic';

const HomeImageCollage = () => {
  return (
    <View style={[GlobalCSS.row]}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
        }}
        style={styles.gif}
      />

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        }}
        style={styles.gif}
      />
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
        }}
        style={styles.gif}
      />
      <Image
        resizeMethod="1"
        source={{
          uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
        }}
        style={styles.gif}
      />
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
        }}
        style={styles.gif}
      />
    </View>
  );
};

export default HomeImageCollage;

const styles = StyleSheet.create({
  gif: {
    flex: 1,
    height: 60,
    margin: 2,
  },
});
