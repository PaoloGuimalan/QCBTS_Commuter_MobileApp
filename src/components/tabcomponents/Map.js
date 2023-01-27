import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainMap from '../maincomponents/MainMap'
import { SET_BUS_STOPS_LIST } from '../../redux/types/types'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import citylayout from '../../resources/citylayout.png'

const Map = () => {
  
    const authdetails = useSelector(state => state.authdetails);
    const busstopslist = useSelector(state => state.busstopslist);

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
        {/* <View style={{height: 120, position: "absolute", zIndex: 1, top: 0, backgroundColor: "#2B4273", width: "100%", borderBottomLeftRadius: 15, borderBottomRightRadius: 15, justifyContent: "flex-end", alignItems: "center", borderColor: "white", borderWidth: 1, borderTopWidth: 0}}>
            <View style={{position: "relative", top: 105, zIndex: 1, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Text style={{color: "white", fontSize: 20, fontWeight: "bold", marginBottom: 10, textShadowColor: "black", textShadowOffset: { height: 0.5, width: 0.5 }, textShadowRadius: 1}}>Map</Text>
            </View>
            <Image source={citylayout} style={{width: "100%", height: 140, maxWidth: 385}} />
        </View> */}
        <MainMap />
     </View>
    )
}

export default Map