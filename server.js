const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-node");
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
  ssl: true,
  },
});

// console.log(db.select('*').from('users'));

const server = express();
server.use(bodyParser.json());
server.use(cors());

// server.get("/", (req, res) => {
// });
server.get("/", (req,res)=> res.send("it is working"));
server.post("/login", login.handleLogin(db, bcrypt));
server.post("/register",(req, res)=>{ register.handleRegister(req, res, db, bcrypt)});
server.get("/profile/:id", (req, res)=>{profile.handleProfile(req, res, db)});
server.put("/image", (req, res)=>{ image.handleImage(req, res, db)});
server.post("/imageUrl", (req, res)=>{ image.handleClarifai(req, res)});

server.listen(process.env.PORT || 3000, () => {
  console.log('app is using at port ${process.env.PORT}');
});
