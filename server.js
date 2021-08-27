const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-node");
const cors = require("cors");

const database = {
  users: [
    {
      id: "123",
      name: "alex",
      password: "watermelon",
      email: "alex@gmail.com",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "johnathan",
      password: "bananas",
      email: "johnathan@gmail.com",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "johnathan@gmail.com",
    },
  ],
};

const server = express();
server.use(bodyParser.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send(database.users);
});
server.post("/login", (req, res) => {
  //   bcrypt.compare("lemongrass", '$2a$10$ZZOhBVWPcg9V/wawy1/HTuI6OlEA5m9Qy3gnXAhtmUFvF4Z6gfFX2', function(err, result) {
  //     console.log('first guess', result);
  // });
  // bcrypt.compare("bananas", '$2a$10$ZZOhBVWPcg9V/wawy1/HTuI6OlEA5m9Qy3gnXAhtmUFvF4Z6gfFX2', function(err, result) {
  //     console.log('second guess', result);
  // });
  database.users.forEach((user) => {
    if (
      req.body.email === user.email &&
      req.body.password === user.password
    ) {
      res.status(400).json(user);
    } else {
      res.status(400).json("error login in");
    }
  });
    
});

server.post("/register", (req, res) => {
  const { password, email, name } = req.body;
  //   bcrypt.hash(password, null, null, function(err, hash) {
  //     console.log(hash)
  // });
  database.users.push({
    id: "125",
    name: name,
    password: password,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

server.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("no such userID like that.");
  }
});
server.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("no such userID like that.");
  }
});

server.listen(3000);
