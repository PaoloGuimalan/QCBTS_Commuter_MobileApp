import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainMap from '../maincomponents/MainMap'
import { SET_BUS_STOPS_LIST, SET_ENABLE_LOCATION } from '../../redux/types/types'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import citylayout from '../../resources/citylayout.png'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FontAIcon from 'react-native-vector-icons/FontAwesome'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Map = () => {
  
    const authdetails = useSelector(state => state.authdetails);
    const busstopslist = useSelector(state => state.busstopslist);
    const enablelocation = useSelector(state => state.enablelocation)

    const [toggleMapMenu, settoggleMapMenu] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        initBusStopsList()
    },[])

    const initBusStopsList = async () => {
        await AsyncStorage.getItem('token').then((resp) => {
            if(resp != null){
                Axios.get(`${URL}/commuters/enabledBusStops`, {
                    headers:{
                        "x-access-token": resp
                    }
                }).then((response) => {
                    if(response.data.status){
                        dispatch({ type: SET_BUS_STOPS_LIST, busstopslist: response.data.result })
                        // console.log(response.data.result)
                    }
                    else{
                        console.log(response.data)
                    }
                }).catch((err) => {
                    console.log(err.message)
                })
            }
        })
    }

    return (
     <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View style={{backgroundColor: "white", position: "absolute", zIndex: 1, bottom: 90, width: "100%", maxWidth: 345, borderRadius: 10, flexDirection: "column", alignItems: "center", maxHeight: 300, height: toggleMapMenu? "100%" : 30}}>
            <TouchableOpacity onPress={() => { settoggleMapMenu(!toggleMapMenu) }} style={{height: 30, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row", paddingLeft: 15, paddingRight: 15}}>
                <Text style={{color: "black", fontSize: 15, fontWeight: "bold"}}>Menu</Text>
                <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center", flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                    <MaterialIcons name='directions' style={{ color: "red", fontSize: 20, marginLeft:5 }} />
                    <IonIcons name='hand-left-sharp' style={{ color: "red", fontSize: 15, marginLeft:5 }} />
                    <EntypoIcon name='location-pin' style={{ color: enablelocation? "green" : "red", fontSize: 20, marginLeft:5 }} />
                </View>
                <AntDesignIcon name={toggleMapMenu? 'down' : 'up'} style={{ color: "black", fontSize: 20 }} />
            </TouchableOpacity>
            <ScrollView style={{width: "100%"}} contentContainerStyle={{flexGrow: 1}}>
                <View style={{backgroundColor: "transparent", width: "100%", borderTopColor: "#808080", borderTopWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 10}}>
                    <View style={{width: "100%", backgroundColor: "transparent", flexDirection: "row"}}>
                        <View style={{width: "50%"}}>
                            <Text style={{fontSize: 13, color: "black"}}>Current Location & Destination</Text>
                        </View>
                        <View style={{width: "50%"}}>
                            <Text style={{fontSize: 13, color: "black", marginBottom: 10}}>Enable Location Sharing</Text>
                            <TouchableOpacity onPress={() => { dispatch({ type: SET_ENABLE_LOCATION, enablelocation: !enablelocation }) }} style={{backgroundColor: enablelocation? "red" : "green", width: 70, height: 30, borderRadius: 5, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{color: "white", fontSize: 13}}>{enablelocation? "Disable" : "Enable"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
        <MainMap />
     </View>
    )
}

export default Map