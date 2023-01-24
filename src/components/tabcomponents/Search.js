import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import citylayout from '../../resources/citylayout.png'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Search = () => {
  
    const authdetails = useSelector(state => state.authdetails)

    return (
     <View style={{flex: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "white", flexDirection: "column"}}>
        <View style={{height: 180, backgroundColor: "#2B4273", width: "100%", borderBottomLeftRadius: 15, borderBottomRightRadius: 15, justifyContent: "flex-end", alignItems: "center"}}>
            <View style={{position: "relative", top: 105, zIndex: 1, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Text style={{color: "white", fontSize: 20, fontWeight: "bold", marginBottom: 10, textShadowColor: "black", textShadowOffset: { height: 0.5, width: 0.5 }, textShadowRadius: 1}}>Explore</Text>
                <View style={{backgroundColor: "white", width: "80%", height: 40, borderRadius: 40, maxWidth: 500, flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingRight: 10, elevation: 2, zIndex: 1}}>
                    <IonIcons name='search' style={{color: "#7A7A7A", fontSize: 25}} />
                    <TextInput placeholder='Search here...' style={{backgroundColor: "transparent", flex: 1, color: "black"}} />
                </View>
            </View>
            <Image source={citylayout} style={{width: "100%", height: 140, maxWidth: 385}} />
        </View>
        <View style={{backgroundColor: "transparent", flex: 1, width: "100%"}}>
            <ScrollView style={{width: "100%", backgroundColor: "transparent"}} contentContainerStyle={{flexGrow: 1}}>
                <View style={{backgroundColor: "transparent", flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <MCIcons name='image-filter-none' style={{fontSize: 60}} />
                    <Text style={{color: "#787878", fontSize: 13, marginTop: 10}}>Search something</Text>
                </View>
            </ScrollView>
        </View>
     </View>
    )
}

export default Search