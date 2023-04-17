import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import citylayout from '../../resources/citylayout.png'
import carimg from '../../resources/Car.png'
import featuredsample from '../../resources/featuredsample.jpg'
import OctiIcons from 'react-native-vector-icons/Octicons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import FeedIndvUpdate from '../partialcomponents/FeedIndvUpdate'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_FEED_LIST } from '../../redux/types/types'

const Feed = ({navigation}) => {

  const authdetails = useSelector(state => state.authdetails)
  const feedlist = useSelector(state => state.feedlist);
  const dispatch = useDispatch()

  const [refreshingFeed, setrefreshingFeed] = useState(false)
  var proxyListLoader = [1,2,3,4]

  useEffect(() => {
    getFeed()
  },[])

  const getFeed = async () => {
    setrefreshingFeed(true)
    await AsyncStorage.getItem("token").then((resp) => {
        if(resp != null){
            Axios.get(`${URL}/commuters/getPosts`, {
                headers: {
                  "x-access-token": resp
                }
              }).then((response) => {
                setrefreshingFeed(false)
                if(response.data.status){
                //   console.log(response.data.result)
                    dispatch({type: SET_FEED_LIST, feedlist: response.data.result})
                }
                else{
                //   console.log(response.data.message)
                }
              }).catch((err) => {
                console.log(err)
            })
        }
    })
  }

  return (
    <View style={{flex: 1, backgroundColor: "#2B4273", justifyContent: "flex-start", alignItems: "center", flexDirection: "column"}}>
      <ScrollView style={{width: "100%"}}
      refreshControl={
        <RefreshControl
            refreshing={refreshingFeed}
            onRefresh={() => { getFeed() }}
        />
      }
      contentContainerStyle={{flexGrow: 1}}>
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
                    {/* <TouchableOpacity style={{backgroundColor: "white", width: 40, height: 40, borderRadius: 40, justifyContent: "center", alignItems: "center", marginLeft: 5, marginRight: 5, elevation: 2}}>
                        <IonIcons name='notifications-outline' style={{fontSize: 20, color: "black"}} />
                    </TouchableOpacity> */}
                </View>
            </View>
            <Image source={citylayout} style={{width: "100%", height: 160, maxWidth: 385}} />
        </View>
        <Image source={carimg} style={styles.carimgstyle} />
        <View style={{flex: 1, backgroundColor: "white", width: '100%', alignItems: "center", borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingTop: 35, paddingBottom: 100}}>
            <View style={{backgroundColor: "transparent", width: "100%", paddingLeft: 20, paddingRight: 20, justifyContent: "center", alignItems: "center"}}>
                {feedlist.length != 0? (
                    <TouchableOpacity onPress={() => { navigation.navigate("FeedInfo", { feedID: feedlist[0].postID }) }} style={{width: "100%", maxWidth: 500, borderRadius: 10, backgroundColor: "black", borderRadius: 10}}>
                        <ImageBackground resizeMode="center" source={{uri: feedlist[0].preview}} style={{width: "100%", height: 220, maxWidth: 500, flexDirection: "column"}} imageStyle={{borderRadius: 10, opacity: 0.7}}>
                            <View style={{width: "100%", backgroundColor: "transparent", height: "50%", alignItems: "flex-end"}}>
                                <Text style={{color: "white", backgroundColor: "#294172", width: 70, height: 20, textAlignVertical: "center", textAlign: 'center', marginTop: 10, marginLeft: 10, marginRight: 10, borderRadius: 10, fontSize: 12}}>Featured</Text>
                            </View>
                            <View style={{width: "100%", backgroundColor: "transparent", height: "50%", flexDirection: "column", justifyContent: 'flex-end', alignItems: "center", paddingBottom: 15, paddingLeft: 20, paddingRight: 20}}>
                                <View style={{width: "100%", flexDirection: "row"}}>
                                    <IonIcons name='time-outline' style={{fontSize: 15, color: "white"}} />
                                    <Text style={{color: "white", fontSize: 12, width: "100%", textAlign: "justify", marginLeft: 3}}>{feedlist[0].date}</Text>
                                </View>
                                <Text style={{color: "white", fontSize: 17, width: "100%", textAlign: "justify"}}>{feedlist[0].title}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                ) : (
                    <View style={{width: "100%", maxWidth: 500, borderRadius: 10, backgroundColor: "#dddddd", borderRadius: 10}}>
                        <View style={{width: "100%", height: 220, maxWidth: 500, flexDirection: "column", borderRadius: 10, opacity: 0.7}}>
                            <View style={{width: "100%", backgroundColor: "transparent", height: "50%", alignItems: "flex-end"}}>
                                {/* <Text style={{color: "white", backgroundColor: "#294172", width: 70, height: 20, textAlignVertical: "center", textAlign: 'center', marginTop: 10, marginLeft: 10, marginRight: 10, borderRadius: 10, fontSize: 12}}></Text> */}
                            </View>
                            <View style={{width: "100%", backgroundColor: "transparent", height: "50%", flexDirection: "column", justifyContent: 'flex-end', alignItems: "center", paddingBottom: 15, paddingLeft: 20, paddingRight: 20}}>
                                <View style={{width: "100%", flexDirection: "row"}}>
                                    {/* <IonIcons name='time-outline' style={{fontSize: 15, color: "white"}} /> */}
                                    <Text style={{color: "white", fontSize: 12, width: "100%", textAlign: "justify", marginLeft: 3}}></Text>
                                </View>
                                <Text style={{color: "white", fontSize: 17, width: "100%", textAlign: "justify"}}></Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>
            <View style={{backgroundColor: "transparent", paddingTop: 15, paddingBottom: 15, width: "100%", paddingLeft: 20, paddingRight: 20, justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 17, maxWidth: 500, color: "#2C2C2C", width: "100%", fontWeight: "bold", marginBottom: 10}}>Recommend</Text>
                {feedlist.length != 0? (
                    feedlist.map((fd, i) => {
                        if(i != 0){
                            return(
                                <TouchableOpacity key={fd.postID} onPress={() => { navigation.navigate("FeedInfo", { feedID: fd.postID }) }} style={{width: "100%", maxWidth: 500, borderRadius: 10, backgroundColor: "black", borderRadius: 10, marginBottom: 10}}>
                                    <FeedIndvUpdate fd={fd} />
                                </TouchableOpacity>
                            )
                        }
                    })
                ) : (
                    proxyListLoader.map((fd, i) => {
                        if(i != 0){
                            return(
                                <View key={i} style={{width: "100%", maxWidth: 500, borderRadius: 10, backgroundColor: "black", borderRadius: 10, marginBottom: 10}}>
                                    <View style={{backgroundColor: "#dddddd", width: "100%", height: 150, elevation: 0, borderColor: "#E2E5DE", borderWidth: 0, borderRadius: 10, flexDirection: "row"}}>
                                        <View style={{backgroundColor: "transparent", height: "100%", width: 135, justifyContent: "center", alignItems: "center"}}>
                                            {/* <Image source={{uri: fd.preview}} style={{width: "100%", height: "100%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/> */}
                                        </View>
                                        <View style={{backgroundColor: "transparent", flex: 1, flexDirection: "column", paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                                            {/* <Text style={{color: "black", fontSize: 15, fontWeight: "bold"}} numberOfLines={2}>{fd.title}</Text> */}
                                            {/* <Text style={{color: "#767676", fontSize: 13, marginBottom: 5}}>{fd.date}</Text> */}
                                            {/* <Text style={{color: "#444444", fontSize: 13}} numberOfLines={3}>{fd.content}</Text> */}
                                            <View style={{marginTop: 5, flexDirection: "row", width: "100%", backgroundColor: "transparent"}}>
                                                {/* <Text style={{backgroundColor: "#F85858", color: "white", paddingLeft: 5, paddingRight: 5, height: 20, minWidth: 50, textAlign: "center", textAlignVertical: "center", borderRadius: 10, fontSize: 12}}>Latest</Text> */}
                                                <View style={{width: "100%", flexDirection: "row", alignItems: "center", marginLeft: 10}}>
                                                    {/* <IonIcons name='time-outline' style={{fontSize: 15, color: "#404040"}} /> */}
                                                    {/* <Text style={{color: "#404040", fontSize: 12, width: "100%", textAlign: "justify", marginLeft: 3}}>6 days ago</Text> */}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    })
                )}
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
        // width: 195,
        // height: 195,
        // top: 75,
        width: 120,
        height: 120,
        top: 120,
        left: 10
      }
})

export default Feed