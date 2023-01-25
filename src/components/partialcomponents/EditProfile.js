import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const EditProfile = ({navigation, route}) => {

  const profiledetails = useSelector(state => state.profiledetails)

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
                <TouchableOpacity style={{width: 80, height: 40, backgroundColor: "#294172", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
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
                <TouchableOpacity style={{width: 80, height: 40, backgroundColor: "#294172", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
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
                <TouchableOpacity style={{width: 80, height: 40, backgroundColor: "#294172", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
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
                <TouchableOpacity style={{width: 80, height: 40, backgroundColor: "#294172", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "white", fontSize: 15}}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
      ) : <View></View>}
    </View>
  )
}

export default EditProfile