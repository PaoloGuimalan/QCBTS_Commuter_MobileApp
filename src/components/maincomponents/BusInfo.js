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

  const [toggleInfoMapWindow, settoggleInfoMapWindow] = useState(false)
  const [selectedTripDay, setselectedTripDay] = useState("Monday")
  const [driverTimeSchedule, setdriverTimeSchedule] = useState([])

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
            // console.log(livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0]?.fromStation)
            setselectedBusStopBar(`${livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0]?.fromStation.stationID}_${livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0]?.fromStation.stationIndex}`)
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
      setselectedBusStopBar(`${livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0]?.fromStation.stationID}_${livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0]?.fromStation.stationIndex}`)
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

  useEffect(() => {
    initBusTripSchedule()
  },[initialBusInfoData])

  const initBusTripSchedule = async () => {
    if(initialBusInfoData.companydata.companyID != '' && initialBusInfoData.routesdata.routeID != ''){
      await AsyncStorage.getItem("token").then((resp) => {
        if(resp != null){
          Axios.get(`${URL}/commuters/getDriverTimeSchedule/${initialBusInfoData.companydata.companyID}/${initialBusInfoData.routesdata.routeID}`, {
            headers:{
              "x-access-token": resp
            }
          }).then((response) => {
            if(response.data.status){
              // console.log(response.data.result)
              setdriverTimeSchedule(response.data.result)
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    }
  }

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      {initialBusInfoData.driverdata.userID != '' && initialBusInfoData.companydata.companyID != '' && initialBusInfoData.busdata.busID != '' && initialBusInfoData.routesdata.routeID != ''? (
        <View style={{backgroundColor: "white", flex: 1, width: "100%", flexDirection: "column", justifyContent: "flex-start", alignItems: "center"}}>
          {/* <Text>BusInfo: {initialBusInfoData.driverdata.userID} | {initialBusInfoData.companydata.companyID} | {initialBusInfoData.busdata.busID} | {initialBusInfoData.routesdata.routeID}</Text> */}
          <View style={{backgroundColor: "transparent", width: "100%", height: 120, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flexDirection: "column"}}>
            <View style={{flexDirection: "row", marginTop: 15, paddingLeft: 20, alignItems: "center"}}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} style={{flexDirection: "row", alignItems: "center", height: 30}}>
                <MIcons name='arrow-back-ios' style={{fontSize: 20, color: "white", textShadowColor: "black", textShadowOffset: { height: 0.5, width: 0.5 }, textShadowRadius: 1}} />
                <Text style={{fontSize: 15, color: "white", marginLeft: 5, textShadowColor: "black", textShadowOffset: { height: 0.5, width: 0.5 }, textShadowRadius: 1}}>Bus Info</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: "100%", height: "100%", backgroundColor: "#2B4273", position: "absolute", zIndex: -2, justifyContent: "center", alignItems: "center", borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
              <Image source={citylayout} style={{width: "100%", height: 140, marginBottom: 0, zIndex: -3, borderBottomLeftRadius: 40, borderBottomRightRadius: 40}} />
            </View>
          </View>
          <View style={{zIndex: 1, backgroundColor: "white", width: "100%", padding: 0, paddingTop: 20, flex: 1}}>
            <View style={{width: "100%", flexDirection: "row", borderBottomColor: "#808080", borderBottomWidth: 0, paddingBottom: 15, paddingLeft: 10, paddingRight: 10}}>
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
                <Text style={{fontSize: 13, color: "#404040", marginTop: 0, textAlign: "right"}} numberOfLines={1}>{livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID).length == 0? "No Update" : livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0]?.fromStation.stationName}</Text>
                <Text style={{fontSize: 13, color: "#404040", marginTop: 0, textAlign: "right"}}>{initialBusInfoData.routesdata.stationList.length} stations in this route</Text>
              </View>
            </View>
            <View style={{width: "100%", flex: 1, flexDirection: "column", borderBottomColor: "#808080", borderBottomWidth: 0, paddingBottom: 0, paddingTop: 5}}>
              <View style={{flexDirection: "column", width: "100%", paddingLeft: 10, paddingRight: 10}}>
                <Text style={{fontSize: 17, color: "#404040", fontWeight: "bold", marginBottom: 10}}>Stations | {initialBusInfoData.routesdata.routeName}</Text>
              </View>
              <View style={{width: "100%", flex: 1, backgroundColor: "#EBEBEB", flexDirection: "column"}}>
                <ScrollView nestedScrollEnabled={true} style={{width: "100%", paddingTop: 15}} contentContainerStyle={{alignItems: "center", paddingBottom: 20}}>
                  {initialBusInfoData.routesdata.stationList.map((st, i) => {
                    return(
                      <TouchableOpacity key={`${st.stationID}_${i}`} onPress={() => { /**setselectedBusStopBar(`${st.stationID}_${i}`)*/ }} style={{width: "100%", backgroundColor: "transparent", marginBottom: 4, maxWidth: 300}}>
                        <View style={{width: "100%", minHeight: 150, flexDirection: "row"}}>
                          <View style={{width: 20, height: 150, backgroundColor: "#B7B7B7", borderRadius: 5}}>
                            {livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID).length != 0? (
                              livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0]?.fromStation.stationIndex > i? (
                                <View style={{width: "100%", height: "100%", borderRadius: 5, backgroundColor: "orange", alignItems: "center", justifyContent: "flex-end"}}>
                                  
                                </View>
                              ) : (
                                <View style={{width: "100%", borderRadius: 5, height: busactivestatus? selectedBusStopBar == `${st.stationID}_${i}`? `${computeDistance(st.coordinates[1], st.coordinates[0], livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0].latitude, livebuslist.filter((lv, i) => lv.userID == route.params.bus.driverID)[0].longitude, i)}%` : "0%" : "0%", backgroundColor: "orange", alignItems: "center", justifyContent: "flex-end"}}>
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
                            <View style={{width: 240, height: 70, backgroundColor: selectedBusStopBar == `${st.stationID}_${i}`?"orange":"#404040", borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 10}}>
                              <Text style={{fontSize: 15, fontWeight: "bold", color: "white"}}>{st.stationName}</Text>
                              <Text style={{fontSize: 13, fontWeight: "normal", color: "white"}}>{st.stationID}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
              <TouchableOpacity onPress={() => { settoggleInfoMapWindow(true) }} style={{backgroundColor: "white", position: "absolute", bottom: 20, right: 5, width: 50, height: 50, borderRadius: 50, justifyContent: "center", alignItems: "center", elevation: 5}}>
                <MCI name='bus-clock' style={{color: "#404040", fontSize: 20, marginLeft: 4}} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: "white", width: "100%", height: "100%", maxHeight: 400, position: "absolute", bottom: toggleInfoMapWindow? 0 : "-100%", zIndex: 2, elevation: 5, shadowOffset: {width: 0, height: -20}, borderTopLeftRadius: 30, borderTopRightRadius: 30, display: "flex", flexDirection: "column", alignItems: "center", borderWidth: 1, borderColor: "#ededed"}}>
            <View style={{backgroundColor: "transparent", width: "100%", height: 50, display: "flex", alignItems: "center", justifyContent: "center"}}>
              <TouchableOpacity onPress={() => { settoggleInfoMapWindow(false) }} style={{width: "90%", maxWidth: 150, backgroundColor: "#AAAAAA", height: 10, borderRadius: 10}}></TouchableOpacity>
            </View>
            <View style={{backgroundColor: "transparent", width: "100%", justifyContent: "center", alignItems: "center", paddingBottom: 20}}>
              <Text style={{color: "#313131", fontSize: 15, fontWeight: "bold"}}>Time Schedule & Interval</Text>
            </View>
            <View style={{backgroundColor: "transparent", width: "95%", justifyContent: "center", alignItems: "center", paddingBottom: 10, display: "flex", flexDirection: "row"}}>
              <TouchableOpacity onPress={() => { 
                setselectedTripDay("Monday")
               }} style={{width: "14.3%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Text style={{color: "#313131", marginBottom: 7, fontSize: 15}}>Mon</Text>
                <View style={{width: "100%", height: 10, backgroundColor: selectedTripDay == "Monday"? "#2B4273" : "#D9D9D9", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { 
                setselectedTripDay("Tuesday")
               }} style={{width: "14.3%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Text style={{color: "#313131", marginBottom: 7, fontSize: 15}}>Tue</Text>
                <View style={{width: "100%", height: 10, backgroundColor: selectedTripDay == "Tuesday"? "#2B4273" : "#D9D9D9", borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { 
                setselectedTripDay("Wednesday")
               }} style={{width: "14.3%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Text style={{color: "#313131", marginBottom: 7, fontSize: 15}}>Wed</Text>
                <View style={{width: "100%", height: 10, backgroundColor: selectedTripDay == "Wednesday"? "#2B4273" : "#D9D9D9", borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { 
                setselectedTripDay("Thursday")
               }} style={{width: "14.3%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Text style={{color: "#313131", marginBottom: 7, fontSize: 15}}>Thu</Text>
                <View style={{width: "100%", height: 10, backgroundColor: selectedTripDay == "Thursday"? "#2B4273" : "#D9D9D9", borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { 
                setselectedTripDay("Friday")
               }} style={{width: "14.3%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Text style={{color: "#313131", marginBottom: 7, fontSize: 15}}>Fri</Text>
                <View style={{width: "100%", height: 10, backgroundColor: selectedTripDay == "Friday"? "#2B4273" : "#D9D9D9", borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { 
                setselectedTripDay("Saturday")
               }} style={{width: "14.3%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Text style={{color: "#313131", marginBottom: 7, fontSize: 15}}>Sat</Text>
                <View style={{width: "100%", height: 10, backgroundColor: selectedTripDay == "Saturday"? "#2B4273" : "#D9D9D9", borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { 
                setselectedTripDay("Sunday")
               }} style={{width: "14.3%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Text style={{color: "#313131", marginBottom: 7, fontSize: 15}}>Sun</Text>
                <View style={{width: "100%", height: 10, backgroundColor: selectedTripDay == "Sunday"? "#2B4273" : "#D9D9D9", borderTopRightRadius: 10, borderBottomRightRadius: 10}}></View>
              </TouchableOpacity>
            </View>
            <ScrollView style={{backgroundColor: "transparent", flex: 1, width: "100%", paddingLeft: 12, paddingRight: 12}} fadingEdgeLength={5}>
              {driverTimeSchedule.filter((dts, i) => dts.tripDay == selectedTripDay).map((sdts, i) => {
                        if(i == 0){
                            return(
                                <View key={i} style={{backgroundColor: "transparent", width: "100%", paddingTop: 5, display: "flex", flexDirection: "column"}}>
                                  <Text style={{textAlign: "left", fontWeight: "normal", marginBottom: 15, color: "#313131", fontSize: 15}}>{sdts.tripDestination}</Text>
                                  {driverTimeSchedule.filter((dts, j) => dts.tripDay == selectedTripDay && dts.tripDestination == sdts.tripDestination).map((sdts2, j) => {
                                    return(
                                      <View key={j} style={{backgroundColor: "transparent", width: "100%", marginBottom: 2, display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <View style={{backgroundColor: "transparent", width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                                          <View style={{backgroundColor: "#C8C8C8", width: "100%", height: 45, maxWidth: 300, borderRadius: 15, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                            <View style={{backgroundColor: "#2B4273", height: "100%", width: "50%", maxWidth: 50, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 15, borderTopLeftRadius: 15}}>
                                              <Text style={{fontSize: 13, color: "white"}}>A</Text>
                                            </View>
                                            <View style={{backgroundColor: "#FFC700", height: "100%", width: "50%", maxWidth: 50, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderBottomRightRadius: 15, borderTopRightRadius: 15}}>
                                              <Text style={{fontSize: 13, color: "white"}}>B</Text>
                                            </View>
                                          </View>
                                          <View style={{display: "flex", flexDirection: "row", width: "100%", maxWidth: 280, justifyContent: "center", paddingTop: 10}}>
                                            <Text style={{fontSize: 13, color: "#313131"}}>{sdts2.tripTime.split("-")[0]}</Text>
                                            <View style={{flex: 1, borderTopColor: "#4A4A4A", borderTopWidth: 1, borderStyle: "dashed", marginTop: 10}} />
                                            <Text style={{fontSize: 13, color: "#313131"}}>{sdts2.tripTime.split("-")[1]}</Text>
                                          </View>
                                          <View style={{display: "flex", flexDirection: "row", width: "100%", maxWidth: 280, justifyContent: "center", marginBottom: 10}}>
                                            <Text style={{fontSize: 13, color: "#313131"}}>{sdts2.tripInterval} interval</Text>
                                          </View>
                                        </View>
                                      </View>
                                    )
                                  })}
                                </View>
                            )
                        }
                        else{
                            if(driverTimeSchedule.filter((dts, i) => dts.tripDay == selectedTripDay)[i - 1].tripDestination != sdts.tripDestination){
                                return(
                                  <View key={i} style={{backgroundColor: "transparent", width: "100%", paddingTop: 5, display: "flex", flexDirection: "column"}}>
                                    <Text style={{textAlign: "left", fontWeight: "normal", marginBottom: 15, color: "#313131", fontSize: 15}}>{sdts.tripDestination}</Text>
                                    {driverTimeSchedule.filter((dts, j) => dts.tripDay == selectedTripDay && dts.tripDestination == sdts.tripDestination).map((sdts2, j) => {
                                      return(
                                        <View key={j} style={{backgroundColor: "transparent", width: "100%", marginBottom: 2, display: "flex", flexDirection: "column", alignItems: "center"}}>
                                          <View style={{backgroundColor: "transparent", width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                                            <View style={{backgroundColor: "#C8C8C8", width: "100%", height: 45, maxWidth: 300, borderRadius: 15, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                              <View style={{backgroundColor: "#2B4273", height: "100%", width: "50%", maxWidth: 50, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 15, borderTopLeftRadius: 15}}>
                                                <Text style={{fontSize: 13, color: "white"}}>A</Text>
                                              </View>
                                              <View style={{backgroundColor: "#FFC700", height: "100%", width: "50%", maxWidth: 50, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderBottomRightRadius: 15, borderTopRightRadius: 15}}>
                                                <Text style={{fontSize: 13, color: "white"}}>B</Text>
                                              </View>
                                            </View>
                                            <View style={{display: "flex", flexDirection: "row", width: "100%", maxWidth: 280, justifyContent: "center", paddingTop: 10}}>
                                              <Text style={{fontSize: 13, color: "#313131"}}>{sdts2.tripTime.split("-")[0]}</Text>
                                              <View style={{flex: 1, borderTopColor: "#4A4A4A", borderTopWidth: 1, borderStyle: "dashed", marginTop: 10}} />
                                              <Text style={{fontSize: 13, color: "#313131"}}Text>{sdts2.tripTime.split("-")[1]}</Text>
                                            </View>
                                            <View style={{display: "flex", flexDirection: "row", width: "100%", maxWidth: 280, justifyContent: "center", marginBottom: 10}}>
                                              <Text style={{fontSize: 13, color: "#313131"}}>{sdts2.tripInterval} interval</Text>
                                            </View>
                                          </View>
                                        </View>
                                      )
                                    })}
                                  </View>
                                )
                            }
                        }
                    })}
            </ScrollView>
          </View>
        </View>
      ):(
        <Text>Loading Bus Info...</Text>
      )}
    </View>
  )
}

export default BusInfo