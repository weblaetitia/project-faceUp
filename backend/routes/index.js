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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Picture APP' });
});

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
      console.log(result, error)
      if (result) {
        // envoie l'url au front
        res.json({photoUrl: result.secure_url})
        // supprime la photo du temp
        fs.unlinkSync(path);
        console.log('envoie de la photo ok')
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