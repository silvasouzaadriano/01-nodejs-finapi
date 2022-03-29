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
  const {cpf, name} = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({error: "Customer already Exists!"});
  }

  customers.push({
    id: uuidv4(),
    name,
    cpf,
    statement: []
  })

  return response.status(201).send();
});

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({error: "Customer not found"});
  }

  return response.json(customer.statement);

});

app.listen(3333);