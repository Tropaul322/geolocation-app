import React, {Component, Fragment} from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import WeatherBlock from '../weatherBlock/weather-block';
import { Button } from 'react-native-paper';

export default class Geolocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          latlong: {},
          position: {},
          weather: {},
          date: {},
          canClick: false,
        };
        navigator.geolocation.getCurrentPosition(this.getInfo);
        this.getInfoPos()
      }


    getInfo = (posit) => {
        const date = new Date();
        let month = date.getMonth() + 1;
        month = month > 9 ? month : `0${month}`;
        let day = date.getDate();
        day = day > 9 ? day : `0${day}`;
        let hours = date.getHours();
        hours = hours > 9 ? hours : `0${hours}`;
        let minutes = date.getMinutes();
        minutes = minutes > 9 ? minutes : `0${minutes}`;
        this.setState({
            latlong: {lat: posit.coords.latitude, lon: posit.coords.longitude},
            date: {day: day, month:month, hours: hours, min: minutes}
        })
    }
    
    getInfoPos = ()=>{
        setTimeout( async ()=>{
            await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latlong.lat}&lon=${this.state.latlong.lon}&appid=c92437d1837e764ceeb7115131fec2a8`)
                .then((response) => response.json())
                .then((data) => {this.setState({
                    weather: {temp: `${Math.round(data.main.temp-273)} °C`, weather: data.weather[0].main, icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` }
                })})
        }, 200)
        setTimeout(async ()=> { 
            await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.latlong.lat}%2C%20${this.state.latlong.lon}&key=10bd99abd5a040aab9871541a080c076&language=en&pretty=1`)
                .then((response) => response.json())
                .then((data) => {this.setState({
                    position: {pos: data.results[0].formatted}
                }); this.setStorage(this.state)})}, 400)
    }   
    
    setStorage = async (state) => {
        const {latlong, position, date, weather} = state
        if (position !== {} && latlong !== {} && weather !== {} && date !== {}) {
            let todos;
            if (await AsyncStorage.getItem("todos") === null) {
                todos = [];
            } else {
                todos = JSON.parse(await AsyncStorage.getItem("todos"))
            }
            todos.unshift({latlong: latlong, position: position, date: date, weather: weather})
            AsyncStorage.setItem('todos', JSON.stringify(todos))
        } else {
            this.setStorage(this.state)
        }
    }

    refresh = async () => {
        this.setState({
            canClick: true
        })
        await navigator.geolocation.getCurrentPosition(this.getInfo);
        await this.getInfoPos();
        setTimeout(() => {
            this.setState({
                canClick: false
            })
        }, 800)
    }

    render(){
        const {latlong: {lat, lon}, position, weather,isShow, canClick} = this.state
        const coords = position.pos ?  `Lat: ${lat}, Long: ${lon}` : 'loading';
        const pos = position.pos ? position.pos : 'loading'
        return(
            <View style={styles.container}>
                    <Text style={styles.title}>My geolocation</Text>
                    <Button mode={"contained"} style={styles.button} color={'white'} disabled={canClick} onPress={()=>this.refresh()}><Text style={styles.button_text}>Get Geolocation</Text></Button>
                    <Fragment>
                         <Text style={styles.text}>Your coords:</Text>
                         <Text style={styles.coords}>{coords}</Text>
                         <Text style={styles.text}>Your location is: </Text>
                         <Text style={styles.coords}>{pos}</Text>
                         <WeatherBlock temperature={weather}></WeatherBlock>
                    </Fragment>
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
        marginTop: 10,
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
        width: 250,
    },
      button_text:{
        fontSize: 20
    }
});