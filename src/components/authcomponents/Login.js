import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Platform, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import citylayout from '../../resources/citylayout.png'
import carimg from '../../resources/Car.png'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_AUTH_DETAILS } from '../../redux/types/types'

const Login = ({navigation}) => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch()

  const loginRequest = () => {
    if(email.split(" ").join("") == "" || password.split(" ").join("") == ""){
      if(Platform.OS == "android"){
        ToastAndroid.show("Please fill the fields properly", ToastAndroid.SHORT)
      }
      else{
        alert("Please fill the fields properly")
      }
    }
    else{
      Axios.post(`${URL}/auth/logincommuter`,{
        email: email,
        password: password
      }).then((response) => {
        if(response.data.status){
          if(Platform.OS == "android"){
            ToastAndroid.show("Logged In", ToastAndroid.SHORT)
          }
          else{
            alert("Logged In")
          }

          AsyncStorage.setItem("token", response.data.result.token)
          setemail("")
          setpassword("")
          dispatch({ type: SET_AUTH_DETAILS, authdetails: {
            auth: true,
            userID: response.data.result.userID,
            username: response.data.result.username
          }})

        }
        else{
          if(Platform.OS == "android"){
            ToastAndroid.show("Failed to Log In", ToastAndroid.SHORT)
          }
          else{
            alert("Failed to Log In")
          }
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <View style={styles.viewmain}>
      <ScrollView style={{width: "100%"}} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.viewlayout}>
          <View style={styles.viewimglayout}>
            <Image source={citylayout} style={styles.imagelayout} />
            <Image source={carimg} style={styles.carimgstyle} />
          </View>
          <View style={styles.viewform}>
            <View style={styles.viewmainform}>
              <Text style={{...styles.text, ...styles.loginlabel}}>Log In</Text>
              <TextInput placeholder='Email' style={styles.textinput} value={email} onChangeText={(e) => { setemail(e) }} />
              <TextInput placeholder='Password' style={styles.textinput} value={password} onChangeText={(e) => { setpassword(e) }} />
              <TouchableOpacity style={styles.loginbtn} onPress={() => { loginRequest() }}>
                <Text style={styles.loginbtnlabel}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding: 10, marginTop: 20, marginBottom: 20}}>
                <Text style={{color: "black"}}>Forgot Password?</Text>
              </TouchableOpacity>
              <View style={{backgroundColor: "white", width: "100%", height: 100, justifyContent: "center", alignItems: "center", flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={{backgroundColor: "white", width: 70, height: 70, justifyContent: "center", alignItems: "center", borderRadius: 70, shadowColor: "black", elevation: 3, margin: 10}}>
                  <FAIcon name='facebook-f' style={{fontSize: 30, color: "black"}} />
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: "white", width: 70, height: 70, justifyContent: "center", alignItems: "center", borderRadius: 70, shadowColor: "black", elevation: 3, margin: 10}}>
                  <FAIcon name='twitter' style={{fontSize: 30, color: "black"}} />
                </TouchableOpacity>
              </View>
              <View style={{padding: 10, marginTop: 20, marginBottom: 20, width: "100%", flex: 1, flexDirection: "row", justifyContent: "center"}}>
                <Text style={{color: "#808080"}}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                  <Text style={{color: "black"}}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  viewmain:{
    backgroundColor: "#2B4273",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  viewlayout:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    width: "100%"
  },
  imagelayout:{
    width: "100%",
    height: 160,
    maxWidth: 415
  },
  viewform:{
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  carimgstyle:{
    position: "absolute",
    zIndex: 1,
    width: 195,
    height: 195,
    top: 150,
    left: 10
  },
  viewmainform:{
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 70
  },
  text:{
    color: "black"
  },
  loginlabel:{
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20
  },
  viewimglayout:{
    width: "100%",
    height: 240,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  textinput:{
    backgroundColor: "#2B427321",
    width: "90%",
    maxWidth: 350,
    borderRadius: 15,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15,
    color: "black",
    marginBottom: 15
  },
  loginbtn:{
    backgroundColor: "#2B4273",
    width: "90%",
    maxWidth: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  loginbtnlabel:{
    color: "white",
    fontSize: 15
  }
})

export default Login