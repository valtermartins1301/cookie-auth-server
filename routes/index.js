const express = require('express');
const ensureAuthenticated = require('../auth/strategy')

const router = express.Router();

router.get('/', ensureAuthenticated, function(_, res) {
  res.send('The cake is a lie');
});

module.exports = router;
