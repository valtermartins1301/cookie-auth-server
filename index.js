'use strict';

const Bcrypt = require('bcrypt');
const Hapi = require('@hapi/hapi');

const users = [
  {
    username: 'john',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
    name: 'John Doe',
    id: '2133d32a'
  }
];

const CORS = {
  origin: ['http://localhost:3000', 'https://cookie-auth-app-login.netlify.com', 'https://cookie-auth-app-login.netlify.com']
};

const start = async () => {
  const server = Hapi.server();

  await server.register(require('@hapi/cookie'));

  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'sid-example',
      password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
      isSecure: false
    },
    validateFunc: async (request, session) => {

      const account = await users.find(
        (user) => (user.id === session.id)
      );

      if (!account) {
        return { valid: false };
      }

      return { valid: true, credentials: account };
    }
  });

  server.auth.default('session');

  server.route([
    {
      method: 'GET',
      path: '/',
      options: {
        cors: CORS,
      },
      handler: function (request, h) {

        return { message: 'Welcome to the restricted home page!' };
      }
    },
    {
      method: 'POST',
      path: '/login',
      options: {
        cors: CORS,
      },
      handler: async (request, h) => {

        const { username, password } = request.payload;
        const account = users.find(
          (user) => user.username === username
        );

        if (!account || !(await Bcrypt.compare(password, account.password))) {

          return h.view('/login');
        }

        request.cookieAuth.set({ id: account.id });

        return h.redirect('/');
      },
      options: {
        auth: {
          mode: 'try'
        }
      }
    }
  ]);

  await server.start();

  console.log('server running at: ' + server.info.uri);
};

start();
