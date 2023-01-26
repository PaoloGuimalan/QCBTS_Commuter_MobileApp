import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import citylayout from '../../resources/citylayout.png'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Routes = () => {
  
    const authdetails = useSelector(state => state.authdetails)

    return (
        <View style={{flex: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "white", flexDirection: "column"}}>
        <View style={{height: 180, backgroundColor: "#2B4273", width: "100%", borderBottomLeftRadius: 15, borderBottomRightRadius: 15, justifyContent: "flex-end", alignItems: "center"}}>
            <View style={{position: "relative", top: 85, zIndex: 1, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Text style={{color: "white", fontSize: 20, fontWeight: "bold", marginBottom: 10, textShadowColor: "black", textShadowOffset: { height: 0.5, width: 0.5 }, textShadowRadius: 1}}>Buses & Routes</Text>
            </View>
            <Image source={citylayout} style={{width: "100%", height: 140, maxWidth: 385}} />
        </View>
        <View style={{backgroundColor: "transparent", flex: 1, width: "100%"}}>
            <ScrollView style={{width: "100%", backgroundColor: "transparent"}} contentContainerStyle={{flexGrow: 1}}>
                <View style={{backgroundColor: "transparent", justifyContent: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 15, paddingTop: 10}}>
                    <Text style={{color: "#303030", fontSize: 17, marginTop: 10, fontWeight: "bold"}}>Buses</Text>
                </View>
                <View style={{backgroundColor: "transparent", justifyContent: "center", width: "100%", paddingLeft: 20, paddingRight: 20, paddingBottom: 15, paddingTop: 10}}>
                    <Text style={{color: "#303030", fontSize: 17, marginTop: 10, fontWeight: "bold"}}>Routes</Text>
                </View>
            </ScrollView>
        </View>
     </View>
    )
}

export default Routes