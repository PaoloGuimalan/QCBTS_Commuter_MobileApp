import { View, Text, TouchableOpacity, Image, ScrollView, Platform, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainMap from '../maincomponents/MainMap'
import { SET_ASSIGNED_ROUTES_LIST, SET_BUS_STOPS_LIST, SET_ENABLE_LOCATION, SET_INITIAL_MAP_TRIGGER, SET_LIVE_BUST_LIST, SET_LIVE_ROUTE_LIST, SET_SELECTED_BUS_STOP, SET_SELECTED_LIVE_BUS, SET_SELECTED_ROUTE, SET_WAITING_BUS_STOP } from '../../redux/types/types'
import Axios from 'axios'
import { EXT_URL, URL } from '../../json/urlconfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import citylayout from '../../resources/citylayout.png'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FontAIcon from 'react-native-vector-icons/FontAwesome'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { selectedbusstopstate, selectedlivebusstate, selectedroutestate, waitingbusstopstate } from '../../redux/action/action'

const Map = ({navigation}) => {
  
    const authdetails = useSelector(state => state.authdetails);
    const busstopslist = useSelector(state => state.busstopslist);
    const enablelocation = useSelector(state => state.enablelocation)
    const selectedroute = useSelector(state => state.selectedroute)
    const currentlocation = useSelector(state => state.currentlocation);
    const selectedbusstop = useSelector(state => state.selectedbusstop);
    const waitingbusstop = useSelector(state => state.waitingbusstop)
    const selectedlivebus = useSelector(state => state.selectedlivebus);

    const [toggleMapMenu, settoggleMapMenu] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        initBusStopsList()
        initRoutesList()
        initAssignedRoutes()

        return () => {
            dispatch({ type: SET_SELECTED_BUS_STOP, selectedbusstop: selectedbusstopstate })
        }
    },[])

    const renameKey = ( obj, oldKey, newKey, nextoldKey, nextNewKey ) => {
        obj[nextNewKey] = obj[nextoldKey];
        obj[newKey] = obj[oldKey];
        delete obj[nextoldKey];
        delete obj[oldKey];
    }

    const selectRoute = (data) => {
        const arr = data.routePath;
        arr.forEach(obj => renameKey(obj, 'lng', 'longitude', "lat", "latitude"))

        var newData = {
            ...data,
            routePath: arr
        }

        return newData
    }

    const initRoutesList = async () => {
        await AsyncStorage.getItem('token').then((resp) => {
            if(resp != null){
                Axios.get(`${URL}/commuters/publicroutes`, {
                    headers: {
                        "x-access-token": resp
                    }
                }).then((response) => {
                    if(response.data.status){
                        // dispatch({ type: SET_LIVE_ROUTE_LIST, liveroutelist: response.data.result })
                        // console.log(response.data.result)
                        var arrFinal = [];
                        response.data.result.map((rt, i) => {
                            if(response.data.result.length - 1 == i){
                                arrFinal.push(selectRoute(rt))
                                // console.log(i)
                                dispatch({ type: SET_LIVE_ROUTE_LIST, liveroutelist: arrFinal })
                            }
                            else{
                                arrFinal.push(selectRoute(rt))
                            }
                        })
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

    const initAssignedRoutes = async () => {
        await AsyncStorage.getItem('token').then((resp) => {
            if(resp != null){
                Axios.get(`${URL}/commuters/allassignedroutes`, {
                    headers: {
                        "x-access-token": resp
                    }
                }).then((response) => {
                    if(response.data.status){
                        // console.log(response.data.result)
                        dispatch({ type: SET_ASSIGNED_ROUTES_LIST, assignedrouteslist: response.data.result })
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

    const initWaitingData = async () => {
        await AsyncStorage.getItem("token").then((resp) => {
          if(resp != null){
            Axios.get(`${URL}/commuters/initWaitingData`, {
              headers:{
                "x-access-token": resp
              }
            }).then((response) => {
              if(response.data.status){
                if(response.data.result == "OK"){
                    console.log("C1", response.data.result)
                    dispatch({type: SET_WAITING_BUS_STOP, waitingbusstop: waitingbusstopstate})
                }
                else{
                    dispatch({type: SET_WAITING_BUS_STOP, waitingbusstop: response.data.result})
                }
              }
              else{
                console.log("C2", response.data.message)
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        })
      }

    const markasWaiting = async (busStopID) => {
        await AsyncStorage.getItem("token").then((resp) => {
            Axios.post(`${URL}/commuters/postWaitingStatus`, {
                busStopID: busStopID
            },{
                headers:{
                    "x-access-token": resp
                }
            }).then((response) => {
                if(response.data.status){
                    if(Platform.OS == "android"){
                        ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                    }
                    else{
                        alert(response.data.message)
                    }
                    initWaitingData()
                }
                else{
                    if(Platform.OS == "android"){
                        ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                    }
                    else{
                        alert(response.data.message)
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        })
    }

    const markasIdle = async () => {
        await AsyncStorage.getItem("token").then((resp) => {
            Axios.post(`${URL}/commuters/postIdleStatus`, {},{
              headers: {
                "x-access-token": resp
              }
            }).then((response) => {
                if(response.data.status){
                  if(Platform.OS == "android"){
                    ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                  }
                  else{
                    alert(response.data.message)
                  }
                  initWaitingData()
                }
                else{
                  if(Platform.OS == "android"){
                    ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                  }
                  else{
                    alert(response.data.message)
                  }
                }
            }).catch((err) => {
                console.log(err)
            })
        })
    }

    var status = 0;

    useEffect(() => {
        // var interval = setInterval(() => {
        //     Axios.get(`${EXT_URL}/liveData`).then((response) => {
        //         var arrayData = Object.values(response.data)
        //         var arrayDataLength = arrayData.filter((dt, i) => dt.userID == selectedlivebus.userID).length
        //         // console.log(arrayData)
        //         dispatch({type: SET_LIVE_BUST_LIST, livebuslist: arrayData})
        //         // console.log(arrayDataLength)
        //         if(arrayDataLength == 0){
        //             if(status == 0){
        //                 status += 1
        //                 dispatch({ type: SET_SELECTED_LIVE_BUS, selectedlivebus: { userID: "", companyID: "" } })
        //                 if(selectedlivebus.userID != ""){
        //                     if(Platform.OS == "android"){
        //                         ToastAndroid.show("Bus went offline", ToastAndroid.SHORT)
        //                     }
        //                     else{
        //                         alert("Bus went offline")
        //                     }
        //                 }
        //                 // console.log(status, arrayDataLength)
        //             }
        //         }
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // },2000)

        // return () => {
        //     clearInterval(interval)
        //     status = false;
        // }
    },[selectedlivebus])

    var pollingLiveBus = () => {
        Axios.get(`${EXT_URL}/liveData`).then((response) => {
            var arrayData = Object.values(response.data)
            // var arrayDataLength1 = arrayData.filter((dt, i) => dt.userID == selectedlivebus.userID)
            var arrayDataLength = arrayData.filter((dt, i) => dt.userID == selectedlivebus.userID).length
            // console.log("ARRAY DATA", arrayData)
            dispatch({type: SET_LIVE_BUST_LIST, livebuslist: arrayData})
            // console.log(arrayDataLength1)
            if(arrayDataLength == 0){
                    // console.log(selectedlivebus.userID)
                    if(selectedlivebus.userID != ""){
                        dispatch({ type: SET_SELECTED_LIVE_BUS, selectedlivebus: selectedlivebusstate })
                        if(Platform.OS == "android"){
                            ToastAndroid.show("Bus went offline", ToastAndroid.SHORT)
                        }
                        else{
                            alert("Bus went offline")
                        }
                    }
            }
            else{
                // console.log("ARRAY DATA LENGTH NOT ZERO")
                status = 0
            }

            // console.log(status, arrayDataLength)

            setTimeout(() => {
                pollingLiveBus()
            }, 2000)
        }).catch((err) => {
            console.log(err)
            setTimeout(() => {
                pollingLiveBus()
            }, 2000)
        })
    }

    useEffect(() => {
        pollingLiveBus()

        return () => {
            pollingLiveBus = () => {  }
        }
    },[selectedlivebus])

    return (
     <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View style={{backgroundColor: "white", position: "absolute", zIndex: 1, bottom: 90, width: "100%", maxWidth: 345, borderRadius: 10, flexDirection: "column", alignItems: "center", maxHeight: 300, height: toggleMapMenu? "100%" : 30, paddingBottom: 5}}>
            <TouchableOpacity onPress={() => { settoggleMapMenu(!toggleMapMenu) }} style={{height: 30, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row", paddingLeft: 15, paddingRight: 15, borderBottomColor: "#808080", borderBottomWidth: toggleMapMenu? 1 : 0}}>
                <Text style={{color: "black", fontSize: 15, fontWeight: "bold"}}>Menu</Text>
                <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center", flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                    <MaterialIcons name='directions' style={{ color: selectedroute.routeID != null? "green" : "red", fontSize: 20, marginLeft:5 }} />
                    <IonIcons name='hand-left-sharp' style={{ color: waitingbusstop.busStopID != ''? "orange" : "red", fontSize: 15, marginLeft:5 }} />
                    <EntypoIcon name='location-pin' style={{ color: enablelocation? "green" : "red", fontSize: 20, marginLeft:5 }} />
                </View>
                <AntDesignIcon name={toggleMapMenu? 'down' : 'up'} style={{ color: "black", fontSize: 20 }} />
            </TouchableOpacity>
            <ScrollView nestedScrollEnabled={true} style={{width: "100%"}} contentContainerStyle={{flexGrow: 1}} fadingEdgeLength={5}>
                <View style={{backgroundColor: "transparent", width: "100%", paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10}}>
                    <View style={{width: "100%", backgroundColor: "transparent", flexDirection: "row"}}>
                        <View style={{width: "70%", paddingRight: 10}}>
                            <Text style={{fontSize: 13, color: "black", marginBottom: 0, height: 30}}>Stations Nearby</Text>
                            {currentlocation.status? (
                                <View style={{backgroundColor: "#D3D3D3", height: 100, borderRadius: 10, overflow: "hidden"}}>
                                    <ScrollView nestedScrollEnabled={true} style={{backgroundColor: "#D3D3D3", height: "100%", width: "100%", borderRadius: 10}} contentContainerStyle={{flexGrow: 1}}>
                                        {busstopslist.map((stops, i) => {
                                            if(stops.busStopID == waitingbusstop.busStopID){
                                                return(
                                                    <TouchableOpacity onPress={() => { dispatch({ type: SET_SELECTED_BUS_STOP, selectedbusstop: {
                                                        busStopID: stops.busStopID,
                                                        longitude: parseFloat(stops.coordinates.longitude),
                                                        latitude: parseFloat(stops.coordinates.latitude)
                                                    } }) }} onLongPress={() => { navigation.navigate("BusStopInfo", { id: stops.busStopID }) }} key={i} style={{backgroundColor: "orange", height: 100, borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 4, marginTop: 0, flexDirection: "column"}}>
                                                            <View style={{width: "100%", height: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", paddingLeft: 10, paddingRight: 10}}>
                                                                <MaterialComIcons name='bus-stop-covered' style={{fontSize: 30, color: "white"}} />
                                                                <View style={{flex: 1, backgroundColor: "transparent", height: "100%", flexDirection: "column", paddingLeft: 10, justifyContent: "center"}}>
                                                                    <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}}>{stops.busStopID} | Waiting...</Text>
                                                                    <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}}>{stops.stationName}</Text>
                                                                    <View style={{paddingTop: 10, flexDirection: "row"}}>
                                                                        <TouchableOpacity onPress={() => { markasIdle() }} style={{backgroundColor: "red", width: 100, height: 23, justifyContent: "center", alignItems: "center", borderRadius: 5, marginRight: 5}}>
                                                                            <Text style={{fontSize: 13, color: "white"}}>Cancel Await</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                )
                                            }
                                        })}
                                        {
                                            busstopslist.map((stops, i) => {
                                                if(computeDistance(currentlocation.lat, currentlocation.lng, stops.coordinates.latitude, stops.coordinates.longitude) < 50) {
                                                    if(stops.busStopID != waitingbusstop.busStopID){
                                                        return(
                                                            <TouchableOpacity onPress={() => { dispatch({ type: SET_SELECTED_BUS_STOP, selectedbusstop: {
                                                                busStopID: stops.busStopID,
                                                                longitude: parseFloat(stops.coordinates.longitude),
                                                                latitude: parseFloat(stops.coordinates.latitude)
                                                            } }) }} onLongPress={() => { navigation.navigate("BusStopInfo", { id: stops.busStopID }) }} key={i} style={{backgroundColor: "#808080", height: selectedbusstop.busStopID == stops.busStopID? 100 : 70, borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 4, marginTop: 0, flexDirection: "column"}}>
                                                                <View style={{width: "100%", height: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", paddingLeft: 10, paddingRight: 10}}>
                                                                    <MaterialComIcons name='bus-stop-covered' style={{fontSize: 30, color: "white"}} />
                                                                    <View style={{flex: 1, backgroundColor: "transparent", height: "100%", flexDirection: "column", paddingLeft: 10, justifyContent: "center"}}>
                                                                        <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}}>{stops.busStopID}</Text>
                                                                        <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}}>{stops.stationName}</Text>
                                                                        {selectedbusstop.busStopID == stops.busStopID? (
                                                                            <View style={{paddingTop: 10, flexDirection: "row"}}>
                                                                                <TouchableOpacity onPress={() => { markasWaiting(stops.busStopID) }} style={{backgroundColor: "orange", width: 50, height: 23, justifyContent: "center", alignItems: "center", borderRadius: 5, marginRight: 5}}>
                                                                                    <Text style={{fontSize: 13, color: "white"}}>Wait</Text>
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={() => { dispatch({ type: SET_SELECTED_BUS_STOP, selectedbusstop: selectedbusstopstate }) }} style={{backgroundColor: "red", width: 50, height: 23, justifyContent: "center", alignItems: "center", borderRadius: 5}}>
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
                    {selectedlivebus.userID != ""? (
                        <TouchableOpacity onPress={() => { navigation.navigate("BusInfo", { bus: { driverID: selectedlivebus.userID, companyID: selectedlivebus.companyID, busID: selectedlivebus.busID, routeID: selectedlivebus.routeID } }) }} onLongPress={() => { dispatch({ type: SET_INITIAL_MAP_TRIGGER, initialmaptrigger: "none" }); dispatch({ type: SET_SELECTED_LIVE_BUS, selectedlivebus: selectedlivebusstate }) }} style={{width: "100%"}}>
                            <View style={{backgroundColor: "#808080", width: "100%", marginTop: 15, minHeight: 100, borderRadius: 10, flexDirection: "column", justifyContent: "center", paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 15}}>
                                <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                                    <View style={{flexDirection: "column", width: "60%"}}>
                                        <Text style={{color: "#404040", fontSize: 13}}>Selected Bus </Text>
                                        <Text style={{color: "#404040", fontSize: 15, fontWeight: "bold"}}>{selectedlivebus.busID}</Text>
                                    </View>
                                    <View style={{flexDirection: "column", width: "40%"}}>
                                        <Text style={{color: "#505050", fontSize: 11, textAlign: "right"}}>Hold to unselect</Text>
                                        <Text style={{color: "#505050", fontSize: 11, textAlign: "right"}}>Click to view information</Text>
                                    </View>
                                </View>
                                <Text style={{color: "#404040", fontSize: 13}}>{selectedlivebus.company}</Text>
                                <View style={{width: "100%", flexDirection: "row"}}>
                                    <View style={{backgroundColor: "transparent", flexDirection: "column", justifyContent: "center", paddingTop: 10}}>
                                        <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}}>{selectedlivebus.plateNumber}</Text>
                                        <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold", maxWidth: 200}} numberOfLines={2}>{selectedlivebus.route}</Text>
                                    </View>
                                    <View style={{justifyContent: "space-around", alignItems: "flex-end", flex: 1, paddingTop: 5}}>
                                        <MaterialComIcons name='bus' style={{fontSize: 25, color: "#404040"}} />
                                        {/* <TouchableOpacity onPress={() => { navigation.navigate("BusInfo", { bus: { driverID: selectedlivebus.userID, companyID: selectedlivebus.companyID, busID: selectedlivebus.busID, routeID: selectedlivebus.routeID } }) }} style={{backgroundColor: "white", width: 60, height: 23, justifyContent: "center", alignItems: 'center', borderRadius: 5, marginTop: 10}}>
                                            <Text style={{color: "#404040", fontSize: 13}}>Bus Info</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : 
                    <View style={{backgroundColor: "#D3D3D3", width: "100%", marginTop: 15, minHeight: 135, borderRadius: 10, flexDirection: "column", justifyContent: "center", paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 15, alignItems: "center"}}>
                        <Text style={{color: "#808080", fontSize: 13, fontWeight: "bold"}}>No Bus Selected</Text>
                    </View>
                    }
                    {selectedbusstop.busStopID != ""? (
                        busstopslist.map((stops, i) => {
                                if(stops.busStopID == selectedbusstop.busStopID){
                                    return(
                                        <TouchableOpacity onLongPress={() => { dispatch({ type: SET_SELECTED_BUS_STOP, selectedbusstop: selectedbusstopstate}) }} onPress={() => { navigation.navigate("BusStopInfo", { id: stops.busStopID }) }} key={i} style={{backgroundColor: "#808080", height: selectedbusstop.busStopID == stops.busStopID? 100 : 70, borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 0, marginTop: 15, flexDirection: "column"}}>
                                            <View style={{width: "100%", height: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", paddingLeft: 10, paddingRight: 10}}>
                                                <MaterialComIcons name='bus-stop-covered' style={{fontSize: 30, color: "white"}} />
                                                <View style={{flex: 1, backgroundColor: "transparent", height: "100%", flexDirection: "column", paddingLeft: 10, justifyContent: "center"}}>
                                                    <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}}>{stops.busStopID}</Text>
                                                    <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}} numberOfLines={1}>{stops.stationName}</Text>
                                                    <Text style={{color: "#505050", fontSize: 11, textAlign: "left"}}>Hold to unselect</Text>
                                                    <Text style={{color: "#505050", fontSize: 11, textAlign: "left"}}>Click to view information</Text>
                                                    {/* {selectedbusstop.busStopID == stops.busStopID? (
                                                        <View style={{paddingTop: 10, flexDirection: "row"}}>
                                                            <TouchableOpacity onPress={() => { markasWaiting(stops.busStopID) }} style={{backgroundColor: "orange", width: 50, height: 23, justifyContent: "center", alignItems: "center", borderRadius: 5, marginRight: 5}}>
                                                                <Text style={{fontSize: 13, color: "white"}}>Wait</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => { dispatch({ type: SET_SELECTED_BUS_STOP, selectedbusstop: selectedbusstopstate }) }} style={{backgroundColor: "red", width: 50, height: 23, justifyContent: "center", alignItems: "center", borderRadius: 5}}>
                                                                <Text style={{fontSize: 13, color: "white"}}>Close</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    ) : (
                                                        <View></View>
                                                    )} */}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        )
                                }
                        })
                    ) : 
                    <View style={{backgroundColor: "#D3D3D3", width: "100%", marginTop: 15, minHeight: 100, borderRadius: 10, flexDirection: "column", justifyContent: "center", paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 15, alignItems: "center"}}>
                        <Text style={{color: "#808080", fontSize: 13, fontWeight: "bold"}}>No Station Selected</Text>
                    </View>
                    }
                    {selectedroute.routeID != null? (
                        <TouchableOpacity onPress={() => { navigation.navigate("RouteInfo", { id: selectedroute.routeID }) }} onLongPress={() => { dispatch({ type: SET_INITIAL_MAP_TRIGGER, initialmaptrigger: "none" }); dispatch({ type: SET_SELECTED_ROUTE, selectedroute: selectedroutestate }) }} style={{width: "100%"}}>
                            <View style={{backgroundColor: "#808080", width: "100%", marginTop: 15, minHeight: 100, borderRadius: 10, flexDirection: "column", justifyContent: "center", paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 15}}>
                                <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                                    <View style={{flexDirection: "column", width: "60%"}}>
                                        <Text style={{color: "#404040", fontSize: 13}}>Selected Route</Text>
                                        <Text style={{color: "#404040", fontSize: 15, fontWeight: "bold"}} numberOfLines={3}>{selectedroute.routeName} | {selectedroute.routeID}</Text>
                                    </View>
                                    <View style={{flexDirection: "column", width: "40%"}}>
                                        <Text style={{color: "#505050", fontSize: 11, textAlign: "right"}}>Hold to unselect</Text>
                                        <Text style={{color: "#505050", fontSize: 11, textAlign: "right"}}>Click to view information</Text>
                                    </View>
                                </View>
                                <Text style={{color: "#404040", fontSize: 13}}>{selectedroute.stationList.length} stations in this route</Text>
                                <View style={{width: "100%", flexDirection: "row"}}>
                                    <View style={{backgroundColor: "transparent", flexDirection: "column", justifyContent: "center", paddingTop: 10}}>
                                        <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold", maxWidth: 200}} numberOfLines={1}>{selectedroute.stationList[0].stationName}</Text>
                                        <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold", maxWidth: 200}} numberOfLines={1}>{selectedroute.stationList[selectedroute.stationList.length - 1].stationName}</Text>
                                    </View>
                                    <View style={{justifyContent: "center", alignItems: "flex-end", flex: 1, paddingTop: 5}}>
                                        <MaterialComIcons name='directions-fork' style={{fontSize: 25, color: "#404040"}} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : 
                    <View style={{backgroundColor: "#D3D3D3", width: "100%", marginTop: 15, minHeight: 155, borderRadius: 10, flexDirection: "column", justifyContent: "center", paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 15, alignItems: "center"}}>
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