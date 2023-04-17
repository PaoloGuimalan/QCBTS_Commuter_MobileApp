import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Platform, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import citylayout from '../../resources/citylayout.png'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Axios from 'axios';
import { EXT_URL, URL } from '../../json/urlconfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_CURRENT_TAB, SET_INITIAL_MAP_TRIGGER, SET_SEARCH_RESULT_LIST, SET_SELECTED_BUS_STOP, SET_SELECTED_LIVE_BUS, SET_SELECTED_ROUTE } from '../../redux/types/types'
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { searchresultliststate } from '../../redux/action/action'

const Search = ({navigation}) => {
  
    const authdetails = useSelector(state => state.authdetails)
    const searchresultlist = useSelector(state => state.searchresultlist)
    const dispatch = useDispatch()

    const [keyword, setkeyword] = useState("");
    const [searchingStatus, setsearchingStatus] = useState(false);

    useEffect(() => {
        return () => {
            setkeyword("")
            // dispatch({ type: SET_SEARCH_RESULT_LIST, searchresultlist: searchresultliststate})
        }
    }, [])
    

    const getSearchResults = async () => {
        if(keyword.trim() == ""){
            if(Platform.OS == "android"){
                ToastAndroid.show("Please input a keyword", ToastAndroid.SHORT)
            }
            else{
                alert("Please input a keyword")
            }
        }
        else{
            setsearchingStatus(true)
            if(Platform.OS == "android"){
                ToastAndroid.show("Searching", ToastAndroid.SHORT)
            }
            else{
                alert("Searching...")
            }
            await AsyncStorage.getItem("token").then((resp) => {
                if(resp != null){
                    Axios.get(`${URL}/commuters/commuterSearch/${keyword}`, {
                        headers:{
                            "x-access-token": resp
                        }
                    }).then((response) => {
                        if(response.data.status){
                            // console.log(response.data.result)
                            Axios.get(`${EXT_URL}/liveData`).then((response1) => {
                                var arrayData = Object.values(response1.data)
                                var arrayDataFiltered = arrayData.filter((dt, i) => dt.routeName.includes(keyword))
                                // console.log(arrayDataFiltered)
                                dispatch({ type: SET_SEARCH_RESULT_LIST, searchresultlist: {
                                    ...response.data.result,
                                    Buses: arrayDataFiltered
                                }})
                                setsearchingStatus(false)
                                // console.log(arrayDataLength)
                            }).catch((err1) => {
                                console.log(err1)
                            })
                        }
                    }).catch((err) => {
                        console.log(err)
                        setsearchingStatus(false)
                    })
                }
            })
        }
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

    return (
     <View style={{flex: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "white", flexDirection: "column"}}>
        <View style={{height: 180, backgroundColor: "#2B4273", width: "100%", borderBottomLeftRadius: 15, borderBottomRightRadius: 15, justifyContent: "flex-end", alignItems: "center"}}>
            <View style={{position: "relative", top: 145, zIndex: 1, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Text style={{color: "white", fontSize: 20, fontWeight: "bold", marginBottom: 10, textShadowColor: "black", textShadowOffset: { height: 0.5, width: 0.5 }, textShadowRadius: 1}}>Explore</Text>
                <View style={{backgroundColor: "white", width: "80%", height: 40, borderRadius: 40, maxWidth: 500, flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingRight: 10, elevation: 2, zIndex: 1}}>
                    <IonIcons name='search' style={{color: "#7A7A7A", fontSize: 25}} />
                    <TextInput onSubmitEditing={() => { getSearchResults() }} placeholder='Search here...' style={{backgroundColor: "transparent", flex: 1, color: "black"}} value={keyword} onChangeText={(e) => { setkeyword(e) }} />
                </View>
            </View>
            <Image source={citylayout} style={{width: "100%", height: 180, zIndex: -1, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}} />
        </View>
        <View style={{backgroundColor: "transparent", flex: 1, width: "100%"}}>
            <ScrollView style={{width: "100%", backgroundColor: "transparent"}} contentContainerStyle={{flexGrow: 1, paddingBottom: 70}}>
                {searchingStatus? (
                    <View style={{backgroundColor: "transparent", flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{color: "#787878", fontSize: 13, marginTop: 10}}>Searching...</Text>
                    </View>
                ) : (
                    searchresultlist.Buses.length != 0 || searchresultlist.Routes.length != 0 || searchresultlist.BusStops.length != 0? (
                        <View style={{width: "100%", backgroundColor: "transparent", padding: 10, paddingTop: 10}}>
                            {searchresultlist.Buses.length != 0? (
                                <View style={{backgroundColor: "transparent", justifyContent: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 15, paddingTop: 10}}>
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: "center", backgroundColor: "transparent", height: 40}}>
                                        <Text style={{color: "#303030", fontSize: 17, marginTop: 0, fontWeight: "bold"}}>Buses</Text>
                                    </View>
                                    <View style={{backgroundColor: "transparent", width: "100%", maxWidth: 500, paddingTop: 10, flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
                                        {searchresultlist.Buses.map((bss, i) => {
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
                                                        <View style={{flex: 1, width: "100%", height: "100%", backgroundColor: "#808080", borderRadius: 10, flexDirection: "column", justifyContent: "flex-end", alignItems: "center"}}>
                                                            <MaterialComIcons name='bus' style={{fontSize: 50, color: "#404040"}} />
                                                            <View style={{backgroundColor: "transparent", width: "100%", height: 50}}>
                                                                <View style={{backgroundColor: "transparent", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                                                    <Text style={{fontSize: 13, fontWeight: "bold", color: "#404040"}}>{bss.busID}</Text>
                                                                    <Text style={{fontSize: 12, textAlign: "center", width: "90%", color: "#404040"}} numberOfLines={2}>{bss.routeName}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                    </View>
                                </View>
                            ) : (
                                <View></View>
                            )}
                            {searchresultlist.Routes.length != 0? (
                                <View style={{backgroundColor: "transparent", justifyContent: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 15, paddingTop: 10}}>
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: "center", backgroundColor: "transparent", height: 40}}>
                                        <Text style={{color: "#303030", fontSize: 17, marginTop: 0, fontWeight: "bold"}}>Routes</Text>
                                    </View>
                                    <View style={{backgroundColor: "transparent", width: "100%", maxWidth: 500, paddingTop: 10}}>
                                        {searchresultlist.Routes.map((data, i) => {
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
                                        })}
                                    </View>
                                </View>
                            ) : (
                                <View></View>
                            )}
                            {searchresultlist.BusStops.length != 0? (
                                <View style={{backgroundColor: "transparent", justifyContent: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 15, paddingTop: 10}}>
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: "center", backgroundColor: "transparent", height: 40}}>
                                        <Text style={{color: "#303030", fontSize: 17, marginTop: 0, fontWeight: "bold"}}>Bus Stops / Stations</Text>
                                    </View>
                                    <View style={{backgroundColor: "transparent", width: "100%", maxWidth: 500, paddingTop: 10, flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
                                        {searchresultlist.BusStops.map((bss, i) => {
                                                return(
                                                    <TouchableOpacity key={i} onPress={() => { 
                                                        dispatch({ type: SET_INITIAL_MAP_TRIGGER, initialmaptrigger: "busstop" })
                                                        dispatch({type: SET_SELECTED_BUS_STOP, selectedbusstop: {
                                                            busStopID: bss.busStopID,
                                                            longitude: parseFloat(bss.coordinates.longitude),
                                                            latitude: parseFloat(bss.coordinates.latitude)
                                                        }}) 
                                                        dispatch({ type: SET_CURRENT_TAB, currenttab: "Map" })
                                                        setTimeout(() => {
                                                            navigation.navigate("Map")
                                                        },500)
                                                    }} style={{backgroundColor: "transparent", width: 120, margin: 5, height: 120, borderRadius: 5}}>
                                                        <View style={{flex: 1, width: "100%", height: "100%", backgroundColor: "#808080", borderRadius: 10, flexDirection: "column", justifyContent: "flex-end", alignItems: "center"}}>
                                                            <MaterialComIcons name='bus-stop-covered' style={{fontSize: 50, color: "#404040"}} />
                                                            <View style={{backgroundColor: "transparent", width: "100%", height: 50}}>
                                                                <View style={{backgroundColor: "transparent", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                                                    <Text style={{fontSize: 13, fontWeight: "bold", color: "#404040"}}>{bss.busStopID}</Text>
                                                                    <Text style={{fontSize: 12, textAlign: "center", width: "90%", color: "#404040"}} numberOfLines={2}>{bss.stationName}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                    </View>
                                </View>
                            ) : (
                                <View></View>
                            )}
                        </View>
                    ) : (
                        <View style={{backgroundColor: "transparent", flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <MCIcons name='image-filter-none' style={{fontSize: 60}} />
                            <Text style={{color: "#787878", fontSize: 13, marginTop: 20}}>Search a Bus Stop, Route and Active Buses</Text>
                        </View>
                    )
                )}
            </ScrollView>
        </View>
     </View>
    )
}

export default Search