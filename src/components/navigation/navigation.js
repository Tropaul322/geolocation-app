import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Geolocation from '../geolocation/geolocation';
import HistoryBlock from '../historyBlock/historyBlock'
import { AntDesign } from '@expo/vector-icons';




function HomeScreen() {
  return (
    <ImageBackground source={require('../../../assets/main.jpg')} style={styles.container}>
        <ScrollView>
         <Geolocation></Geolocation>
        </ScrollView>
    </ImageBackground>
  );
}

function SettingsScreen() {
  return (
    <ImageBackground source={require('../../../assets/main.jpg')} style={styles.container}>
    <ScrollView>
      <HistoryBlock />
    </ScrollView>
    </ImageBackground >
  );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {

  

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Main" component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}/>
        <Tab.Screen name="Settings" component={SettingsScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => (
            <AntDesign name="book" size={24} color={color} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
    container: {
    backgroundColor: '#000',
     flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    },
  });
  