import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import { URL } from '../../json/urlconfig'

const AdvanceInfo = () => {

  useEffect(() => {
    initWaitingHistory()
  },[])

  const [waitingHistoryList, setwaitingHistoryList] = useState([])
  const [refreshWH, setrefreshWH] = useState(false);

  const initWaitingHistory = async () => {
    setrefreshWH(true)
    await AsyncStorage.getItem("token").then((resp) => {
      if(resp != null){
          Axios.get(`${URL}/commuters/waitingHistory`, {
              headers:{
                  "x-access-token": resp
              }
          }).then((response) => {
              if(response.data.status){
                setwaitingHistoryList(response.data.result)
                setrefreshWH(false)
                  // console.log(response.data.result)
              }
          }).catch((err) => {
              console.log(err.message)
          })
      }
    })
  }

  return (
    <View style={{backgroundColor: "transparent", alignItems: "center", flexDirection: "column", paddingLeft: 20, paddingRight: 20}}>
      <View style={{backgroundColor: "transparent", width: "100%"}}>
        <Text style={{color: "#303030", fontSize: 17, fontWeight: "bold", marginBottom: 15}}>Waiting History</Text>
        {waitingHistoryList.length == 0? (
          <View style={{width: "100%", justifyContent: "center", alignItems: "center", height: 150}}>
            <Text style={{color: "grey", fontSize: 15}}>No History yet</Text>
          </View>
        ) : (
          <ScrollView
          refreshControl={
            <RefreshControl
                refreshing={refreshWH}
                onRefresh={() => { initWaitingHistory() }}
            />
          }
          style={{backgroundColor: "transparent", paddingLeft: 20, paddingRight: 20, maxWidth: 500, width: "100%"}} contentContainerStyle={{ paddingBottom: 100, alignItems: "center", flexDirection: "column", alignSelf: "center"}}>
            {waitingHistoryList.map((wh, i) => {
              return(
                <View key={i} style={{backgroundColor: "transparent", width: "100%", borderWidth: 1, borderColor: "#939393", borderRadius: 10, marginBottom: 10}}>
                  <TouchableOpacity style={{width: "100%"}}>
                    <View style={{backgroundColor: "transparent", width: "100%", height: 50, flexDirection: "row", alignItems: "center", paddingLeft: 15, paddingRight: 15}}>
                      <IonIcons name='time-outline' style={{fontSize: 15, color: "#303030"}} />
                      <Text style={{color: "#303030", fontSize: 13, fontWeight: "bold", marginLeft: 5}}>Waited</Text>
                      <Text style={{color: "#303030", fontSize: 13}}>: {wh.action.split(" ")[4]}</Text>
                      <View style={{flex: 1, alignItems: "flex-end", justifyContent: "center"}}>
                        <Text style={{color: "#303030", fontSize: 12}}>{wh.dateCommited.dateRecorded}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>
        )}
      </View>
    </View>
  )
}

export default AdvanceInfo