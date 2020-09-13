import React, {Component} from 'react';
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
          isShow: false
          
        };
        navigator.geolocation.getCurrentPosition(this.getInfo);
        this.getInfoPos();
        this.getInfoWeather();
      }

    getInfo = (posit) => {
        const date = new Date() 
        this.setState({
            latlong: {lat: posit.coords.latitude, lon: posit.coords.longitude},
            date: {day: date.getDate(), month: date.getMonth(), hours: date.getHours(), min: date.getMinutes()}
        })
    }
    
    getInfoPos = ()=>{
        setTimeout(()=> {  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.latlong.lat}%2C%20${this.state.latlong.lon}&key=10bd99abd5a040aab9871541a080c076&language=ru&pretty=1`)
        .then((response) => response.json())
        .then((data) => this.setState({
            position: {pos: data.results[0].formatted}
        }))}, 400)
    }
    
    getInfoWeather(){
        setTimeout(()=>{
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latlong.lat}&lon=${this.state.latlong.lon}&appid=c92437d1837e764ceeb7115131fec2a8`)
                .then((response) => response.json())
                .then((data) => {this.setState({
                    weather: {temp: `${Math.round(data.main.temp-273)} °C`, weather: data.weather[0].main, icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` }
                })})
        }, 400)
    }
    
    
    setStorage = async (state) => {
        const {latlong, position, date} = state
        let todos;
        if (await AsyncStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(await AsyncStorage.getItem("todos"))
        }
        todos.push({latlong: latlong, position: position, date: date})
        AsyncStorage.setItem('todos', JSON.stringify(todos))
        this.setState({
            canClick: true
        })
    }

    refresh = () => {
        setTimeout(async ()=>{
            navigator.geolocation.getCurrentPosition(this.getInfo);
            await this.getInfoPos();
            await this.getInfoWeather();
            await this.setStorage(this.state)
            this.setState({
                isShow: true,
            })
            setTimeout(() => {
                this.setState({
                    canClick: false
                })
            })
        }, 300)
    }

    render(){
        const {latlong: {lat, lon}, position, weather,isShow, canClick} = this.state
        const coords = position.pos ?  `Lat: ${lat}, Long: ${lon}` : 'loading';
        const pos = position.pos ? position.pos : 'loading'
        const data = isShow ? (<><Text style={styles.text}>Your coords:</Text>
            <Text style={styles.coords}>{coords}</Text>
            <Text style={styles.text}>Your location is: </Text>
            <Text style={styles.coords}>{pos}</Text>
            <WeatherBlock temperature={weather}></WeatherBlock></>) : null
    return(
        <View style={styles.container}>
                <Text style={styles.title} onPress={() => this.onPressa(position)}>My geolocation</Text>
                <Button color={'white'} disabled={canClick} onPress={()=>this.refresh()}>Get Geolocation</Button>
                {data}
        </View>
    )

}
}   
const styles = StyleSheet.create({
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
      }
});