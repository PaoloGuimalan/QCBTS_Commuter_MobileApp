import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import citylayout from '../../resources/citylayout.png'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EXT_URL, URL } from '../../json/urlconfig'
import { SET_CURRENT_TAB, SET_INITIAL_MAP_TRIGGER, SET_LIVE_BUST_LIST, SET_ROUTES_LIST, SET_SELECTED_LIVE_BUS, SET_SELECTED_ROUTE } from '../../redux/types/types'
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Routes = ({navigation}) => {
  
    const authdetails = useSelector(state => state.authdetails)
    const routeslist = useSelector(state => state.routeslist);
    const livebuslist = useSelector(state => state.livebuslist)
    // const livebuslist = [
    //     {
    //         "_id": "63941134a56fb51ebb984788",
    //         "userID": "driver_8642686",
    //         "companyID": "company_907170",
    //         "userType": "Driver",
    //         "firstName": "Paolo",
    //         "middleName": "N/A",
    //         "lastName": "Guimalan",
    //         "dlicense": "KJKSDHJKJAHS",
    //         "status": false,
    //         "locationSharing": true,
    //         "__v": 0,
    //         "busID": "BUS_3918347",
    //         "driverID": "driver_8642686",
    //         "busModel": "Medium Bus",
    //         "plateNumber": "AHG276",
    //         "capacity": "50",
    //         "routeID": "RT_31487480",
    //         "routeName": "Nova Rizal Route",
    //         "privacy": true,
    //         "latitude": "14.5948672",
    //         "longitude": "121.0220544"
    //     },
    //     {
    //         "_id": "63941134a56fb51ebb984788",
    //         "userID": "driver_8642686",
    //         "companyID": "company_907170",
    //         "userType": "Driver",
    //         "firstName": "Paolo",
    //         "middleName": "N/A",
    //         "lastName": "Guimalan",
    //         "dlicense": "KJKSDHJKJAHS",
    //         "status": false,
    //         "locationSharing": true,
    //         "__v": 0,
    //         "busID": "BUS_3918347",
    //         "driverID": "driver_8642686",
    //         "busModel": "Medium Bus",
    //         "plateNumber": "AHG276",
    //         "capacity": "50",
    //         "routeID": "RT_31487480",
    //         "routeName": "Nova Rizal Route",
    //         "privacy": true,
    //         "latitude": "14.5948672",
    //         "longitude": "121.0220544"
    //     }
    // ]

    const dispatch = useDispatch()

    const [routeloadingStatus, setrouteloadingStatus] = useState(true);
    const [busesloadingStatus, setbusesloadingStatus] = useState(true)

    useEffect(() => {
        initRoutesList()
        initLiveBus()
    },[])

    const initRoutesList = async () => {
        setrouteloadingStatus(true)
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
                    setrouteloadingStatus(false)
                }).catch((err) => {
                    console.log(err)
                    setrouteloadingStatus(false)
                })
            }
        })
    }

    const renameKey = ( obj, oldKey, newKey, nextoldKey, nextNewKey ) => {
        obj[nextNewKey] = obj[nextoldKey];
        obj[newKey] = obj[oldKey];
        delete obj[nextoldKey];
        delete obj[oldKey];
      }

    const selectRoute = (data) => {
        const arr = data.routePath;
        if(arr[0].hasOwnProperty("lng") && arr[0].hasOwnProperty("lat")){
            arr.forEach(obj => renameKey(obj, 'lng', 'longitude', "lat", "latitude"))

            var newData = {
                ...data,
                routePath: arr
            }

            dispatch({ type: SET_INITIAL_MAP_TRIGGER, initialmaptrigger: "route" })
            dispatch({ type: SET_SELECTED_ROUTE, selectedroute: newData })
            dispatch({ type: SET_CURRENT_TAB, currenttab: "Map" })
            setTimeout(() => {
                navigation.navigate("Map")
            },500)
        }
        else{
            var newData = {
                ...data,
                routePath: arr
            }

            dispatch({ type: SET_INITIAL_MAP_TRIGGER, initialmaptrigger: "route" })
            dispatch({ type: SET_SELECTED_ROUTE, selectedroute: newData })
            dispatch({ type: SET_CURRENT_TAB, currenttab: "Map" })
            setTimeout(() => {
                navigation.navigate("Map")
            },500)
        }
    }

    const initLiveBus = () => {
        setbusesloadingStatus(true)
        Axios.get(`${EXT_URL}/liveData`).then((response) => {
            var arrayData = Object.values(response.data)
            // console.log(arrayData)
            dispatch({type: SET_LIVE_BUST_LIST, livebuslist: arrayData})
            setbusesloadingStatus(false)
            // console.log(arrayDataLength)
        }).catch((err) => {
            console.log(err)
            setbusesloadingStatus(false)
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
        <View style={{backgroundColor: "transparent", flex: 1, width: "100%", alignItems: "center"}}>
            <ScrollView style={{width: "100%", backgroundColor: "transparent"}} contentContainerStyle={{flexGrow: 1}}>
                <View style={{backgroundColor: "transparent", justifyContent: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 15, paddingTop: 10}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: "center", backgroundColor: "transparent", height: 40}}>
                        <Text style={{color: "#303030", fontSize: 17, marginTop: 0, fontWeight: "bold"}}>Buses</Text>
                        <TouchableOpacity onPress={() => { initLiveBus() }} style={{backgroundColor: "transparent", marginLeft: 10}}>
                            <MaterialComIcons name='reload' style={{fontSize: 25, color: "#404040"}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor: "transparent", width: "100%", maxWidth: 500, paddingTop: 10, flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
                        {busesloadingStatus? (
                            <View style={{width: "100%", height: 170, backgroundColor: "transparent", flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <Text style={{color: "#787878", fontSize: 13, marginTop: 10}}>Loading...</Text>
                            </View>
                        ) : (
                            livebuslist.length == 0? (
                                <View style={{width: "100%", height: 170, backgroundColor: "transparent", flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                    <MaterialComIcons name='bus-alert' style={{fontSize: 80, color: "#808080"}} />
                                </View>
                            ) : (
                                livebuslist.map((bss, i) => {
                                    return(
                                        <TouchableOpacity key={i} onPress={() => {
                                            dispatch({ type: SET_INITIAL_MAP_TRIGGER, initialmaptrigger: "livebus" })
                                            dispatch({ type: SET_SELECTED_LIVE_BUS, selectedlivebus: { 
                                                userID: bss.userID,
                                                companyID: bss.companyID,
                                                busID: bss.busID,
                                                companyID: bss.companyID,
                                                plateNumber: bss.plateNumber,
                                                route: bss.routeName,
                                                latitude: parseFloat(bss.latitude),
                                                longitude: parseFloat(bss.longitude)
                                            }})
                                            dispatch({ type: SET_CURRENT_TAB, currenttab: "Map" })
                                            setTimeout(() => {
                                                navigation.navigate("Map")
                                            },500)
                                        }} style={{backgroundColor: "transparent", width: 120, margin: 5, height: 120, borderRadius: 5}}>
                                            <View style={{flex: 1, width: "100%", height: "100%", backgroundColor: "#909090", borderRadius: 10, flexDirection: "column", justifyContent: "flex-end", alignItems: "center", paddingBottom: 5}}>
                                                <MaterialComIcons name='bus' style={{fontSize: 50, color: "#404040"}} />
                                                <View style={{backgroundColor: "transparent", width: "100%", height: 50}}>
                                                    <View style={{backgroundColor: "transparent", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                                        <Text style={{fontSize: 13, fontWeight: "bold"}}>{bss.busID}</Text>
                                                        <Text style={{fontSize: 12, textAlign: "center", width: "90%", color: "#404040"}} numberOfLines={2}>{bss.routeName}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            )
                        )}
                    </View>
                </View>
                <View style={{backgroundColor: "transparent", justifyContent: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 15, paddingTop: 10}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: "center", backgroundColor: "transparent", height: 40}}>
                        <Text style={{color: "#303030", fontSize: 17, marginTop: 0, fontWeight: "bold"}}>Routes</Text>
                        <TouchableOpacity onPress={() => { initRoutesList() }} style={{backgroundColor: "transparent", marginLeft: 10}}>
                            <MaterialComIcons name='reload' style={{fontSize: 25, color: "#404040"}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor: "transparent", width: "100%", maxWidth: 500, paddingTop: 10, paddingBottom: 70, alignItems: 'center'}}>
                        {routeloadingStatus? (
                            <View style={{width: "100%", height: 170, backgroundColor: "transparent", flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <Text style={{color: "#787878", fontSize: 13, marginTop: 10}}>Loading...</Text>
                            </View>
                        ) : (
                            routeslist.map((data, i) => {
                                return(
                                    <TouchableOpacity onLongPress={() => { navigation.navigate("RouteInfo", { id: data.routeID }) }} onPress={() => { selectRoute(data) }} key={data.routeID} style={{width: "100%", backgroundColor: 'transparent', borderWidth: 1, borderColor: "#808080", height: 65, borderRadius: 10, flexDirection: "column", justifyContent: "center", paddingLeft: 10, paddingRight: 10, marginBottom: 10}}>
                                        <View style={{width: "100%"}}>
                                            <Text style={{color: "#808080", fontSize: 13}}>{data.routeID}</Text>
                                        </View>
                                        <View style={{width: "100%", flexDirection: "row", alignItems: 'center'}}>
                                            <Text style={{color: "#404040", fontSize: 15, fontWeight: "bold", width: 120}} numberOfLines={2}>{data.routeName}</Text>
                                            <View style={{flex: 1, justifyContent: "center", alignItems: "flex-end"}}>
                                                <View style={{flexDirection: "row", justifyContent: "flex-end", width: 170, paddingRight: 0}}>
                                                    <Text style={{color: "#808080", fontSize: 13}}>from </Text>
                                                    <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}} numberOfLines={1}>{data.stationList[0].stationName}</Text>
                                                </View>
                                                <View style={{flexDirection: "row", justifyContent: "flex-end", width: 170, paddingRight: 0}}>
                                                    <Text style={{color: "#808080", fontSize: 13}}>to </Text>
                                                    <Text style={{color: "#404040", fontSize: 13, fontWeight: "bold"}} numberOfLines={1}>{data.stationList[data.stationList.length - 1].stationName}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
     </View>
    )
}

export default Routes