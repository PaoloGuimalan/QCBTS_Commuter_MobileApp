import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import citylayout from '../../resources/citylayout.png'
import carimg from '../../resources/Car.png'
import featuredsample from '../../resources/featuredsample.jpg'
import OctiIcons from 'react-native-vector-icons/Octicons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import FeedIndvUpdate from '../partialcomponents/FeedIndvUpdate'

const Feed = ({navigation}) => {

  const authdetails = useSelector(state => state.authdetails)

  return (
    <View style={{flex: 1, backgroundColor: "#2B4273", justifyContent: "flex-start", alignItems: "center", flexDirection: "column"}}>
      <ScrollView style={{width: "100%"}} contentContainerStyle={{flexGrow: 1}}>
        <View style={{backgroundColor: "transparent", width: "100%", height: 180, alignItems: "center"}}>
            <View style={{backgroundColor: "transparent", width: "100%", height: 60, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between"}}>
                <View style={{backgroundColor: "transparent", flexDirection: "column", paddingLeft: 20, paddingRight: 20}}>
                    <Text style={{color: "white", fontSize: 17, fontWeight: "bold"}}>Bus Track</Text>
                    <Text style={{color: "white", fontSize: 12}}>Quezon City</Text>
                </View>
                <View style={{backgroundColor: "transparent", flexDirection: "row", paddingLeft: 20, paddingRight: 20}}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Profile") }} style={{backgroundColor: "white", width: 40, height: 40, borderRadius: 40, justifyContent: "center", alignItems: "center", marginLeft: 5, marginRight: 5, elevation: 2}}>
                        <OctiIcons name='person' style={{fontSize: 20, color: "black"}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: "white", width: 40, height: 40, borderRadius: 40, justifyContent: "center", alignItems: "center", marginLeft: 5, marginRight: 5, elevation: 2}}>
                        <IonIcons name='notifications-outline' style={{fontSize: 20, color: "black"}} />
                    </TouchableOpacity>
                </View>
            </View>
            <Image source={citylayout} style={{width: "100%", height: 160, maxWidth: 385}} />
        </View>
        <Image source={carimg} style={styles.carimgstyle} />
        <View style={{flex: 1, backgroundColor: "white", width: '100%', alignItems: "center", borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingTop: 45, paddingBottom: 100}}>
            <View style={{backgroundColor: "transparent", width: "100%", paddingLeft: 20, paddingRight: 20, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity onPress={() => { navigation.navigate("FeedInfo", { feedID: 1 }) }} style={{width: "100%", maxWidth: 500, borderRadius: 10, backgroundColor: "black", borderRadius: 10}}>
                    <ImageBackground source={featuredsample} style={{width: "100%", height: 220, maxWidth: 500, flexDirection: "column"}} imageStyle={{borderRadius: 10, opacity: 0.7}}>
                        <View style={{width: "100%", backgroundColor: "transparent", height: "50%"}}>
                            <Text style={{color: "white", backgroundColor: "#294172", width: 70, height: 20, textAlignVertical: "center", textAlign: 'center', marginTop: 10, marginLeft: 10, borderRadius: 10, fontSize: 12}}>Featured</Text>
                        </View>
                        <View style={{width: "100%", backgroundColor: "transparent", height: "50%", flexDirection: "column", justifyContent: 'flex-end', alignItems: "center", paddingBottom: 15, paddingLeft: 20, paddingRight: 20}}>
                            <View style={{width: "100%", flexDirection: "row"}}>
                                <IonIcons name='time-outline' style={{fontSize: 15, color: "white"}} />
                                <Text style={{color: "white", fontSize: 12, width: "100%", textAlign: "justify", marginLeft: 3}}>6 days ago</Text>
                            </View>
                            <Text style={{color: "white", fontSize: 17, width: "100%", textAlign: "justify"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor: "transparent", paddingTop: 15, paddingBottom: 15, width: "100%", paddingLeft: 20, paddingRight: 20, justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 17, maxWidth: 500, color: "#2C2C2C", width: "100%", fontWeight: "bold", marginBottom: 10}}>Recommend</Text>
                <TouchableOpacity onPress={() => { navigation.navigate("FeedInfo", { feedID: 2 }) }} style={{width: "100%", maxWidth: 500, borderRadius: 10, backgroundColor: "black", borderRadius: 10, marginBottom: 10}}>
                    <FeedIndvUpdate />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("FeedInfo", { feedID: 3 }) }} style={{width: "100%", maxWidth: 500, borderRadius: 10, backgroundColor: "black", borderRadius: 10}}>
                    <FeedIndvUpdate />
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    carimgstyle:{
        position: "absolute",
        zIndex: 1,
        width: 195,
        height: 195,
        top: 75,
        left: 10
      }
})

export default Feed