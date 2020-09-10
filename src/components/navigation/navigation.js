import React from 'react';
import { Text, View, ScrollView, StyleSheet, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Geolocation from '../geolocation/geolocation';
import { MaterialCommunityIcons } from '@expo/vector-icons';



function HomeScreen({ navigation }) {
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
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
            <MaterialCommunityIcons name="home" color={color} size={35} />
          ),
        }}/>
        <Tab.Screen name="Settings" component={SettingsScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={35} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
    container: {
     flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  