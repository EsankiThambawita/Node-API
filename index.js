const express = require("express"); // Load Express
const app = express(); // Create the app
const PORT = 3000;

app.use(express.json()); // Middleware to automatically parse incoming JSON data

let users = [
  // This is an array storing users in memory (temporary data storage)
  { id: 1, name: "Elle" },
  { id: 2, name: "Jane" },
];

//API Endpoints

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
