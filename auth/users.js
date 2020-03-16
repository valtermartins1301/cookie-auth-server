const fakeUsers = [{
  username: 'fluba',
    password: '1234'
  },
  {
    username: 'john',
    password: '4567'
  }
]


module.exports = {
  authenticate: function(username, password) {
    console.log(username, password);

    return fakeUsers.find(user => user.username == username && user.password == password)
  },
  
  isAuthenticated: function(session) {
    return session === 'key'
  }
}