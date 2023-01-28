import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import citylayout from '../../resources/citylayout.png'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { URL } from '../../json/urlconfig'
import { SET_ROUTES_LIST } from '../../redux/types/types'

const Routes = () => {
  
    const authdetails = useSelector(state => state.authdetails)
    const routeslist = useSelector(state => state.routeslist);

    const dispatch = useDispatch()

    useEffect(() => {
        initRoutesList()
    },[])

    const initRoutesList = async () => {
        await AsyncStorage.getItem('token').then((resp) => {
            if(resp != null){
                Axios.get(`${URL}/commuters/publicroutes`, {
                    headers: {
                        "x-access-token": resp
                    }
                }).then((response) => {
                    if(response.data.status){
                        dispatch({ type: SET_ROUTES_LIST, routeslist: response.data.result })
                        // console.log(response.data.result)
                    }
                    else{
                        console.log(response.data.message)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        })
    }

    return (
        <View style={{flex: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "white", flexDirection: "column"}}>
        <View style={{height: 180, backgroundColor: "#2B4273", width: "100%", borderBottomLeftRadius: 15, borderBottomRightRadius: 15, justifyContent: "flex-end", alignItems: "center"}}>
            <View style={{position: "relative", top: 85, zIndex: 1, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Text style={{color: "white", fontSize: 20, fontWeight: "bold", marginBottom: 10, textShadowColor: "black", textShadowOffset: { height: 0.5, width: 0.5 }, textShadowRadius: 1}}>Buses & Routes</Text>
            </View>
            <Image source={citylayout} style={{width: "100%", height: 140, maxWidth: 385}} />
        </View>
        <View style={{backgroundColor: "transparent", flex: 1, width: "100%"}}>
            <ScrollView style={{width: "100%", backgroundColor: "transparent"}} contentContainerStyle={{flexGrow: 1}}>
                <View style={{backgroundColor: "transparent", justifyContent: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 15, paddingTop: 10}}>
                    <Text style={{color: "#303030", fontSize: 17, marginTop: 10, fontWeight: "bold"}}>Buses</Text>
                </View>
                <View style={{backgroundColor: "transparent", justifyContent: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 15, paddingTop: 10}}>
                    <Text style={{color: "#303030", fontSize: 17, marginTop: 10, fontWeight: "bold"}}>Routes</Text>
                    <View style={{backgroundColor: "transparent", width: "100%", maxWidth: 500, paddingTop: 10}}>
                        {routeslist.map((data, i) => {
                            return(
                                <TouchableOpacity key={data.routeID} style={{width: "100%", backgroundColor: 'transparent', borderWidth: 1, borderColor: "#808080", height: 65, borderRadius: 10, flexDirection: "column", justifyContent: "center", paddingLeft: 10, paddingRight: 10, marginBottom: 10}}>
                                    <View style={{width: "100%"}}>
                                        <Text style={{color: "#808080", fontSize: 13}}>{data.routeID}</Text>
                                    </View>
                                    <View style={{width: "100%", flexDirection: "row", alignItems: 'center'}}>
                                        <Text style={{color: "#404040", fontSize: 15, fontWeight: "bold"}}>{data.routeName}</Text>
                                        <View style={{flex: 1, justifyContent: "center", alignItems: "flex-end"}}>
                                            <View style={{flexDirection: "row"}}>
                                                <Text style={{color: "#808080", fontSize: 13}}>from </Text>
                                                <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}}>{data.stationList[0].stationName}</Text>
                                            </View>
                                            <View style={{flexDirection: "row"}}>
                                                <Text style={{color: "#808080", fontSize: 13}}>to </Text>
                                                <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}}>{data.stationList[data.stationList.length - 1].stationName}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
     </View>
    )
}

export default Routes