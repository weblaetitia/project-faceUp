var express = require('express');
var router = express.Router();

// fs
const fs = require('fs')

// uniqid
var uniqid = require('uniqid');

// dotenv
  require('dotenv').config()

// cloudinary
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: process.env.CLOUDY_NAME, 
  api_key: process.env.CLOUDY_API_KEY, 
  api_secret: process.env.CLOUDY_SECRET_API
})

// axios
'use strict';
const axios = require('axios').default;

// Microsoft Face API 
let subscriptionKey = process.env.FACE_API_1
let endpoint = process.env.FACE_API_POINT + '/face/v1.0/detect'
// Optionally, replace with your own image URL (for example a .jpg or .png URL).
let imageUrl = 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/faces.jpg'



/* test API page. */
router.get('/', function(req, res, next) {
  // Send a POST request
  axios({
    method: 'post',
    url: endpoint,
    params : {
        returnFaceId: true,
        returnFaceLandmarks: false,
        returnFaceAttributes: 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
    },
    data: {
        url: imageUrl,
    },
    headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
  }).then(function (response) {
    console.log('Status text: ' + response.status)
    console.log('Status text: ' + response.statusText)
    console.log()
    //console.log(response.data)
    response.data.forEach((face) => {
      console.log('Face ID: ' + face.faceId)
      console.log('Face rectangle: ' + face.faceRectangle.top + ', ' + face.faceRectangle.left + ', ' + face.faceRectangle.width + ', ' + face.faceRectangle.height)
      console.log('Smile: ' + face.faceAttributes.smile)
      console.log('Head pose: ' + JSON.stringify(face.faceAttributes.headPose))
      console.log('Gender: ' + face.faceAttributes.gender)
      console.log('Age: ' + face.faceAttributes.age)
      console.log('Facial hair: ' + JSON.stringify(face.faceAttributes.facialHair))
      console.log('Glasses: ' + face.faceAttributes.glasses)
      console.log('Smile: ' + face.faceAttributes.smile)
      console.log('Emotion: ' + JSON.stringify(face.faceAttributes.emotion))
      console.log('Blur: ' + JSON.stringify(face.faceAttributes.blur))
      console.log('Exposure: ' + JSON.stringify(face.faceAttributes.exposure))
      console.log('Noise: ' + JSON.stringify(face.faceAttributes.noise))
      console.log('Makeup: ' + JSON.stringify(face.faceAttributes.makeup))
      console.log('Accessories: ' + JSON.stringify(face.faceAttributes.accessories))
      console.log('Hair: ' + JSON.stringify(face.faceAttributes.hair))
      console.log()
    })
  }).catch(function (error) {
    console.log(error)
  })
})




/* POST manage images */
router.post('/upload', async function(req, res, next) {
  console.log(req.files)
  // créer une copie du fichier dans temp avec nom unique
  var path = './temp/'+uniqid()+'.jpg'
  var resultCopy = await req.files.picture.mv(path)
  if(!resultCopy) {
    console.log('success')
    // envoie sur cloudynary
    cloudinary.uploader.upload(path, function(error, result) 
    {
      if (result) {
        // Send a POST request
        axios({
          method: 'post',
          url: endpoint,
          params : {
            returnFaceId: true,
            returnFaceLandmarks: false,
            returnFaceAttributes: 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
          },
          data: {
            url: result.secure_url,
          },
          headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
        }).then(function (response) {
          if (response.data[0]) {
            var attributes = {
              smile: response.data[0].faceAttributes.smile,
              gender: response.data[0].faceAttributes.gender,
              age: response.data[0].faceAttributes.age,
              facialHair: response.data[0].faceAttributes.facialHair,
              glasses: response.data[0].faceAttributes.glasses,
              hair: response.data[0].faceAttributes.hair,
            }
          } else {
            var attributes = 'nobody'
          }
          console.log(attributes)
          // envoie l'url au front
          res.json({photoUrl: result.secure_url, attributes: attributes})
          // supprime la photo du temp
          fs.unlinkSync(path);
          console.log('envoie de la photo ok')
          }).catch(function (error) {
            console.log(error)
          })
      } else {
        res.json({error: result.error})
        console.log('envoie dune erreur')
      }
    }) 
  } else {
    console.log('fail')
    res.json({error: 'copy failed'}) 
  } 
})

module.exports = router;