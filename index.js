const { request, response } = require("express");
const express = require("express");
const app = express();

const PORT = 3001;

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Dionisio",
    number: "39-23-6423122",
    id: 5,
  },
];

//GET ALL PERSONS
app.get("/api/persons", (request, response) => {
  console.log("GET persons");
  response.json(persons);
});

//GET A SINGLE PERSON
app.get("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  const person = persons.find((person) => person.id === Number(id));
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

//DELETE A SINGLE RESOURCE
app.delete("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  persons = persons.filter((person) => person.id !== Number(id));

  response.status(204).end();
});

app.get("/info", (request, response) => {
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p> 
  <p>${new Date()}</p>
  `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
