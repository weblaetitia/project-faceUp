import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Text, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { Button, Input } from 'react-native-elements';



function HomeScreen({navigation}) {


// const imageBG = { uri: "../assets/home.jpg" };
const imageBG = require('../assets/home.jpg')

  return (
    <View style={styles.container}>
        <ImageBackground source={imageBG} style={styles.imageBG}>
        <View style={{width: '75%'}}>
        <Input 
            placeholder='John'
            leftIcon={{ type: 'font-awesome', name: 'user', color: '#009788' }}
            />
        <Button title='Go to gallery' 
        buttonStyle={{backgroundColor: '#009788'}}
        onPress={() => navigation.navigate('Gallery')} />
        </View>
        
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
    },
    imageBG: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center'
      },
  })




export default HomeScreen