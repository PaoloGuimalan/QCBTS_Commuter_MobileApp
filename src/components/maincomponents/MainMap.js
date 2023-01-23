import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Polygon, Polyline, Marker } from 'react-native-maps'
import QCPath from '../../json/QCPath.json'
import { locations } from '../../json/data'
import BusStopIcon from '../../resources/OpenStop.png'
import Axios from 'axios';
import { URL } from '../../json/urlconfig'

const MainMap = () => {

  const google = window.google;

  const [busStopsList, setbusStopsList] = useState([]);

  useEffect(() => {
    initEnabledBusStops()
  },[])

  const initEnabledBusStops = () => {
    Axios.get(`${URL}/company/enabledBusStops`).then((response) => {
        if(response.data.status){
            setbusStopsList(response.data.result)
        }
    }).catch((err) => {
        console.log(err.message)
    })
  }

  return (
    <View style={mainstyles.mainview}>
        <MapView
            onRegionChange={function(){return;}}
            style={mainstyles.map}
            initialRegion={{
                latitude: 14.647296,
                longitude: 121.061376,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
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
                        >
                            <Image source={BusStopIcon} style={{height: 25, width: 25, borderColor: "#ffbf00", borderWidth: 2, borderRadius: 25}} />
                        </Marker>
                    )
                })
            )}
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