import React, {Component } from 'react';
import { StyleSheet, Text, View,AsyncStorage ,TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';
import CurrentLocation from '../currentLocation/currentLocation'

export default class HistoryBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            refresh: false,
            currentItem: {},
            page: 1
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
     
    showItem = (el) => {
        this.setState({
            currentItem: el,
            page: 2
        })
    }
    closeItem = () => {
       this.setState({
           page: 1
       })
    }
      
    render(){
        const data = this.state.items !== [] ? this.state.items.map((el)=> (<TouchableOpacity key={Math.random()*1000} onPress={()=> this.showItem(el)}>
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
                      <Text style={styles.text}>{(el.latlong.lat).toFixed(5)}</Text>
                      <Text style={styles.text}>Long:</Text>
                      <Text style={styles.text}>{(el.latlong.lon).toFixed(5)}</Text>
                  </View>
            </View>
            </TouchableOpacity>)) : null;
        
        const view = this.state.page === 2 ? (<CurrentLocation item={this.state.currentItem} closeClick={this.closeItem}/>) : (<View style={styles.container}>
            <Button  mode={"contained"} style={styles.mt} color={'white'} onPress={()=> this.clearStorage()}>Clear History</Button>
            <Button  mode={"contained"} style={styles.mt_2} color={'white'} onPress={()=>this.refreshHistory()}>Get History</Button>
            {data}
        </View>)
       
        return(
            view
        )

    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 11,
        color: '#fff',
        overflow: 'hidden'
    },
    container_item: {
        display: 'flex',
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginVertical: 20,
        borderStyle: 'solid',
        borderColor: '#000',
        borderRadius: 10,
        
        borderWidth: 1    
    },
    container_item_time: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 80,
        borderStyle: 'solid',
        borderColor: '#000',
        borderRightWidth:   1,
    },
    container_item_position:{
        width: 130,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderStyle: 'solid',
        borderColor: '#000',
        borderRightWidth:   1,

    },
    container_item_latlon: {
        width: 100,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
      
    },
    mt: {
        width: 200,
        marginTop: 50
    },
    mt_2:{
        marginTop: 20,
        width: 200,
    }

});