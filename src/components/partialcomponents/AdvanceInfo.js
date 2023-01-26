import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'

const AdvanceInfo = () => {
  return (
    <View style={{backgroundColor: "transparent", alignItems: "center", flexDirection: "column", paddingLeft: 20, paddingRight: 20}}>
      <View style={{backgroundColor: "transparent", width: "100%"}}>
        <Text style={{color: "#303030", fontSize: 17, fontWeight: "bold", marginBottom: 15}}>Waiting History</Text>
        <View style={{backgroundColor: "transparent", alignItems: "center", flexDirection: "column", paddingLeft: 20, paddingRight: 20, maxWidth: 500, alignSelf: "center", width: "100%"}}>
          <View style={{backgroundColor: "transparent", width: "100%", borderWidth: 1, borderColor: "#939393", borderRadius: 10}}>
            <TouchableOpacity style={{width: "100%"}}>
              <View style={{backgroundColor: "transparent", width: "100%", height: 50, flexDirection: "row", alignItems: "center", paddingLeft: 15, paddingRight: 15}}>
                <IonIcons name='time-outline' style={{fontSize: 15, color: "#303030"}} />
                <Text style={{color: "#303030", fontSize: 13, fontWeight: "bold", marginLeft: 5}}>Waited</Text>
                <Text style={{color: "#303030", fontSize: 13}}>: Bus Stop 1</Text>
                <View style={{flex: 1, alignItems: "flex-end", justifyContent: "center"}}>
                  <Text style={{color: "#303030", fontSize: 12}}>Jan 17, 2023</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default AdvanceInfo