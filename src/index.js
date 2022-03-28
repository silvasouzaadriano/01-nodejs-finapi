const express = require("express");
const { v4: uuidv4 } = require("uuid"); // v4 generate random number

const app = express();

app.use(express.json());

/**
 * Account fields:
 *  1) id - uuid
 *  2) name - string
 *  3) cpf = string
 *  4) statement - []
 * */ 
const customers = [];

app.post("/account", (request, response) => {
  const id = uuidv4();
  const {cpf, name} = request.body;

  customers.push({
    id,
    name,
    cpf,
    statement: []
  })

  return response.status(201).send()
;});

app.listen(3333);