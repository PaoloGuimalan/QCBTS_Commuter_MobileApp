import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_AUTH_DETAILS, SET_PROFILE_DETAILS } from '../../redux/types/types'
import { authdetailsstate } from '../../redux/action/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PersonalInfo from '../partialcomponents/PersonalInfo'
import AdvanceInfo from '../partialcomponents/AdvanceInfo'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'

const ProfileStack = createNativeStackNavigator()

const Profile = ({navigation}) => {
 
  const authdetails = useSelector(state => state.authdetails)
  const profiledetails = useSelector(state => state.profiledetails)

  const [profilecurrentscreen, setprofilecurrentscreen] = useState("Personal")

  const dispatch = useDispatch()

  useEffect(() => {
    profileInfoRequest()
  },[])

  const profileInfoRequest = async () => {
    await AsyncStorage.getItem("token").then((resp) => {
      if(resp != null){
        Axios.get(`${URL}/commuters/userinfo`, {
          headers: {
            "x-access-token": resp
          }
        }).then((response) => {
          if(response.data.status){
            // console.log(response.data.result)
            dispatch({ type: SET_PROFILE_DETAILS, profiledetails: response.data.result })
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    })
  }

  const logoutProcess = () => {
    AsyncStorage.removeItem("token")
    dispatch({ type: SET_AUTH_DETAILS, authdetails: {
        auth: false,
        userID: null,
        username: ""
    }})
  }

  return (
    <View style={{flex: 1, justifyContent: "flex-start", alignItems: "center", flexDirection: "column"}}>
      <ScrollView style={{width: "100%"}} contentContainerStyle={{flexGrow: 1}}>
        <View style={{backgroundColor: "transparent", width: "100%", height: 50, paddingLeft: 15, paddingRight: 15, justifyContent: "flex-end"}}>
          <TouchableOpacity onPress={() => { navigation.navigate("HomeFeed") }} style={{flexDirection: "row", alignItems: "center", height: 30}}>
            <MCIcons name='window-close' style={{fontSize: 20, color: "black"}} />
            <Text style={{fontSize: 15, color: "black", marginLeft: 5}}>Account</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: "transparent", width: "100%", height: 220, flexDirection: "column"}}>
          <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center", paddingBottom: 10}}>
            <View style={{backgroundColor: "#D9D9D9", width: 100, height: 100, borderRadius: 100, justifyContent: "center", alignItems: "center", borderColor: "#808080", borderWidth: 1}}>
              <Text style={{fontSize: 20, fontWeight: "bold", color: "black"}}>{profiledetails.name == ""? "" : profiledetails.name.split(" ")[0].split("")[0]}{profiledetails.name.split(" ").length == 2? profiledetails.name == ""? "" : profiledetails.name.split(" ")[1].split("")[0] : ""}</Text>
            </View>
          </View>
          <View style={{width: "100%", backgroundColor: "transparent", height: 70, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 17, fontWeight: "bold", color: "black"}}>{profiledetails.username}</Text>
            <Text style={{fontSize: 13, color: "#000000B2"}}>Commuter</Text>
          </View>
        </View>
        <View style={{backgroundColor: "transparent", flexDirection: "column"}}>
          <View style={{width: "100%", paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 10, flexDirection: "row"}}>
            <TouchableOpacity onPress={() => { setprofilecurrentscreen("Personal"); navigation.navigate("PersonalInfo") }} style={{backgroundColor: "transparent", marginRight: 10, height: 22, borderBottomColor: "#294172", borderBottomWidth: profilecurrentscreen == "Personal"? 2 : 0}}>
              <Text style={{color: profilecurrentscreen == "Personal"? "#294172" : "#303030", fontSize: 15}}>Personal Info</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setprofilecurrentscreen("Advance"); navigation.navigate("AdvanceInfo") }} style={{backgroundColor: "transparent", marginLeft: 10, height: 22, borderBottomColor: "#294172", borderBottomWidth: profilecurrentscreen == "Advance"? 2 : 0}}>
              <Text style={{color: profilecurrentscreen == "Advance"? "#294172" : "#303030", fontSize: 15}}>Advance Info</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{backgroundColor: "transparent", paddingTop: 10, paddingBottom: 10, width: "100%", height: 500}}>
          <ProfileStack.Navigator initialRouteName='PersonalInfo'>
            <ProfileStack.Screen name="PersonalInfo" component={PersonalInfo} options={{headerShown: false, animation: "slide_from_right"}} />
            <ProfileStack.Screen name="AdvanceInfo" component={AdvanceInfo} options={{headerShown: false, animation: "slide_from_right"}} />
          </ProfileStack.Navigator>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile