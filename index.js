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
//app.get("/api/persons/:id", (request, response) => {
//  const { id } = request.params;
//  const person = persons.find((person) => person.id === Number(id));
//  if (person) {
//    response.json(person);
//  } else {
//    response.status(404).end();
//  }
//});

app.get("/api/persons/:id", (request, response, next) => {
  const { id } = request.params;

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//DELETE A SINGLE RESOURCE

//app.delete("/api/persons/:id", (request, response) => {
//  const { id } = request.params;
//  persons = persons.filter((person) => person.id !== Number(id));
//
//  response.status(204).end();
//});

//With MongoDB

app.delete("/api/persons/:id", (request, response, next) => {
  const { id } = request.params;
  Person.findByIdAndRemove(id)
    .then((result) => {
      if (result) {
        console.log(result);
        response.status(200).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//CREATE A NEW RESOURCE

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "content missing" });
  }
  //if (persons.map((person) => person.name).includes(body.name)) {
  //  return response.status(400).json({ error: "name must be unique" });
  //}

  const person = new Person({
    name: body.name,
    number: String(body.number),
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => response.json(savedAndFormattedPerson))
    .catch((error) => next(error));
});

//Update a single resource

app.put("/api/persons/:id", (request, response, next) => {
  const { id } = request.params;
  const body = request.body;
  const person = {
    number: body.number,
  };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        console.log(updatedPerson);
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//GET INFO
app.get("/info", async (request, response) => {
  const total = await Person.countDocuments({});
  console.log(total);
  response.send(`
  <p>Phonebook has info for ${total} people</p> 
  <p>${new Date()}</p>
  `);
});

//Error handle middleware.
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
