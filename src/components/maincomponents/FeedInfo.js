import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import featuredsample from '../../resources/featuredsample.jpg'
import MIcons from 'react-native-vector-icons/MaterialIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_FEED_INFO } from '../../redux/types/types'
import { feedinfostate } from '../../redux/action/action'

const FeedInfo = ({navigation, route}) => {

  useEffect(() => {

    getFeedInfo()

    return () => {
      dispatch({type: SET_FEED_INFO, feedinfo: feedinfostate})
    }
  },[])

  const feedinfo = useSelector(state => state.feedinfo)
  const feedIDPred = route.params.feedID

  const [loadingFeedInfo, setloadingFeedInfo] = useState(true)

  const dispatch = useDispatch()

  const getFeedInfo = async () => {
    await AsyncStorage.getItem("token").then((resp) => {
      if(resp != null){
        Axios.get(`${URL}/commuters/feedInfo/${feedIDPred}`, {
          headers: {
            "x-access-token": resp
          }
        }).then((response) => {
          if(response.data.status){
            dispatch({type: SET_FEED_INFO, feedinfo: response.data.result})
            if(response.data.result != null){
              setloadingFeedInfo(false)
            }
            // console.log("TEST DATA FEED INFO", response.data.result)
          }
          else{
            //none
            // console.log("TEST DATA FEED INFO", response.data.result)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    })
  }

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      {loadingFeedInfo? (
        <ScrollView style={{width: "100%"}} contentContainerStyle={{flexGrow: 1, alignItems: "center"}}>
          <View style={{width: "100%", height: 300, borderBottomLeftRadius: 15, backgroundColor: "black"}}>
            <View style={{width: "100%", height: "100%", opacity: 0.7}}>
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
                    <Text style={{color: "white", fontSize: 12, width: "100%", textAlign: "justify", marginLeft: 3}}></Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{backgroundColor: "transparent", width: "100%", paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20}}>
            <Text style={{color: "grey", fontSize: 14, marginBottom: 10, marginTop: 100, textAlign: "center", width: "100%"}}>loading...</Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={{width: "100%"}} contentContainerStyle={{flexGrow: 1, alignItems: "center"}}>
          <View style={{width: "100%", height: 300, borderBottomLeftRadius: 15, backgroundColor: "black"}}>
            <ImageBackground source={feedinfo.preview == ""? featuredsample : { uri: feedinfo.preview }} style={{width: "100%", height: "100%", opacity: 0.7}} imageStyle={{borderBottomLeftRadius: 15}}>
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
                    <Text style={{color: "white", fontSize: 12, width: "100%", textAlign: "justify", marginLeft: 3}}>{feedinfo.time}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={{backgroundColor: "transparent", width: "100%", paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20}}>
            <View style={{backgroundColor: "transparent", width: "100%", marginBottom: 20}}>
              <Text style={{fontSize: 20, color: "black", fontWeight: "bold"}}>{feedinfo.title}</Text>
              <Text style={{color: "#2C2C2C", fontSize: 13, marginBottom: 5}}>{feedinfo.date}</Text>
            </View>
            <View style={{width: "100%", alignItems: "center", paddingLeft: 5, paddingRight: 5}}>
              {feedinfo.content.split("***").map((cnt, i) => {
                return(
                  <Text key={i} style={{color: "#2C2C2C", fontSize: 14, marginBottom: 10, marginTop: 0, textAlign: "justify", width: "100%"}}>{cnt}</Text>
                )
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default FeedInfo