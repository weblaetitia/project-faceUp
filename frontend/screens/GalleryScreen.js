import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, KeyboardAvoidingView, SafeAreaView, Image } from 'react-native';
import Constants from 'expo-constants';
import { Card, Badge } from 'react-native-elements'



function GalleryScreen() {

    const myGallery = [
        { picture: '../assets/picture-1.jpg',
        tags: ['homme', '70 ans', 'barbe', 'joyeux', 'cheveux gris']
         },
        { picture: '../assets/picture-2.jpg',
        tags: ['femme', '31 ans', 'lunettes', 'joyeux', 'cheveux chatain']
         },
        { picture: '../assets/picture-3.jpg',
        tags: ['homme', '26 ans', 'lunettes', 'joyeux', 'noeud papillon', 'jaune']
        },
        { picture: '../assets/picture-4.jpg',
        tags: ['femme', '70 ans', 'lunettes', 'joyeux', 'collier', 'cheveux gris']
        },
    ]

    const cards = myGallery.map((element, i) => {
        return (
            <Card key={i} 
            image={require('../assets/picture-4.jpg')}>
            <Badge value={element.tags} status="success" />
          </Card>
        )
    })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text h1 style={styles.h1}>John's gallery</Text>
        <Card image={require('../assets/picture-1.jpg')}>
            <Badge value='homme' status="success" />
            <Badge value='70 ans' status="success" />
            <Badge value='barbe' status="success" />
            <Badge value='joyeux' status="success" />
            <Badge value='cheveux gris' status="success" />
        </Card>
        <Card image={require('../assets/picture-2.jpg')}>
            <Badge value='femme' status="success" />
            <Badge value='31 ans' status="success" />
            <Badge value='lunettes' status="success" />
            <Badge value='joyeux' status="success" />
            <Badge value='cheveux chatains' status="success" />
        </Card>
        <Card image={require('../assets/picture-3.jpg')}>
            <Badge value='homme' status="success" />
            <Badge value='26 ans' status="success" />
            <Badge value='noeud papillon' status="success" />
            <Badge value='joyeux' status="success" />
            <Badge value='cheveux noirs' status="success" />
        </Card>
        <Card image={require('../assets/picture-4.jpg')}>
            <Badge value='femme' status="success" />
            <Badge value='66 ans' status="success" />
            <Badge value='collier' status="success" />
            <Badge value='joyeux' status="success" />
            <Badge value='cheveux gris' status="success" />
        </Card>
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




export default GalleryScreen