import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MIcons from 'react-native-vector-icons/MaterialIcons'
import citylayout from '../../resources/citylayout.png'
import { useSelector } from 'react-redux'
import LiveBusIcon from '../../resources/livebus_hd.png'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const RouteInfo = ({route, navigation}) => {

  const routeID = route.params.id

  useEffect(() => {
    initRouteInfo()
  },[])

  const initialRouteInfo = {
    routeID: "",
    routeName: "",
    stationList: [],
    routePath: [],
    dateAdded: "",
    addedBy: "",
    companyID: "",
    privacy: null,
    status: null,
  }

  const [routeInfo, setrouteInfo] = useState(initialRouteInfo)

  const initRouteInfo = async () => {
    await AsyncStorage.getItem("token").then((resp) => {
      if(resp != null){
        Axios.get(`${URL}/commuters/getRouteData/${routeID}`,{
          headers:{
            "x-access-token": resp
          }
        }).then((response) => {
          if(response.data.status){
            // console.log(response.data.result)
            setrouteInfo(response.data.result)
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
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      {routeInfo.routeID != ""? (
        <View style={{backgroundColor: "white", flex: 1, width: "100%", flexDirection: "column", justifyContent: "flex-start", alignItems: "center"}}>
        <View style={{backgroundColor: "transparent", width: "100%", height: 120, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flexDirection: "column"}}>
          <View style={{flexDirection: "row", marginTop: 15, paddingLeft: 20, alignItems: "center"}}>
            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{flexDirection: "row", alignItems: "center", height: 30}}>
              <MIcons name='arrow-back-ios' style={{fontSize: 20, color: "white", textShadowColor: "black", textShadowOffset: { height: 0.5, width: 0.5 }, textShadowRadius: 1}} />
              <Text style={{fontSize: 15, color: "white", marginLeft: 5, textShadowColor: "black", textShadowOffset: { height: 0.5, width: 0.5 }, textShadowRadius: 1}}>Route Info</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: "100%", height: "100%", backgroundColor: "#2B4273", position: "absolute", zIndex: -2, justifyContent: "center", alignItems: "center", borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
            <Image source={citylayout} style={{width: "100%", height: 140, marginBottom: 0, zIndex: -3, borderBottomLeftRadius: 40, borderBottomRightRadius: 40}} />
          </View>
        </View>
        <View style={{zIndex: 1, backgroundColor: "white", width: "100%", padding: 0, paddingTop: 20, flex: 1}}>
          <View style={{width: "100%", flexDirection: "row", borderBottomColor: "#404040", borderBottomWidth: 0, paddingBottom: 15, paddingLeft: 10, paddingRight: 10}}>
            <View style={{flexDirection: "column", width: "100%", backgroundColor: "transparent"}}>
              <View style={{flexDirection: "row", alignItems: 'center'}}>
                <Text style={{fontSize: 17, color: "#404040", fontWeight: "bold", marginBottom: 10}}>Route Details</Text>
              </View>
              <Text style={{fontSize: 15, color: "#404040", fontWeight: "bold", marginBottom: 0}}>{routeInfo.routeID}</Text>
              <Text style={{fontSize: 15, color: "#404040", fontWeight: "normal", marginBottom: 10}}>{routeInfo.routeName}</Text>
              <Text style={{fontSize: 13, color: "#404040"}} numberOfLines={3}>{routeInfo.stationList.length} stations are in this route</Text>
            </View>
          </View>
          <View style={{width: "100%", flex: 1, flexDirection: "column", borderBottomColor: "#808080", borderBottomWidth: 0, paddingBottom: 0, paddingTop: 5}}>
            <View style={{flexDirection: "column", width: "100%", paddingLeft: 10, paddingRight: 10}}>
              <Text style={{fontSize: 17, color: "#404040", fontWeight: "bold", marginBottom: 10}}>Stations in this route</Text>
            </View>
            <View style={{width: "100%", flex: 1, backgroundColor: "#EBEBEB", flexDirection: "column"}}>
              <ScrollView nestedScrollEnabled={true} style={{width: "100%", paddingTop: 15}} contentContainerStyle={{alignItems: "center", paddingBottom: 20, paddingLeft: 10, paddingRight: 10}}>
                <View style={{backgroundColor: "transparent", width: "100%"}}>
                  <View style={{backgroundColor: "transparent", marginBottom: 10, width: "100%", paddingLeft: 15, paddingRight: 15}}>
                    <View style={{backgroundColor: "transparent", width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
                      {routeInfo.stationList.map((sl, i) => {
                        return(
                          <TouchableOpacity key={i} onPress={() => { navigation.navigate("BusStopInfo", { id: sl.stationID }) }} style={{backgroundColor: "transparent", width: 100, margin: 5, height: 120, borderRadius: 5}}>
                            <View style={{flex: 1, width: "100%", height: "100%", backgroundColor: "#909090", borderRadius: 10, flexDirection: "column", justifyContent: "flex-end", alignItems: "center", paddingBottom: 5}}>
                                <MaterialComIcons name='bus-stop-covered' style={{fontSize: 50, color: "#404040"}} />
                                <View style={{backgroundColor: "transparent", width: "100%", height: 45}}>
                                  <View style={{backgroundColor: "transparent", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{fontSize: 13, fontWeight: "bold", color: "#404040"}}>{sl.stationID}</Text>
                                    <Text style={{fontSize: 12, textAlign: "center", width: "90%", color: "#404040"}} numberOfLines={2}>{sl.stationName}</Text>
                                  </View>
                                </View>
                            </View>
                          </TouchableOpacity>
                          )
                        })}
                      </View>
                    </View>
                  </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
      ) : (
        <Text>Loading Route Info...</Text>
      )}
    </View>
  )
}

export default RouteInfo