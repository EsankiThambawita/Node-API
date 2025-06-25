// index.js
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // to parse JSON request bodies

// Sample in-memory data
let users = [
  { id: 1, name: "Esanki" },
  { id: 2, name: "Lakvindee" },
];

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET a single user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

// POST create a new user
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update a user
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  user.name = req.body.name;
  res.json(user);
});

// DELETE a user
app.delete("/users/:id", (req, res) => {
  users = users.filter((u) => u.id !== parseInt(req.params.id));
  res.send("User deleted");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
