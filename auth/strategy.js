const users = require('./users');

function ensureAuthenticated(req, res, next) {
  const cookies = req.cookies;
  const session = cookies.session;
   
  if (!session) {
    res.status(401);
    res.send({ error: 'user is not authenticated' })
  }

  if (!users.isAuthenticated(session)) {
    res.status(403);
    res.send({ error: 'invalid session' })
  }

  return next();
}

module.exports = ensureAuthenticated