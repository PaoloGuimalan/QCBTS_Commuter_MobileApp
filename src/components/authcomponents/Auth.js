import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
import Home from '../maincomponents/Home'
import Login from './Login'
import Loading from './Loading'
import { SET_AUTH_DETAILS } from '../../redux/types/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'

const AuthStack = createNativeStackNavigator()

const Auth = () => {

  const authdetails = useSelector(state => state.authdetails)
  const dispatch = useDispatch()

  useEffect(() => {
    authConnection()
  },[])

  const authConnection = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
      if(resp == null){
        dispatch({ type: SET_AUTH_DETAILS, authdetails: {
            auth: false,
            userID: null,
            username: ""
        }})
      }
      else{
        Axios.get(`${URL}/auth/commuter/jwtchecker`, {
          headers:{
            "x-access-token": resp
          }
        }).then((response) => {
          if(response.data.status){
            dispatch({ type: SET_AUTH_DETAILS, authdetails: {
              auth: true,
              userID: response.data.result.userID,
              username: response.data.result.username
         }   })
          }
          else{
            dispatch({ type: SET_AUTH_DETAILS, authdetails: {
                auth: false,
                userID: null,
                username: ""
         }   })
          }
        }).catch((err) => {
          dispatch({ type: SET_AUTH_DETAILS, authdetails: {
              auth: false,
              userID: null,
              username: ""
        }  })
          console.log(err.message)
        })
      }
    })
  }

  return (
    <AuthStack.Navigator>
        <AuthStack.Screen name='Home' component={authdetails.auth != null? authdetails.auth? Home : Login : Loading} options={{headerShown: false}} />
    </AuthStack.Navigator>
  )
}

export default Auth