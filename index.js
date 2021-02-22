require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;

const Person = require("./models/person");

//let persons = [
//  {
//    name: "Arto Hellas",
//    number: "040-123456",
//    id: 1,
//  },
//  {
//    name: "Ada Lovelace",
//    number: "39-44-5323523",
//    id: 2,
//  },
//  {
//    name: "Dan Abramov",
//    number: "12-43-234345",
//    id: 3,
//  },
//  {
//    name: "Mary Poppendieck",
//    number: "39-23-6423122",
//    id: 4,
//  },
//];

function generateId() {
  return Math.floor(Math.random() * 10000000);
}
//Create new morgan token
morgan.token("data", function (req, res) {
  if (req.body && req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
app.use(express.static("build"));

//GET ALL PERSONS
//app.get("/api/persons", (request, response) => {
//  console.log("GET persons");
//  response.json(persons);
//});

//With MongoDB

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
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

//CREATE A NEW RESOURCE

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "content missing" });
  } else if (persons.map((person) => person.name).includes(body.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    name: body.name,
    number: String(body.number),
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

//GET INFO
app.get("/info", (request, response) => {
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p> 
  <p>${new Date()}</p>
  `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
