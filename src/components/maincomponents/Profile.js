import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { SET_AUTH_DETAILS } from '../../redux/types/types'
import { authdetailsstate } from '../../redux/action/action'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = () => {
 
  const dispatch = useDispatch()

  const logoutProcess = () => {
    AsyncStorage.removeItem("token")
    dispatch({ type: SET_AUTH_DETAILS, authdetails: {
        auth: false,
        userID: null,
        username: ""
    }})
  }

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <TouchableOpacity onPress={() => { logoutProcess() }} style={{backgroundColor: "red", width: 100, height: 30, justifyContent: "center", alignItems: "center", borderRadius: 5}}>
        <Text style={{color: "white"}}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile