var tesseract = require("tesseract.js");
var jimp = require("jimp");
var multer = require("multer")
var express = require("express");

var router = express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage }).single('file')
var currentFile = null;

router.use(express.json())

router.get("/scrape", function (req, res, next) {
  tesseract.recognize(currentFile)
    .catch(err => {
      console.error(err)
    })
    .then(result => {
      // Get Confidence score
      let confidence = result.data.confidence

      // Get full output
      let text = result.data.text

      res.json({ scrapeConfidence: confidence, scrapeText: text });
    })
});

router.get("/clean", function (req, res, next) {
    jimp.read(uploads[i]).then(image => {
      image
        .color([{ apply: 'desaturate', params: [90] }])
        .contrast(1)
        .getBase64(Jimp.AUTO, (err, res) => {
          res.json({ 
            cleanStatus: "success",
            cleanResult: res
           });
        });
    })
      .catch(function (err) {
        console.error(err);
      });
});

router.get("/convert", function (req, res, next) {

});

router.post('/upload', upload, (req, res) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }

  var fileUrl = file.path.replace('public', req.protocol + '://' + req.get('host'))
  currentFile = fileUrl

  res.send({ "file": file, "fileUrl": fileUrl });
})



module.exports = router;