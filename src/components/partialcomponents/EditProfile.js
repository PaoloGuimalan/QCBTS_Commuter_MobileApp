import { View, Text, TextInput, TouchableOpacity, Platform, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { URL } from '../../json/urlconfig'
import { SET_PROFILE_DETAILS } from '../../redux/types/types'

const EditProfile = ({navigation, route}) => {

  const profiledetails = useSelector(state => state.profiledetails)

  const dispatch = useDispatch()

  useEffect(() => {
    setnamedefault(profiledetails.name)
    setemaildefault(profiledetails.email)
    setcontactnumber(profiledetails.contactnumber)

    return () => {
        setpasswordvalidation("")
        setoldpassword("")
        setnewpassword("")
        setconfnewpassword("")
    }
  },[])

  const [namedefault, setnamedefault] = useState("");
  const [emaildefault, setemaildefault] = useState("");
  const [contactnumber, setcontactnumber] = useState("");

  const [oldpassword, setoldpassword] = useState("")
  const [newpassword, setnewpassword] = useState("");
  const [confnewpassword, setconfnewpassword] = useState("")

  const [passwordvalidation, setpasswordvalidation] = useState("");

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

  const updateName = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
      if(resp != null){
        Axios.post(`${URL}/commuters/editcommutername`, {
          name: namedefault
        },{
          headers:{
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
              profileInfoRequest()
              setTimeout(() => {
                navigation.navigate("PersonalInfo")
              }, 1000)
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
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const updateEmail = async () => {
    if(passwordvalidation.split(" ") == ""){
      if(Platform.OS == "android"){
        ToastAndroid.show("Please input password", ToastAndroid.SHORT)
      }
      else{
        alert("Please input password")
      }
    }
    else{
      await AsyncStorage.getItem('token').then((resp) => {
        if(resp != null){
          Axios.post(`${URL}/commuters/editcommuteremail`, {
            email: emaildefault,
            password: passwordvalidation
          },{
            headers:{
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
                setpasswordvalidation("")
                profileInfoRequest()
                setTimeout(() => {
                  navigation.navigate("PersonalInfo")
                }, 1000)
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
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const updateContactNumber = async () => {
    if(passwordvalidation.split(" ") == ""){
      if(Platform.OS == "android"){
        ToastAndroid.show("Please input password", ToastAndroid.SHORT)
      }
      else{
        alert("Please input password")
      }
    }
    else{
      await AsyncStorage.getItem('token').then((resp) => {
        if(resp != null){
          Axios.post(`${URL}/commuters/editcommutercontactnumber`, {
            contactnumber: contactnumber,
            password: passwordvalidation
          },{
            headers:{
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
                setpasswordvalidation("")
                profileInfoRequest()
                setTimeout(() => {
                  navigation.navigate("PersonalInfo")
                }, 1000)
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
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const updatePassword = async () => {
    if(oldpassword.split(" ") == ""){
      if(Platform.OS == "android"){
        ToastAndroid.show("Please input password", ToastAndroid.SHORT)
      }
      else{
        alert("Please input password")
      }
    }
    else{
      if(confnewpassword.split(" ") == ""){
        if(Platform.OS == "android"){
          ToastAndroid.show("Please confirm password", ToastAndroid.SHORT)
        }
        else{
          alert("Please confirm password")
        }
      }
      else{
        if(confnewpassword != oldpassword){
          if(Platform.OS == "android"){
            ToastAndroid.show("Password and Confirm Password do not match", ToastAndroid.SHORT)
          }
          else{
            alert("Password and Confirm Password do not match")
          }
        }
        else{
          if(newpassword.split(" ") == ""){
            if(Platform.OS == "android"){
              ToastAndroid.show("Please provide a new password", ToastAndroid.SHORT)
            }
            else{
              alert("Please provide a new password")
            }
          }
          else{
            await AsyncStorage.getItem('token').then((resp) => {
              if(resp != null){
                Axios.post(`${URL}/commuters/editcommuterpassword`, {
                  newpassword: newpassword,
                  password: oldpassword
                },{
                  headers:{
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
                      // setpasswordvalidation("")
                      setnewpassword("")
                      setoldpassword("")
                      setconfnewpassword("")
                      profileInfoRequest()
                      setTimeout(() => {
                        navigation.navigate("PersonalInfo")
                      }, 1000)
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
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        }
      }
    }
  }

  return (
    <View style={{backgroundColor: "transparent", alignItems: "center", flexDirection: "column", paddingTop: 20, paddingLeft: 15, paddingRight: 15, borderColor: "#C1C1C1", borderTopWidth: 1}}>
      <Text style={{color: "#000000", fontSize: 17, fontWeight: "bold"}}>{route.params.editType}</Text>
      <View style={{backgroundColor: "transparent", paddingTop: 10, width: "100%", maxWidth: 500, alignItems: "center"}}>
        <Text style={{textAlign: "justify", color: "black"}}>Changes to your name will be reflected accross your account.</Text>
      </View>
      {route.params.editType == "Name"? (
        <View style={{backgroundColor: "transparent", paddingTop: 15, width: "100%", maxWidth: 500, alignItems: "flex-start", paddingLeft: 10, paddingRight: 10}}>
            <Text style={{textAlign: "justify", color: "#000000B2", paddingLeft: 5, paddingRight: 5}}>Name</Text>
            <TextInput value={namedefault} onChangeText={(e) => { setnamedefault(e) }} placeholder='Input your new name here' style={{width: "100%", borderColor: "#C1C1C1", borderBottomWidth: 1, fontSize: 15, color: "black", height: 40}} />
            <View style={{backgroundColor: "transparent", marginTop: 30, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", width: "100%"}}>
                <TouchableOpacity onPress={() => { navigation.navigate("PersonalInfo") }} style={{width: 80, height: 40, backgroundColor: "transparent", borderRadius: 10, justifyContent: "center", alignItems: "center", marginRight: 10}}>
                    <Text style={{color: "black", fontSize: 15}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { updateName() }} style={{width: 80, height: 40, backgroundColor: "#294172", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "white", fontSize: 15}}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
      ) : <View></View>}
      {route.params.editType == "Email"? (
        <View style={{backgroundColor: "transparent", paddingTop: 15, width: "100%", maxWidth: 500, alignItems: "flex-start", paddingLeft: 10, paddingRight: 10}}>
            <Text style={{textAlign: "justify", color: "#000000B2", paddingLeft: 5, paddingRight: 5}}>Email</Text>
            <TextInput value={emaildefault} onChangeText={(e) => { setemaildefault(e) }} placeholder='Input your new email here' style={{width: "100%", borderColor: "#C1C1C1", borderBottomWidth: 1, fontSize: 15, color: "black", height: 40}} />
            <Text style={{textAlign: "justify", color: "#000000B2", paddingLeft: 5, paddingRight: 5, marginTop: 15}}>Password</Text>
            <TextInput secureTextEntry={true} value={passwordvalidation} onChangeText={(e) => { setpasswordvalidation(e) }} placeholder='Input password for confirmation' style={{width: "100%", borderColor: "#C1C1C1", borderBottomWidth: 1, fontSize: 15, color: "black", height: 40}} />
            <View style={{backgroundColor: "transparent", marginTop: 30, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", width: "100%"}}>
                <TouchableOpacity onPress={() => { navigation.navigate("PersonalInfo") }} style={{width: 80, height: 40, backgroundColor: "transparent", borderRadius: 10, justifyContent: "center", alignItems: "center", marginRight: 10}}>
                    <Text style={{color: "black", fontSize: 15}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { updateEmail() }} style={{width: 80, height: 40, backgroundColor: "#294172", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "white", fontSize: 15}}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
      ) : <View></View>}
      {route.params.editType == "Contact Number"? (
        <View style={{backgroundColor: "transparent", paddingTop: 15, width: "100%", maxWidth: 500, alignItems: "flex-start", paddingLeft: 10, paddingRight: 10}}>
            <Text style={{textAlign: "justify", color: "#000000B2", paddingLeft: 5, paddingRight: 5}}>Contact Number</Text>
            <TextInput value={contactnumber} onChangeText={(e) => { setcontactnumber(e) }} placeholder='Input your new contact number here' style={{width: "100%", borderColor: "#C1C1C1", borderBottomWidth: 1, fontSize: 15, color: "black", height: 40}} />
            <Text style={{textAlign: "justify", color: "#000000B2", paddingLeft: 5, paddingRight: 5, marginTop: 15}}>Password</Text>
            <TextInput secureTextEntry={true} value={passwordvalidation} onChangeText={(e) => { setpasswordvalidation(e) }} placeholder='Input password for confirmation' style={{width: "100%", borderColor: "#C1C1C1", borderBottomWidth: 1, fontSize: 15, color: "black", height: 40}} />
            <View style={{backgroundColor: "transparent", marginTop: 30, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", width: "100%"}}>
                <TouchableOpacity onPress={() => { navigation.navigate("PersonalInfo") }} style={{width: 80, height: 40, backgroundColor: "transparent", borderRadius: 10, justifyContent: "center", alignItems: "center", marginRight: 10}}>
                    <Text style={{color: "black", fontSize: 15}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { updateContactNumber() }} style={{width: 80, height: 40, backgroundColor: "#294172", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "white", fontSize: 15}}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
      ) : <View></View>}
      {route.params.editType == "Password"? (
        <View style={{backgroundColor: "transparent", paddingTop: 15, width: "100%", maxWidth: 500, alignItems: "flex-start", paddingLeft: 10, paddingRight: 10}}>
            <Text style={{textAlign: "justify", color: "#000000B2", paddingLeft: 5, paddingRight: 5}}>Current Password</Text>
            <TextInput secureTextEntry={true} value={oldpassword} onChangeText={(e) => { setoldpassword(e) }} placeholder='Input your current password here' style={{width: "100%", borderColor: "#C1C1C1", borderBottomWidth: 1, fontSize: 15, color: "black", height: 40}} />
            <Text style={{textAlign: "justify", color: "#000000B2", paddingLeft: 5, paddingRight: 5, marginTop: 30, marginBottom: 5, fontWeight: "bold"}}>Input new password below</Text>
            <Text style={{textAlign: "justify", color: "#000000B2", paddingLeft: 5, paddingRight: 5, marginTop: 15}}>New Password</Text>
            <TextInput secureTextEntry={true} value={newpassword} onChangeText={(e) => { setnewpassword(e) }} placeholder='Input new password here' style={{width: "100%", borderColor: "#C1C1C1", borderBottomWidth: 1, fontSize: 15, color: "black", height: 40}} />
            <Text style={{textAlign: "justify", color: "#000000B2", paddingLeft: 5, paddingRight: 5, marginTop: 15}}>Confirm Password</Text>
            <TextInput secureTextEntry={true} value={confnewpassword} onChangeText={(e) => { setconfnewpassword(e) }} placeholder='Confirm you new password' style={{width: "100%", borderColor: "#C1C1C1", borderBottomWidth: 1, fontSize: 15, color: "black", height: 40}} />
            <View style={{backgroundColor: "transparent", marginTop: 30, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", width: "100%"}}>
                <TouchableOpacity onPress={() => { navigation.navigate("PersonalInfo") }} style={{width: 80, height: 40, backgroundColor: "transparent", borderRadius: 10, justifyContent: "center", alignItems: "center", marginRight: 10}}>
                    <Text style={{color: "black", fontSize: 15}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { updatePassword() }} style={{width: 80, height: 40, backgroundColor: "#294172", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "white", fontSize: 15}}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
      ) : <View></View>}
    </View>
  )
}

export default EditProfile