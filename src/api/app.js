const express = require('express');
require('dotenv').config();

const app = express();

/*
  Material consultado sobre bodyParser.json vs bodyParser.urlencoded
  https://stackoverflow.com/questions/55558402/what-is-the-meaning-of-bodyparser-urlencoded-extended-true-and-bodypar
*/
// app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

/* Todas as rotas com /users/<alguma-coisa> entram aqui e vão para o roteador */
// app.use('/users', userRouter);

module.exports = app;