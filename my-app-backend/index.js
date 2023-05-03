// setting up express
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3001",
};
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  const password = req.body.pwd;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const matching = await bcrypt.compare(password, hashedPassword);
  console.log(`password entered: ${password}`);
  console.log(`hashed password: ${hashedPassword}`);
  console.log(`matching?: ${matching}`);
});

// creating server
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
