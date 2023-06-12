import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FireBase from './src/FireBase';

type Props = {};

const App = (props: Props) => {
  return (
    <View>
      <FireBase />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
