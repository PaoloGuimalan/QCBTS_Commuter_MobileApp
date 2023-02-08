import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainMap from '../maincomponents/MainMap'
import { SET_BUS_STOPS_LIST, SET_ENABLE_LOCATION, SET_SELECTED_BUS_STOP, SET_SELECTED_ROUTE } from '../../redux/types/types'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import citylayout from '../../resources/citylayout.png'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FontAIcon from 'react-native-vector-icons/FontAwesome'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { selectedroutestate } from '../../redux/action/action'

const Map = ({navigation}) => {
  
    const authdetails = useSelector(state => state.authdetails);
    const busstopslist = useSelector(state => state.busstopslist);
    const enablelocation = useSelector(state => state.enablelocation)
    const selectedroute = useSelector(state => state.selectedroute)
    const currentlocation = useSelector(state => state.currentlocation);
    const selectedbusstop = useSelector(state => state.selectedbusstop);

    const [toggleMapMenu, settoggleMapMenu] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        initBusStopsList()

        return () => {
            dispatch({ type: SET_SELECTED_BUS_STOP, selectedbusstop: "" })
        }
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

    const computeDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3;
        const φ1 = parseFloat(lat1) * Math.PI/180;
        const φ2 = parseFloat(lat2) * Math.PI/180;
        const Δφ = (parseFloat(lat2) - parseFloat(lat1)) * Math.PI/180;
        const Δλ = (parseFloat(lon2) - parseFloat(lon1)) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c;

        return d;
    }

    const markasWaiting = (busStopID) => {
        alert(`OK ${busStopID}`)
    }

    return (
     <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View style={{backgroundColor: "white", position: "absolute", zIndex: 1, bottom: 90, width: "100%", maxWidth: 345, borderRadius: 10, flexDirection: "column", alignItems: "center", maxHeight: 300, height: toggleMapMenu? "100%" : 30, paddingBottom: 5}}>
            <TouchableOpacity onPress={() => { settoggleMapMenu(!toggleMapMenu) }} style={{height: 30, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row", paddingLeft: 15, paddingRight: 15, borderBottomColor: "#808080", borderBottomWidth: toggleMapMenu? 1 : 0}}>
                <Text style={{color: "black", fontSize: 15, fontWeight: "bold"}}>Menu</Text>
                <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center", flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                    <MaterialIcons name='directions' style={{ color: "red", fontSize: 20, marginLeft:5 }} />
                    <IonIcons name='hand-left-sharp' style={{ color: "red", fontSize: 15, marginLeft:5 }} />
                    <EntypoIcon name='location-pin' style={{ color: enablelocation? "green" : "red", fontSize: 20, marginLeft:5 }} />
                </View>
                <AntDesignIcon name={toggleMapMenu? 'down' : 'up'} style={{ color: "black", fontSize: 20 }} />
            </TouchableOpacity>
            <ScrollView style={{width: "100%"}} contentContainerStyle={{flexGrow: 1}} fadingEdgeLength={5}>
                <View style={{backgroundColor: "transparent", width: "100%", paddingLeft: 15, paddingRight: 15, paddingTop: 10}}>
                    <View style={{width: "100%", backgroundColor: "transparent", flexDirection: "row"}}>
                        <View style={{width: "70%", paddingRight: 10}}>
                            <Text style={{fontSize: 13, color: "black", marginBottom: 0, height: 30}}>Stations Nearby</Text>
                            {currentlocation.status? (
                                <View style={{backgroundColor: "#D3D3D3", height: 100, borderRadius: 10, overflow: "hidden"}}>
                                    <ScrollView style={{backgroundColor: "#D3D3D3", height: "100%", width: "100%", borderRadius: 10}} contentContainerStyle={{flexGrow: 1}}>
                                        {
                                            busstopslist.map((stops, i) => {
                                                if(computeDistance(currentlocation.lat, currentlocation.lng, stops.coordinates.latitude, stops.coordinates.longitude) < 50) {
                                                    return(
                                                        <TouchableOpacity onPress={() => { dispatch({ type: SET_SELECTED_BUS_STOP, selectedbusstop: stops.busStopID }) }} onLongPress={() => { navigation.navigate("BusStopInfo", { id: stops.busStopID }) }} key={i} style={{backgroundColor: "#808080", height: selectedbusstop == stops.busStopID? 100 : 70, borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 2, marginTop: 2, flexDirection: "column"}}>
                                                            <View style={{width: "100%", height: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", paddingLeft: 10, paddingRight: 10}}>
                                                                <MaterialComIcons name='bus-stop-covered' style={{fontSize: 30, color: "white"}} />
                                                                <View style={{flex: 1, backgroundColor: "transparent", height: "100%", flexDirection: "column", paddingLeft: 10, justifyContent: "center"}}>
                                                                    <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}}>{stops.busStopID}</Text>
                                                                    <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}}>{stops.stationName}</Text>
                                                                    {selectedbusstop == stops.busStopID? (
                                                                        <View style={{paddingTop: 10, flexDirection: "row"}}>
                                                                            <TouchableOpacity onPress={() => { markasWaiting(stops.busStopID) }} style={{backgroundColor: "orange", width: 50, height: 23, justifyContent: "center", alignItems: "center", borderRadius: 5, marginRight: 5}}>
                                                                                <Text style={{fontSize: 13, color: "white"}}>Wait</Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity onPress={() => { dispatch({ type: SET_SELECTED_BUS_STOP, selectedbusstop: "" }) }} style={{backgroundColor: "red", width: 50, height: 23, justifyContent: "center", alignItems: "center", borderRadius: 5}}>
                                                                                <Text style={{fontSize: 13, color: "white"}}>Close</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    ) : (
                                                                        <View></View>
                                                                    )}
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        )
                                                }
                                                else{
                                                    (
                                                    <View key={i} style={{backgroundColor: "#D3D3D3", minHeight: 100, borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                                                        <Text style={{color: "#808080", fontSize: 13, fontWeight: "bold"}}>No Bus Stop nearby</Text>
                                                    </View>
                                                )}
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            ) : (
                                <View style={{backgroundColor: "#D3D3D3", minHeight: 100, borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{color: "#808080", fontSize: 13, fontWeight: "bold"}}>Location not Enabled</Text>
                                </View>
                            )}
                        </View>
                        <View style={{width: "30%"}}>
                            <Text style={{fontSize: 13, color: "black", marginBottom: 0, height: 30}}>Location Sharing</Text>
                            <View style={{backgroundColor: "#D3D3D3", minHeight: 100, borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                                <TouchableOpacity onPress={() => { dispatch({ type: SET_ENABLE_LOCATION, enablelocation: !enablelocation }) }} style={{backgroundColor: enablelocation? "red" : "green", width: 70, height: 30, borderRadius: 5, justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{color: "white", fontSize: 13}}>{enablelocation? "Disable" : "Enable"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {selectedroute.routeID != null? (
                        <TouchableOpacity onPress={() => { navigation.navigate("RouteInfo", { id: selectedroute.routeID }) }} onLongPress={() => { dispatch({ type: SET_SELECTED_ROUTE, selectedroute: selectedroutestate }) }} style={{width: "100%"}}>
                            <View style={{backgroundColor: "#808080", width: "100%", marginTop: 15, minHeight: 100, borderRadius: 10, flexDirection: "column", justifyContent: "center", paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 15}}>
                                <Text style={{color: "#404040", fontSize: 13}}>Selected Route:</Text>
                                <Text style={{color: "#404040", fontSize: 15, fontWeight: "bold"}}>{selectedroute.routeName} | {selectedroute.routeID}</Text>
                                <Text style={{color: "#404040", fontSize: 13}}>{selectedroute.stationList.length} stations in this route</Text>
                                <View style={{width: "100%", flexDirection: "row"}}>
                                    <View style={{backgroundColor: "transparent", flexDirection: "column", justifyContent: "center", paddingTop: 10}}>
                                        <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}}>{selectedroute.stationList[0].stationName}</Text>
                                        <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}}>{selectedroute.stationList[selectedroute.stationList.length - 1].stationName}</Text>
                                    </View>
                                    <View style={{justifyContent: "center", alignItems: "flex-end", flex: 1, paddingTop: 5}}>
                                        <MaterialComIcons name='directions-fork' style={{fontSize: 25, color: "#404040"}} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : 
                    <View style={{backgroundColor: "#D3D3D3", width: "100%", marginTop: 15, minHeight: 100, borderRadius: 10, flexDirection: "column", justifyContent: "center", paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 15, alignItems: "center"}}>
                        <Text style={{color: "#808080", fontSize: 13, fontWeight: "bold"}}>No Routes Selected</Text>
                    </View>
                }
                </View>
            </ScrollView>
        </View>
        <MainMap />
     </View>
    )
}

export default Map