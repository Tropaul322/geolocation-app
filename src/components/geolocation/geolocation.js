import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import WeatherBlock from '../weatherBlock/weather-block';

export default class Geolocation extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          latlong: {},
          position: '',
          weather: {},
        };
      }

    
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(this.getInfo);
        this.getInfoPos();
        this.getInfoWeather()
    }
    getInfo = (posit) => {
        this.setState({
            latlong: {lat: posit.coords.latitude, lon: posit.coords.longitude}
        })
    }
    
    getInfoPos(){
        setTimeout(()=> {fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.latlong.lat}%2C%20${this.state.latlong.lon}&key=10bd99abd5a040aab9871541a080c076&language=ru&pretty=1`)
        .then((response) => response.json())
        .then((data) => this.setState({
            position: data.results[0].formatted
        }))}, 1500)
        
    }
    getInfoWeather(){
        setTimeout(()=>{
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latlong.lat}&lon=${this.state.latlong.lon}&appid=c92437d1837e764ceeb7115131fec2a8`)
                .then((response) => response.json())
                .then((data) => {this.setState({
                    weather: {temp: `${Math.round(data.main.temp-273)} °C`, weather: data.weather[0].main, icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` }
                })})
        }, 1000)
    }
    render(){
        const {latlong: {lat, lon}, position, weather} = this.state
        const coords = position ?  `Lat: ${lat}, Long: ${lon}` : 'load';
        const pos = position ? position : '<ActivityIndicator/>'
        console.log(weather);
    return(
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>My geolocation</Text>
                <Text style={styles.text}>Your coords:</Text>
                <Text style={styles.coords}>{coords}</Text>
                <Text style={styles.text}>Your location is: </Text>
                <Text style={styles.coords}>{pos}</Text>
                <WeatherBlock temperature={weather}></WeatherBlock> 
            </ScrollView>
        </View>
    )

}
}   
const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      },
    title: {
        paddingTop: 60,
        color: '#fff',
        fontSize: 40,
        fontWeight:'900',
        marginHorizontal: 5,
        textAlign: 'center',
      },
      coords: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 5,
      },
      text:{
        marginTop: 40,
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 24,
        color: '#fff'
      }
});