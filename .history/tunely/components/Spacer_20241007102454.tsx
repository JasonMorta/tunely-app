import { StyleSheet } from 'react-native'
import React from 'react'
import { ThemedView } from './ThemedView'

export default function Spacer({height=10, width="100%"}) {




  return (
   <ThemedView style={styles(height,width).container}>
    </ThemedView>
  )
}

const styles = (height:any,width:any) => StyleSheet.create({
  container: {
    height: 1,
    marginVertical: height,
    marginHorizontal: 'auto' ,
    width: width,
    backgroundColor: 'gray'
  }
})