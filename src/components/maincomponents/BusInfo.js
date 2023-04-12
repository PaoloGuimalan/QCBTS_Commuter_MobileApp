import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MIcons from 'react-native-vector-icons/MaterialIcons'
import citylayout from '../../resources/citylayout.png'
import { useSelector } from 'react-redux'
import LiveBusIcon from '../../resources/livebus.png'

const BusInfo = ({route, navigation}) => {

  const livebuslist = useSelector(state => state.livebuslist)

  useEffect(() => {
    initBusData()

    return () => {
      setinitialBusInfoData(initialBusInfoData)
    }
  },[])

  const initialDataState = {
    driverdata: {
      userID: '',
      companyID: '',
      userType: '',
      firstName: '',
      middleName: '',
      lastName: '',
      dlicense: ''
    },
    companydata: {
      companyID: '',
      companyName: '',
      companyAddress: '',
      companyNumber: '',
      email: '',
      dateRegistered: '',
      preview: ''
    },
    busdata: {
      busID: '',
      companyID: '',
      driverID: '',
      busModel: '',
      plateNumber: '',
      capacity: ''
    },
    routesdata: {
      routeID: '',
      routeName: '',
      stationList: [],
      routePath: [],
      dateAdded: '',
      addedBy: '',
      companyID: '',
      privacy: null,
      status: null
    }
  }

  const [initialBusInfoData, setinitialBusInfoData] = useState(initialDataState)
  const [selectedBusStopBar, setselectedBusStopBar] = useState("");
  var busactivestatus = livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID).length == 0? false : true

  const initBusData = async () => {
    await AsyncStorage.getItem("token").then((resp) => {
      if(resp != null){
        Axios.post(`${URL}/commuters/busInfoData`,{
            driverID: route.params.bus.driverID,
            busID: route.params.bus.busID,
            companyID: route.params.bus.companyID,
            routeID: route.params.bus.routeID
        },{
          headers:{
            "x-access-token": resp
          }
        }).then((response) => {
          if(response.data.status){
            // console.log(livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0].fromStation)
            setselectedBusStopBar(`${livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0].fromStation.stationID}_${livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0].fromStation.stationIndex}`)
            setinitialBusInfoData(response.data.result)
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

  useEffect(() => {
    if(livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID).length != 0){
      setselectedBusStopBar(`${livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0].fromStation.stationID}_${livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0].fromStation.stationIndex}`)
    }
  },[livebuslist])

  const computeDistanceStops = (lat1, lon1, lat2, lon2) => {
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

    // console.log(previousStation)

    return d;
  }

  const computeDistance = (lat1, lon1, lat2, lon2, index) => {
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

    const previousStation = index == 0? initialBusInfoData.routesdata.stationList[0] : initialBusInfoData.routesdata.stationList[index - 1]
    const prevStationLat = previousStation.coordinates[1];
    const previousStationLng = previousStation.coordinates[0];
    const distanceOfPrevAndCurStop = computeDistanceStops(lat1, lon1, prevStationLat, previousStationLng);
    const finalPercentage = 100 - (distanceOfPrevAndCurStop / d * 100) < 0? 0 : 100 - (distanceOfPrevAndCurStop / d * 100)

    // console.log(lat2)

    return finalPercentage;
  }

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      {initialBusInfoData.driverdata.userID != '' && initialBusInfoData.companydata.companyID != '' && initialBusInfoData.busdata.busID != '' && initialBusInfoData.routesdata.routeID != ''? (
        <View style={{backgroundColor: "white", flex: 1, width: "100%", flexDirection: "column", justifyContent: "flex-start", alignItems: "center"}}>
          {/* <Text>BusInfo: {initialBusInfoData.driverdata.userID} | {initialBusInfoData.companydata.companyID} | {initialBusInfoData.busdata.busID} | {initialBusInfoData.routesdata.routeID}</Text> */}
          <View style={{backgroundColor: "transparent", width: "100%", height: 120, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flexDirection: "column"}}>
            <View style={{flexDirection: "row", marginTop: 15, paddingLeft: 20, alignItems: "center"}}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} style={{flexDirection: "row", alignItems: "center", height: 30}}>
                <MIcons name='arrow-back-ios' style={{fontSize: 20, color: "white"}} />
                <Text style={{fontSize: 15, color: "white", marginLeft: 5}}>Bus Info</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: "100%", height: "100%", backgroundColor: "#2B4273", position: "absolute", zIndex: -2, justifyContent: "center", alignItems: "center", borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
              <Image source={citylayout} style={{width: "100%", height: 140, maxWidth: 385, marginBottom: -120, zIndex: -3}} />
            </View>
          </View>
          <View style={{zIndex: 1, backgroundColor: "white", width: "100%", padding: 10, paddingTop: 20, flex: 1}}>
            <View style={{width: "100%", flexDirection: "row", borderBottomColor: "#808080", borderBottomWidth: 0, paddingBottom: 15}}>
              <View style={{flexDirection: "column", width: "50%"}}>
                <View style={{flexDirection: "row", alignItems: 'center'}}>
                  <Text style={{fontSize: 17, color: "#404040", fontWeight: "bold", marginBottom: 10}}>Bus Details | </Text>
                  <Text style={{fontSize: 15, color: livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID).length == 0? "#808080" : "green", fontWeight: "normal", marginBottom: 10}}>{livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID).length == 0? "Offline" : "Online"}</Text>
                </View>
                <Text style={{fontSize: 13, color: "#404040"}}>{initialBusInfoData.busdata.busID}</Text>
                <Text style={{fontSize: 13, color: "#404040"}}>{initialBusInfoData.busdata.busModel} | {initialBusInfoData.busdata.capacity}</Text>
                <Text style={{fontSize: 13, color: "#404040"}}>Plate Number: {initialBusInfoData.busdata.plateNumber}</Text>
              </View>
              <View style={{flexDirection: "column", width: "50%"}}>
                <Text style={{fontSize: 17, color: "#404040", fontWeight: "bold", marginBottom: 10, textAlign: "right"}}>Company</Text>
                <Text style={{fontSize: 13, color: "#404040", marginTop: 0, textAlign: "right"}}>{initialBusInfoData.companydata.companyName}</Text>
                <Text style={{fontSize: 13, color: "#404040", marginTop: 0, textAlign: "right"}} numberOfLines={1}>{livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID).length == 0? "No Update" : livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0].fromStation.stationName}</Text>
                <Text style={{fontSize: 13, color: "#404040", marginTop: 0, textAlign: "right"}}>{initialBusInfoData.routesdata.stationList.length} stations in this route</Text>
              </View>
            </View>
            <View style={{width: "100%", flex: 1, flexDirection: "column", borderBottomColor: "#808080", borderBottomWidth: 0, paddingBottom: 15, paddingTop: 5}}>
              <View style={{flexDirection: "column", width: "100%"}}>
                <Text style={{fontSize: 17, color: "#404040", fontWeight: "bold", marginBottom: 10}}>Stations | {initialBusInfoData.routesdata.routeName}</Text>
              </View>
              <View style={{width: "100%", flex: 1, backgroundColor: "transparent", flexDirection: "column"}}>
                <ScrollView nestedScrollEnabled={true} style={{width: "100%", paddingTop: 15}} contentContainerStyle={{alignItems: "center"}}>
                  {initialBusInfoData.routesdata.stationList.map((st, i) => {
                    return(
                      <TouchableOpacity key={`${st.stationID}_${i}`} onPress={() => { /**setselectedBusStopBar(`${st.stationID}_${i}`)*/ }} style={{width: "100%", backgroundColor: "transparent", marginBottom: 4, maxWidth: 300}}>
                        <View style={{width: "100%", minHeight: 150, flexDirection: "row"}}>
                          <View style={{width: 25, height: 150, backgroundColor: "blue"}}>
                            {livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID).length != 0? (
                              livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0].fromStation.stationIndex > i? (
                                <View style={{width: "100%", height: "100%", backgroundColor: "orange", alignItems: "center", justifyContent: "flex-end", borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
                                  
                                </View>
                              ) : (
                                <View style={{width: "100%", height: busactivestatus? selectedBusStopBar == `${st.stationID}_${i}`? `${computeDistance(st.coordinates[1], st.coordinates[0], livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0].latitude, livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0].longitude, i)}%` : "0%" : "0%", backgroundColor: "orange", alignItems: "center", justifyContent: "flex-end", borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                                  {busactivestatus? (
                                    selectedBusStopBar == `${st.stationID}_${i}`? (
                                      <Image source={LiveBusIcon} style={{width: 30, height: 30, marginTop: 0}} />
                                    ) : null
                                  ) : null}
                                </View>
                              )
                            ) : null}
                          </View>
                          <View style={{flex: 1, backgroundColor: "transparent", alignItems: 'center'}}>
                            <View style={{width: 240, height: 70, backgroundColor: "orange", borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 10}}>
                              <Text style={{fontSize: 15, fontWeight: "bold"}}>{st.stationName}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      ):(
        <Text>Loading Bus Info...</Text>
      )}
    </View>
  )
}

export default BusInfo