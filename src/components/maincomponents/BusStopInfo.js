import { View, Text } from 'react-native'
import React from 'react'

const BusStopInfo = ({route, navigation}) => {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text>BusStopInfo: {route.params.id}</Text>
        </View>
      )
}

export default BusStopInfo