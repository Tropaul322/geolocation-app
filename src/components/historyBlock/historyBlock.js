import React, {Component} from 'react';
import { StyleSheet, Text, View,AsyncStorage ,TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';



export default class HistoryBlock extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            items: [],
            refresh: false
        };
      }
    getData = async ()=>{
        try{
            let data = (await AsyncStorage.getItem('todos'))
            const dataInfo = JSON.parse(data)
            this.setState({
                items: dataInfo
            })
        }
        catch{
            alert('error')
        }
     } 

     clearStorage = () =>{
         AsyncStorage.clear()
         this.setState({
             items: [],
             refresh: true
         })
     }
     
     refreshHistory = async () =>{
        let data = (await AsyncStorage.getItem('todos'))
         if(data !== null){
            this.getData()
        } else {
            return
        }
     }  
      
    render(){
        const data = this.state.items !== [] ? this.state.items.map((el)=> (<TouchableOpacity key={Math.random()*1000}>
            <View style={styles.container_item}>
                  <View style={styles.container_item_time}>
                      <Text style={styles.text}>{el.date.day}.{el.date.month}</Text>
                      <Text style={styles.text}>{el.date.hours}:{el.date.min}</Text>
                  </View>
                  <View style={styles.container_item_position}>
                      <Text style={styles.text}>{el.position.pos}</Text>
                  </View>
                  <View style={styles.container_item_latlon}>
                      <Text style={styles.text}>Lat:</Text>
                      <Text style={styles.text}>{el.latlong.lat}</Text>
                      <Text style={styles.text}>Long:</Text>
                      <Text style={styles.text}>{el.latlong.lon}</Text>
                  </View>
            </View>
            </TouchableOpacity> )) : null
       
        return(
            <View style={styles.container}>
                <Button  mode={"outlined"} style={styles.mt} color={'white'} onPress={()=> this.clearStorage()}>Clear History</Button>
                <Button  mode={"outlined"} style={styles.mt_2} color={'white'} onPress={()=>this.refreshHistory()}>Get History</Button>
                {data}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
         justifyContent: 'center',
    },
    text:{
        fontSize: 11
    },
    container_item: {
        display: 'flex',
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
         justifyContent: 'center',
        backgroundColor: '#fefefefe',
        marginVertical: 20,
        borderRadius: 10,    
    },
    container_item_time: {
        alignItems: 'center',
         justifyContent: 'center',
        width: 50,
        height: 100,
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 1
    },
    container_item_position:{
        width: 150,
        height: 100,
        alignItems: 'center',
         justifyContent: 'center',
         paddingHorizontal: 10,
         borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 1

    },
    container_item_latlon: {
        width: 120,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        paddingHorizontal: 10,
        borderColor: '#000',
        borderWidth: 1     
    },
    mt: {
        width: 200,
        marginTop: 50
    },
    mt_2:{
        width: 200,
    }

});