import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MapView, { Polygon, Polyline, Marker, Callout, Circle } from 'react-native-maps'
import QCPath from '../../json/QCPath.json'
import { locations } from '../../json/data'
import BusStopIcon from '../../resources/OpenStop.png'
import BusStopIconSelected from '../../resources/OpenStopSelected.png'
import LiveBusIcon from '../../resources/livebus.png'
import Axios from 'axios';
import { URL } from '../../json/urlconfig'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SELECTED_BUS_STOP, SET_SELECTED_LIVE_BUS } from '../../redux/types/types'

const MainMap = () => {

  const google = window.google;

//   const [busStopsList, setbusStopsList] = useState([]);

  const busStopsList = useSelector(state => state.busstopslist);
  const selectedroute = useSelector(state => state.selectedroute)
  const currentlocation = useSelector(state => state.currentlocation)
  const selectedbusstop = useSelector(state => state.selectedbusstop);
  const liveroutelist = useSelector(state => state.liveroutelist)
  const selectedlivebus = useSelector(state => state.selectedlivebus);
  const assignedrouteslist = useSelector(state => state.assignedrouteslist)
  const initialmaptrigger = useSelector(state => state.initialmaptrigger);
  const enablelivemap = useSelector(state => state.enablelivemap);
  const animatetolocationtrigger = useSelector(state => state.animatetolocationtrigger);

  const livebuslist = useSelector(state => state.livebuslist)

  const mapRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    // initEnabledBusStops()
    // console.log("Hello")

    return () => {
        // console.log("World")
    }
  },[initialmaptrigger])

//   const initEnabledBusStops = () => {
//     Axios.get(`${URL}/company/enabledBusStops`).then((response) => {
//         if(response.data.status){
//             setbusStopsList(response.data.result)
//         }
//     }).catch((err) => {
//         console.log(err.message)
//     })
//   }

    function generateRandomColor(){
        let maxVal = 0xFFFFFF; // 16777215
        let randomNumber = Math.random() * maxVal; 
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);   
        return `#${randColor.toUpperCase()}`
    }

    useEffect(() => {
        if(currentlocation.status){
            if(currentlocation.lat != "" && currentlocation.lng != ""){
                mapRef.current.animateToRegion({
                    latitude: parseFloat(currentlocation.lat),
                    longitude: parseFloat(currentlocation.lng),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  });
            }
        }
    },[animatetolocationtrigger])

  return (
    <View style={mainstyles.mainview}>
        <MapView
            ref={mapRef}
            onRegionChange={function(){return;}}
            style={mainstyles.map}
            initialRegion={initialmaptrigger == "none"? {
                latitude: 14.647296,
                longitude: 121.061376,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            } : 
            initialmaptrigger == "route"? 
            selectedroute.routeID != null? {
                ...selectedroute.routePath[0],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421

            } : {
                latitude: 14.647296,
                longitude: 121.061376,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            } : 
            initialmaptrigger == "busstop"? 
            selectedbusstop.busStopID != ""? {
                latitude: selectedbusstop.latitude,
                longitude: selectedbusstop.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421

            } : {
                latitude: 14.647296,
                longitude: 121.061376,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            } : 
            initialmaptrigger == "livebus"?
            selectedlivebus.userID != ""? {
                latitude: parseFloat(selectedlivebus.latitude),
                longitude: parseFloat(selectedlivebus.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421

            } : {
                latitude: 14.647296,
                longitude: 121.061376,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            } : {
                latitude: 14.647296,
                longitude: 121.061376,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
            }
            minZoomLevel={12}
            mapType={
                enablelivemap? "hybrid" : "satellite"
            }
        >
            {busStopsList.length == 0? null : (
                busStopsList.map((stops, i) => {
                    return(
                        <Marker
                            key={i}
                            coordinate={{
                                latitude: parseFloat(stops.coordinates.latitude), 
                                longitude: parseFloat(stops.coordinates.longitude)
                            }}
                            style={{height: 30, width: 30}}
                            onPress={() => { dispatch({ type: SET_SELECTED_BUS_STOP, selectedbusstop: {
                                busStopID: stops.busStopID,
                                longitude: parseFloat(stops.coordinates.longitude),
                                latitude: parseFloat(stops.coordinates.latitude)
                            } }) }}
                            icon={selectedbusstop.busStopID == stops.busStopID? BusStopIconSelected : BusStopIcon}
                        >
                            {/* <Image source={BusStopIcon} style={{height: 25, width: 25, borderColor: selectedbusstop.busStopID == stops.busStopID? "lime" : "#ffbf00", borderWidth: 2, borderRadius: 25}} /> */}
                        </Marker>
                    )
                })
            )}
            {busStopsList.length == 0? null : (
                busStopsList.map((stops, i) => {
                    return(
                        <Circle
                            key={i}
                            center={{
                                latitude: parseFloat(stops.coordinates.latitude), 
                                longitude: parseFloat(stops.coordinates.longitude)
                            }}
                            radius={50}
                            fillColor="transparent"
                            strokeWidth={2}
                            strokeColor={selectedbusstop.busStopID == stops.busStopID? "lime" : "orange"}
                        >
                        </Circle>
                    )
                })
            )}
            {currentlocation.status == false? null : (
                <Marker
                    coordinate={{
                        latitude: parseFloat(currentlocation.lat), 
                        longitude: parseFloat(currentlocation.lng)
                    }}
                    style={{height: 30, width: 30}}
                >
                    <View style={{backgroundColor: "lime", width: 20, height: 20, borderRadius: 20, borderWidth: 2, borderColor: "white"}}>
                    </View>
                </Marker>
            )}
            {selectedroute.routeID != null? (
                <Marker
                    coordinate={selectedroute.routePath[0]}
                    style={{height: 30, width: 30}}
                />
            ) : null}
            {selectedroute.routeID != null? (
                <Marker
                    coordinate={selectedroute.routePath[selectedroute.routePath.length - 1]}
                    style={{height: 30, width: 30}}
                />
            ) : null}
            {selectedroute.routeID != null? (
                <Polyline
                    coordinates={selectedroute.routePath}
                    strokeColor={"lime"}
                    strokeWidth={3}
                />
            ) : null}

            {livebuslist.map((lv, i) => {
                return(
                    <Marker
                        key={i}
                        coordinate={{
                            latitude: parseFloat(lv.latitude), 
                            longitude: parseFloat(lv.longitude)
                        }}
                        style={{height: 30, width: 30}}
                        onPress={() => { dispatch({ type: SET_SELECTED_LIVE_BUS, selectedlivebus: { 
                            userID: lv.userID,
                            companyID: lv.companyID,
                            busID: lv.busID,
                            company: "",
                            plateNumber: lv.plateNumber,
                            route: lv.routeName,
                            routeID: lv.routeID
                         } }) 
                        //  console.log(liveroutelist.filter((lrt, a) => lrt.routeID == assignedrouteslist.filter((art, b) => art.companyID == lv.companyID)[0].routeID)[0].routeName)
                        }}
                        icon={LiveBusIcon}
                        >
                        {/* <Image source={LiveBusIcon} style={{height: 25, width: 25, borderColor: "#ff914d", borderWidth: 2, borderRadius: 25}} /> */}
                    </Marker>
                )
            })}

            {selectedlivebus.companyID != ""? (
                liveroutelist.filter((lrt, a) => lrt.routeID == assignedrouteslist.filter((art, b) => art.companyID == selectedlivebus.companyID)[0].routeID).map((rt, i) => {
                    return(
                        <Polyline
                            key={rt.routeID}
                            coordinates={rt.routePath}
                            strokeColor={"yellow"}
                            strokeWidth={3}
                        />
                    )
                })
            ): null}

            {/* {selectedlivebus.companyID != ""? (
                assignedrouteslist.map((asrt, i) => {
                    if(selectedlivebus.companyID == asrt.companyID){
                        liveroutelist.map((rt, d) => {
                            if(asrt.routeID == rt.routeID){
                                return(
                                    <Polyline
                                        key={rt.routeID}
                                        coordinates={rt.routePath}
                                        strokeColor={"yellow"}
                                        strokeWidth={3}
                                    />
                                )
                            }
                        })
                    }
                })
            ) : null} */}

            <Polygon
                coordinates={locations}
                strokeColor={"#ffbf00"}
                strokeWidth={3}
            />
        </MapView>
    </View>
  )
}

const mainstyles = StyleSheet.create({
    mainview:{
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: "100%",
        height: "100%"
    }
})

export default MainMap