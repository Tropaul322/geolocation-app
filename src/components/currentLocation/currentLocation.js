import React, {Component, Fragment} from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import WeatherBlock from '../weatherBlock/weather-block';
import { Button } from 'react-native-paper';

export default class CurrentLocation extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            isShow: true
        };

      }

    
    render(){
        console.log(this.props);
        const { closeClick } = this.props
        const { date:{ day, hours, month, min}, latlong: {lat, lon}, position:{pos}, weather } = this.props.item
        const data = this.state.isShow ? (<Fragment>
            <Text style={styles.text}>Time</Text>
            <Text style={styles.coords}>{day}.{month} / {hours}:{min}</Text>
            <Text style={styles.text}>Your coords:</Text>
            <Text style={styles.coords}>Lat: {lat}, Long: {lon}</Text>
            <Text style={styles.text}>Your location is: </Text>
            <Text style={styles.coords}>{pos}</Text>
            <WeatherBlock  temperature={weather}></WeatherBlock></Fragment>) : null
    return(
        <View style={styles.container}>
                <Button mode={"outlined"} style={styles.button} color={'white'} onPress={()=> closeClick()}><Text style={styles.button_text}>Back to History</Text></Button>
                {data}
        </View>
    )

}
}   
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        paddingTop: 45,
        color: '#fff',
        fontSize: 35,
        fontWeight:'900',
        marginHorizontal: 8,
        textAlign: 'center',
      },
      coords: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 20,
      },
      text:{
        marginTop: 40,
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 24,
        color: '#fff'
      },
      button:{
        marginTop: 20 ,
        borderColor: '#fff',
        width: 250,
      },
      button_text:{
        fontSize: 20
      }
});