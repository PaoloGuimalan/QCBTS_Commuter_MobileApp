import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Platform, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import citylayout from '../../resources/citylayout.png'
import CheckBox from '@react-native-community/checkbox'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'

const Register = ({navigation}) => {

  const [checkedBox, setcheckedBox] = useState(false);

  const [regname, setregname] = useState("");
  const [email, setemail] = useState("");
  const [contactnumber, setcontactnumber] = useState("");
  const [password, setpassword] = useState("");
  const [confpassword, setconfpassword] = useState("");

  const [loadingButton, setloadingButton] = useState(false);

  const signuprequest = () => {
    if(checkedBox){
      if(password.split(" ") != "" && confpassword.split(" ") != ""){
        if(password == confpassword){
          if(regname != "" && email != "" && contactnumber != ""){
            setloadingButton(true)
            Axios.post(`${URL}/auth/registercommuter`,{
              name: regname,
              email: email,
              contactnumber: contactnumber,
              password: password
            }).then((response) => {
              setloadingButton(false)
              if(response.data.status){
                // console.log("Reg OK")
                if(Platform.OS == "android"){
                  ToastAndroid.show("Successfully Registered", ToastAndroid.SHORT)
                }
                else{
                  alert("Successfully Registered")
                }
  
                setcheckedBox(false)
                setregname("")
                setemail("")
                setcontactnumber("")
                setpassword("")
                setconfpassword("")
  
                setTimeout(() => {
                  navigation.navigate("Auth")
                }, 1500)
  
              }
              else{
                if(Platform.OS == "android"){
                  ToastAndroid.show("Failed to Registered", ToastAndroid.SHORT)
                }
                else{
                  alert("Failed to Registered")
                }
              }
            }).catch((err) => {
              setloadingButton(false)
              console.log(err)
              if(Platform.OS == "android"){
                ToastAndroid.show("Network Error", ToastAndroid.SHORT)
              }
              else{
                alert("Network Error")
              }
            })
          }
          else{
            if(Platform.OS == "android"){
              ToastAndroid.show("Please complete all fields", ToastAndroid.SHORT)
            }
            else{
              alert("Please complete all fields")
            }
          }
        }
        else{
          if(Platform.OS == "android"){
            ToastAndroid.show("Password do not match", ToastAndroid.SHORT)
          }
          else{
            alert("Password do not match")
          }
        }
      }
      else{
        if(Platform.OS == "android"){
          ToastAndroid.show("Please fill the password field", ToastAndroid.SHORT)
        }
        else{
          alert("Please fill the password field")
        }
      }
    }
    else{
      if(Platform.OS == "android"){
        ToastAndroid.show("Please agree with the Terms and Conditions", ToastAndroid.SHORT)
      }
      else{
        alert("Please agree with the Terms and Conditions")
      }
    }
  }

  return (
    <View style={styles.viewmain}>
      <ScrollView style={{width: "100%"}} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.viewlayout}>
          <Image source={citylayout} style={styles.imagelayout} />
        </View>
        <View style={styles.viewform}>
          <Text style={{...styles.text, ...styles.signuplabel}}>Sign Up</Text>
          <View style={{width: "100%", flex: 1, flexDirection: "column", alignItems: "center", paddingTop: 20}}>
            <TextInput placeholder='Your Name' style={styles.textinput} value={regname} onChangeText={(e) => { setregname(e) }} />
            <TextInput placeholder='Email' style={styles.textinput} value={email} onChangeText={(e) => { setemail(e) }} />
            <TextInput placeholder='Contact Number' style={styles.textinput} value={contactnumber} onChangeText={(e) => { setcontactnumber(e) }} />
            <TextInput secureTextEntry={true} placeholder='Password' style={styles.textinput} value={password} onChangeText={(e) => { setpassword(e) }} />
            <TextInput secureTextEntry={true} placeholder='Confirm Password' style={styles.textinput} value={confpassword} onChangeText={(e) => { setconfpassword(e) }} />
            {loadingButton? (
              <View style={styles.loginloading}>
                <Text style={{color: "#808080", fontSize: 13}}>loading...</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.loginbtn} onPress={() => { signuprequest() }}>
                <Text style={styles.loginbtnlabel}>Sign Up</Text>
              </TouchableOpacity>
            )}
            <View style={{width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <CheckBox tintColors={{true: "#2B4273"}} disabled={false} value={checkedBox} onValueChange={(value) => { setcheckedBox(value) }}/>
              <Text style={{...styles.text}}>I agree to the </Text>
              <TouchableOpacity onPress={() => {  }}>
                  <Text style={{color: "#FF0000"}}>Terms & Conditions</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: "100%", height: 100, justifyContent: "center", alignItems: 'center', flexDirection: "row"}}>
            <Text style={{color:"#808080"}}>Have an account already? </Text>
            <TouchableOpacity onPress={() => { navigation.navigate("Auth") }}>
              <Text style={{color: "black"}}>Log In</Text>
            </TouchableOpacity>
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
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: 'center',
    width: "100%",
    height: 200
  },
  imagelayout:{
    width: "100%",
    height: 160,
    maxWidth: 415
  },
  viewform:{
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  text:{
    color: "black"
  },
  signuplabel:{
    fontSize: 20,
    fontWeight: "bold"
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
    borderRadius: 20,
    marginBottom: 20
  },
  loginloading:{
    width: "90%",
    maxWidth: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20
  },
  loginbtnlabel:{
    color: "white",
    fontSize: 15
  }
})

export default Register