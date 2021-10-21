const express = require('express');
const bodyParser = require('body-parser');
const { userRouter } = require('../routers/userRouter');
const { loginRouter } = require('../routers/loginRouter');

const app = express();

/*
  Material consultado sobre bodyParser.json vs bodyParser.urlencoded
  https://stackoverflow.com/questions/55558402/what-is-the-meaning-of-bodyparser-urlencoded-extended-true-and-bodypar
*/
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

/* Todas as rotas com /user/<alguma-coisa> entram aqui e vão para o roteador */
app.use('/user', userRouter);

/* Todas as rotas com /login/<alguma-coisa> entram aqui e vão para o roteador */
app.use('/login', loginRouter);

module.exports = app;