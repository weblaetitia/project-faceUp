var express = require('express');
var router = express.Router();

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
    res.json({result: true, message: 'File uploaded!'} )
    console.log('success')     
  } else {
    res.json({result: false, message: resultCopy} );
    console.log('fail')     
  } 
  cloudinary.uploader.upload(path, function(error, result) 
  {
    console.log(result, error)
  })
  
})

module.exports = router;