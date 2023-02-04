import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import featuredsample from '../../resources/featuredsample.jpg'
import MIcons from 'react-native-vector-icons/MaterialIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'

const FeedInfo = ({navigation, route}) => {

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <ScrollView style={{width: "100%"}} contentContainerStyle={{flexGrow: 1, alignItems: "center"}}>
        <View style={{width: "100%", height: 300, borderBottomLeftRadius: 15, backgroundColor: "black"}}>
          <ImageBackground source={featuredsample} style={{width: "100%", height: "100%", opacity: 0.7}} imageStyle={{borderBottomLeftRadius: 15}}>
            <View style={{flex: 1, backgroundColor: "transparent", paddingLeft: 20, paddingRight: 20, justifyContent: "space-between"}}>
              <View style={{width: "100%", backgroundColor: "transparent", height: 50, justifyContent: "flex-end"}}>
                <TouchableOpacity onPress={() => { navigation.navigate("HomeFeed") }} style={{flexDirection: "row", alignItems: "center", height: 30}}>
                  <MIcons name='arrow-back-ios' style={{fontSize: 20, color: "white"}} />
                  <Text style={{color: "white", fontSize: 15}}>Home</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: "100%", height: 40, flexDirection: "row", alignItems: "center"}}>
                <Text style={{backgroundColor: "#F85858", color: "white", paddingLeft: 5, paddingRight: 5, height: 20, minWidth: 50, textAlign: "center", textAlignVertical: "center", borderRadius: 10, fontSize: 12}}>Latest</Text>
                <View style={{width: "100%", flexDirection: "row", alignItems: "center", marginLeft: 20}}>
                  <IonIcons name='time-outline' style={{fontSize: 15, color: "white"}} />
                  <Text style={{color: "white", fontSize: 12, width: "100%", textAlign: "justify", marginLeft: 3}}>6 days ago</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{backgroundColor: "transparent", width: "100%", paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20}}>
          <View style={{backgroundColor: "transparent", width: "100%", marginBottom: 20}}>
            <Text style={{fontSize: 20, color: "black", fontWeight: "bold"}}>For Today's Traffic</Text>
            <Text style={{color: "#2C2C2C", fontSize: 13, marginBottom: 5}}>January 2023</Text>
          </View>
          <View style={{width: "100%", alignItems: "center", paddingLeft: 5, paddingRight: 5}}>
            <Text style={{color: "#2C2C2C", fontSize: 14, marginBottom: 15}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</Text>
            <Text style={{color: "#2C2C2C", fontSize: 14, marginBottom: 15}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default FeedInfo