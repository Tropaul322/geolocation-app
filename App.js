
import React from 'react';
import { StyleSheet, View,Text, ScrollView } from 'react-native';
import Geolocation from './src/components/geolocation/geolocation'

export default function App() {

  return (
    <View style={styles.container}>
      <Geolocation></Geolocation>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6051cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
