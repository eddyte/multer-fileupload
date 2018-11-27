var express = require('express');
const multer = require('multer');
const upload = multer({
  dest: 'tmp/',
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.includes('image/png')) {
      req.fileValidationError = 'goes wrong on the mimetype';
      return cb(null, false, new Error('goes wrong on the mimetype'));
    }
    cb(null, true);
  }
});
const fs = require('fs');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/monupload', upload.array('monfichier', 2), function (req, res, next) {
  // traitement du formulaire
  if (req.fileValidationError) res.end(req.fileValidationError);
  for (f of req.files)
  fs.rename(f.path, 'public/images/' + f.originalname, function (err) {
    if (err) {
      res.send('problème durant le déplacement');
    } else {
      res.send('Fichier uploadé avec succès');
    }
  });
})

module.exports = router;
