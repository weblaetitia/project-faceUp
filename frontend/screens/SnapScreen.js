import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { Button, Overlay } from 'react-native-elements';
import {connect} from 'react-redux'

// icons
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

function SnapScreen(props) {

  const isFocused = props.navigation.isFocused();
  console.log(isFocused)

    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.on)
    const [images, setImages] = useState([])
    
    // askPermission and store permission status
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })()
    }, [])


    // overlay options
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    }

    // camera options  
    var camera = useRef(null);

    // activer/desactiver flash
    const changeFlash = () => {
        if (flash == Camera.Constants.FlashMode.on) {
            setFlash(Camera.Constants.FlashMode.off)
        } else {
            setFlash(Camera.Constants.FlashMode.on)
        }
    } 

    let flashIcon = 'md-flash-off'
    if (flash) {
        flashIcon = 'md-flash'
    } else {
        flashIcon = 'md-flash-off'
    }
    
    // take picture 
    const takePic = async () => {
      setVisible(true)
      if (camera) {
        console.log('je prends la photo')
        var photo = await camera.takePictureAsync({
          quality : 0.7,
          base64: true,
          exif: true
        })
        // envoyer vers le back
        var data = new FormData();
        data.append('picture', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'my_picture.jpg',
        })
        var rawResponse = await fetch("http://10.2.3.55:3000/upload", {
          method: 'post',
          body: data
        })
        var response = await rawResponse.json()
        console.log('retour du back', response)
        props.addPhotoUrl(response.photoUrl)
        setVisible(false)
      }
    }
    

    // returns
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false || !isFocused) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type} flashMode={flash} ref={ref => (camera = ref)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            
           <View style={styles.iconWrapper}>
                {/* FLIP */}
                <View style={styles.iconBox}>
                    <TouchableOpacity onPress={() => {
                        setType(
                        type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                    }}>
                        <Ionicons name="ios-reverse-camera" size={24} color="white" style={{textAlign: 'center'}}/>
                        <Text style={styles.iconLabel}>Flip</Text>
                    </TouchableOpacity>
                </View>

                {/* FLASH */}
                <View style={styles.iconBox}>
                    <TouchableOpacity onPress={() => changeFlash()}>
                        <Ionicons name={flashIcon} size={24} color="white" style={{textAlign: 'center'}}/>
                        <Text style={styles.iconLabel}>Flash</Text>
                    </TouchableOpacity>
                </View>
           </View>
          </View>
          <Button icon={
                <FontAwesome name="save" size={24} color="white" style={{marginRight: 6}} />
                }
                title='Snap'
                // prendre une photo
                onPress={async () => takePic()}
                />
        </Camera>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text>loading...</Text>
        </Overlay>
      </View>
    )
  }

  const styles = StyleSheet.create({
      iconWrapper: {
        width: (Dimensions.get('window').width) -20,
        position: 'absolute',
        bottom: 15, 
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
      },
      iconBox: {
          width: 100
      },
      iconLabel: {
          fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center'
        }
  })


/* REDUX  */

// add photo url to store
function mapDispatchToProps(dispatch) {
  return {
    addPhotoUrl: function(photoUrl) { 
        dispatch( {type: 'addPhoto', photoUrl: photoUrl} ) 
    }
  }
}

export default connect(
  null, 
  mapDispatchToProps
)(SnapScreen)