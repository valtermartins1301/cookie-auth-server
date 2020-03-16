const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../auth/strategy')
const users = require('../auth/users')

router.get('/', ensureAuthenticated, function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  const { username, password } = req.body

  if(!users.authenticate(username, password)) {
    res.status(412);
    return res.send({ error: 'invalid user or password'})
  }

  res.cookie('session', 'key', { httpOnly: true });
  res.send({ status: 'ok' });
});


module.exports = router;
