import { View, Text, Platform, PermissionsAndroid, ToastAndroid } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Home'
import Profile from './Profile'
import FeedInfo from './FeedInfo'
import RouteInfo from './RouteInfo'
import { useDispatch, useSelector } from 'react-redux'
import Geolocation from '@react-native-community/geolocation'
import { SET_CURRENT_LOCATION, SET_WAITING_BUS_STOP } from '../../redux/types/types'
import BusStopInfo from './BusStopInfo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { URL } from '../../json/urlconfig'
import Axios from 'axios'
import { waitingbusstopstate } from '../../redux/action/action'

const BodyStack = createNativeStackNavigator()

const MainHome = ({navigation}) => {

  const enablelocation = useSelector(state => state.enablelocation)

  const dispatch = useDispatch()

  let cancelAxios;

  useEffect(() => {
    subscribeWaitingStatus()
  },[])

  const subscribeWaitingStatus = async () => {
    await AsyncStorage.getItem("token").then((resp) => {
      if(resp != null){
        if(typeof cancelAxios != typeof undefined){
          cancelAxios.cancel()
        }
        else{
          cancelAxios = Axios.CancelToken.source()
          Axios.get(`${URL}/commuters/pollWaitingStatus`,{
            headers:{
              "x-access-token": resp
            },
            cancelToken: cancelAxios.token
          }).then((response) => {
            //nothing to do
            if(response.data.status){
              //run init commands
              cancelAxios = undefined
              subscribeWaitingStatus()
            }
            else{
              //also run init commands
              // cancelAxios()
              // subscribeMessages()
              subscribeWaitingStatus()
            }
          }).catch((err) => {
            console.log(err);
            if(err.message != 'canceled'){
              //run init commands
              cancelAxios = undefined
              subscribeWaitingStatus()
            }
          })
        }
      }
    })
  }

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
              {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000})
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
      markasIdle()
    }
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