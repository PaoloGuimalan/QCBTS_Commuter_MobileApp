import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Polygon, Polyline, Marker, Callout, Circle } from 'react-native-maps'
import QCPath from '../../json/QCPath.json'
import { locations } from '../../json/data'
import BusStopIcon from '../../resources/OpenStop.png'
import LiveBusIcon from '../../resources/livebus.png'
import Axios from 'axios';
import { URL } from '../../json/urlconfig'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SELECTED_BUS_STOP } from '../../redux/types/types'

const MainMap = () => {

  const google = window.google;

//   const [busStopsList, setbusStopsList] = useState([]);

  const busStopsList = useSelector(state => state.busstopslist);
  const selectedroute = useSelector(state => state.selectedroute)
  const currentlocation = useSelector(state => state.currentlocation)
  const selectedbusstop = useSelector(state => state.selectedbusstop);

  const livebuslist = useSelector(state => state.livebuslist)

  const dispatch = useDispatch()

  useEffect(() => {
    // initEnabledBusStops()
  },[])

//   const initEnabledBusStops = () => {
//     Axios.get(`${URL}/company/enabledBusStops`).then((response) => {
//         if(response.data.status){
//             setbusStopsList(response.data.result)
//         }
//     }).catch((err) => {
//         console.log(err.message)
//     })
//   }

  return (
    <View style={mainstyles.mainview}>
        <MapView
            onRegionChange={function(){return;}}
            style={mainstyles.map}
            initialRegion={selectedroute.routeID != null? {
                ...selectedroute.routePath[0],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421

            } : {
                latitude: 14.647296,
                longitude: 121.061376,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
            minZoomLevel={12}
            mapType={'satellite'}
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
                            onPress={() => { dispatch({ type: SET_SELECTED_BUS_STOP, selectedbusstop: stops.busStopID }) }}
                        >
                            <Image source={BusStopIcon} style={{height: 25, width: 25, borderColor: selectedbusstop == stops.busStopID? "lime" : "#ffbf00", borderWidth: 2, borderRadius: 25}} />
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
                            strokeColor={selectedbusstop == stops.busStopID? "lime" : "orange"}
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
                        onPress={() => {  }}
                        >
                        <Image source={LiveBusIcon} style={{height: 25, width: 25, borderColor: "lime", borderWidth: 2, borderRadius: 25}} />
                    </Marker>
                )
            })}

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