import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {

  const authdetails = useSelector(state => state.authdetails)

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Home: {authdetails.userID} | {authdetails.username}</Text>
    </View>
  )
}

export default Home