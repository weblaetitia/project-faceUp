import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { Card, Badge } from 'react-native-elements'
import {connect} from 'react-redux'


function GalleryScreen(props) {

  // loop card on photos' array
  var photoCards = props.photos.map((element, i) => {
    {var badges = element.attribs.map((e, i) => {
      return (<Badge key={i} value={e} status="success" />)
    })}
    return (
      <Card key={i} 
            image={{uri: element.url}}>
        {badges}
      </Card>
    )
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text h1 style={styles.h1}>John's gallery</Text>
        {photoCards}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight
    },
    scrollView: {
      backgroundColor: 'white',
    },
    h1: {
      fontSize: 36,
      textAlign: 'center',
      marginTop: 18,
      fontWeight: 'bold'
    }
  })

function mapStateToProps(state) {
  return ({photos: state.photos})
}

export default connect(
  mapStateToProps,
  null )(GalleryScreen) 