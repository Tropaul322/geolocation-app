import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function WeatherBlock({temperature: {temp, weather, icon}}) {

    return(
        <View style={styles.weather_block}>
            <Text style={styles.text}>Temperature: </Text>
            <Text style={styles.degree}>{temp}</Text>
            <Image style={{ width: 50, height: 50 }} source={{ uri: icon }} />
            <Text style={styles.degree}>{weather}</Text>
        </View>
    )

}   
const styles = StyleSheet.create({
    text: {
        padding: 40,
        fontWeight: '500',
        fontSize: 24,
        color: '#fff'
    },
    degree: {
        fontSize: 24,
        color: '#fff',
        
    },
    weather_block:{ 
        marginTop: 20,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    }
});