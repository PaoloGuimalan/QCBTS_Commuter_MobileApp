import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { SET_AUTH_DETAILS } from '../../redux/types/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PersonalInfo = ({navigation}) => {

  const profiledetails = useSelector(state => state.profiledetails)

  const dispatch = useDispatch()
  
  const convertAsterisk = (count) => {
    var counter = "";

    for(var i = 0; i < count; i++){
      counter += "*";
    }

    return counter
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
    <View style={{backgroundColor: "transparent", alignItems: "center", flexDirection: "column", paddingLeft: 20, paddingRight: 20, maxWidth: 500, width: "100%", alignSelf: "center"}}>
      <View style={{backgroundColor: "transparent", width: "100%", borderWidth: 1, borderColor: "#939393", borderRadius: 10, justifyContent: "center"}}>
        <TouchableOpacity style={{width: "100%", borderBottomColor: "#C1C1C1", borderBottomWidth: 1}}>
            <View style={{backgroundColor: "transparent", width: "100%", paddingLeft: 20, paddingRight: 20, height: 70, alignItems: "center", flexDirection: "row"}}>
                <View style={{flex: 1}}>
                    <Text style={{color: "#000000B2", fontSize: 12}}>UserID</Text>
                    <Text style={{color: '#000000', fontSize: 15}}>{profiledetails.userID}</Text>
                </View>
                {/* <MIcons name='arrow-forward-ios' style={{fontSize: 20, color: "black"}} /> */}
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("EditProfile", { editType: "Name" }) }} style={{width: "100%", borderBottomColor: "#C1C1C1", borderBottomWidth: 1}}>
            <View style={{backgroundColor: "transparent", width: "100%", paddingLeft: 20, paddingRight: 20, height: 70, alignItems: "center", flexDirection: "row"}}>
                <View style={{flex: 1}}>
                    <Text style={{color: "#000000B2", fontSize: 12}}>Name</Text>
                    <Text style={{color: '#000000', fontSize: 15}}>{profiledetails.name}</Text>
                </View>
                <MIcons name='arrow-forward-ios' style={{fontSize: 20, color: "black"}} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("EditProfile", { editType: "Email" }) }} style={{width: "100%", borderBottomColor: "#C1C1C1", borderBottomWidth: 1}}>
            <View style={{backgroundColor: "transparent", width: "100%", paddingLeft: 20, paddingRight: 20, height: 70, alignItems: "center", flexDirection: "row"}}>
                <View style={{flex: 1}}>
                    <Text style={{color: "#000000B2", fontSize: 12}}>Email</Text>
                    <Text style={{color: '#000000', fontSize: 15}}>{profiledetails.email}</Text>
                </View>
                <MIcons name='arrow-forward-ios' style={{fontSize: 20, color: "black"}} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("EditProfile", { editType: "Contact Number" }) }} style={{width: "100%", borderBottomColor: "#C1C1C1", borderBottomWidth: 1}}>
            <View style={{backgroundColor: "transparent", width: "100%", paddingLeft: 20, paddingRight: 20, height: 70, alignItems: "center", flexDirection: "row"}}>
                <View style={{flex: 1}}>
                    <Text style={{color: "#000000B2", fontSize: 12}}>Contact Number</Text>
                    <Text style={{color: '#000000', fontSize: 15}}>{profiledetails.contactnumber}</Text>
                </View>
                <MIcons name='arrow-forward-ios' style={{fontSize: 20, color: "black"}} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("EditProfile", { editType: "Password" }) }} style={{width: "100%", borderBottomColor: "#C1C1C1", borderBottomWidth: 0}}>
            <View style={{backgroundColor: "transparent", width: "100%", paddingLeft: 20, paddingRight: 20, height: 70, alignItems: "center", flexDirection: "row"}}>
                <View style={{flex: 1}}>
                    <Text style={{color: "#000000B2", fontSize: 12}}>Password</Text>
                    <Text style={{color: '#000000', fontSize: 15}}>{convertAsterisk(profiledetails.password.split("").length)}</Text>
                </View>
                <MIcons name='arrow-forward-ios' style={{fontSize: 20, color: "black"}} />
            </View>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: "transparent", marginTop: 30, width: "100%", alignItems: "center"}}>
        <TouchableOpacity onPress={() => { logoutProcess() }} style={{backgroundColor: "red", width: 100, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 15, color: "white"}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PersonalInfo