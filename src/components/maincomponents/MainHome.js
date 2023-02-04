import { View, Text, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Home'
import Profile from './Profile'
import FeedInfo from './FeedInfo'
import RouteInfo from './RouteInfo'
import { useDispatch, useSelector } from 'react-redux'
import Geolocation from '@react-native-community/geolocation'
import { SET_CURRENT_LOCATION } from '../../redux/types/types'
import BusStopInfo from './BusStopInfo'

const BodyStack = createNativeStackNavigator()

const MainHome = ({navigation}) => {

  const enablelocation = useSelector(state => state.enablelocation)

  const dispatch = useDispatch()

  useEffect(() => {
    scanGeolocation()
  },[enablelocation])

  const geoInterval = useRef();

  const scanGeolocation = async () => {

    if(enablelocation){
        try{
          const permitlocation = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Enable Location",
              'message': "Click Allow / Yes to enable."
            }
          )

          // console.log(permitlocation)
          if(permitlocation == "granted"){
            // console.log(permitlocation)
            //change to getCurrentPosition w/ setInterval
            geoInterval.current = setInterval(() => {
              Geolocation.getCurrentPosition((position) => {
                // console.log(position)
                dispatch({ type: SET_CURRENT_LOCATION, currentlocation: {
                  status: true,
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                } })
              },(error) => {
                console.log(error)
              },
              {enableHighAccuracy: false, timeout: 10000, maximumAge: 3000})
            },1000)
          }
          else{
            alert("Location Denied!");
          }
        }
        catch(err){
          alert(err);
        }
      
      // Geolocation.watchPosition((position) => {
      //   console.log(position)
      // },(error) => {
      //   console.log(error)
      // })
    }
    else{
      clearInterval(geoInterval.current)
      geoInterval.current = null;
      dispatch({ type: SET_CURRENT_LOCATION, currentlocation: {
        status: false,
        lat: "",
        lng: ""
      } })
    }
  }

  return (
    <BodyStack.Navigator>
        <BodyStack.Screen name='HomeFeed' component={Home} options={{headerShown: false, animation: "slide_from_right"}} />
        <BodyStack.Screen name='Profile' component={Profile} options={{headerShown: false, animation: "slide_from_bottom"}} />
        <BodyStack.Screen name='FeedInfo' component={FeedInfo} options={{headerShown: false, animation: "slide_from_right"}} />
        <BodyStack.Screen name='RouteInfo' component={RouteInfo} options={{headerShown: false, animation: "slide_from_right"}} />
        <BodyStack.Screen name='BusStopInfo' component={BusStopInfo} options={{headerShown: false, animation: "slide_from_right"}} />
    </BodyStack.Navigator>
  )
}

export default MainHome