// setting up express
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3010",
};
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const mongoCollections = require("./config/mongoCollections");
const { ObjectId } = require("mongodb");
const users = mongoCollections.users;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  // password encryption
  const username = req.body.user;
  const password = req.body.pwd;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const matching = await bcrypt.compare(password, hashedPassword);

  // check if username already exists in the database
  const usersCollection = await users();
  let userNameCase = new RegExp(["^", username, "$"].join(""), "i");
  const user = await usersCollection.findOne({ username: userNameCase });
  if (user != null) {
    return res.status(409).json({ error: "Username already exists" });
  }

  // saving {username, hashedPassword} to database
  let newUser = {
    username: username,
    password: hashedPassword,
  };
  const insertInfo = await usersCollection.insertOne(newUser);
  if (insertInfo.insertedCount === 0) {
    return res.status(500).json({ error: "Could not add user" });
  }

  // output to frontend
  // console.log(`password entered: ${password}`);
  // console.log(`hashed password: ${hashedPassword}`);
  // console.log(`matching?: ${matching}`);
  res.json({ username, hashedPassword });
});

app.post("/login", async (req, res) => {
  // console.log("login route");
  const username = req.body.user;
  const password = req.body.pwd;

  // grab user from database and compare passwords
  const usersCollectionDB = await users();
  const userDB = await usersCollectionDB.findOne({ username: username });
  if (userDB === null) {
    return res.status(500).json({ error: "User not found" });
  }
  // console.log(userDB.password);
  matching = await bcrypt.compare(password, userDB.password);
  if (!matching) {
    return res.status(500).json({ error: "Incorrect password" });
  }

  // output to frontend
  res.json({ username });
});

// creating server
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
