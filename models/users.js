const bcrypt = require("bcrypt");

let users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("adminpass", 10),
    role: "admin"
  }
];

function getAllUsers() { return users; }
function findByEmail(email) { return users.find(u => u.email === email); }
function findByUsername(username) { return users.find(u => u.username === username); }
async function createUser(username, email, password) {
  const hashed = await bcrypt.hash(password, 10);
  const newUser = { username, email, password: hashed, role: "user" };
  users.push(newUser);
  return newUser;
}

module.exports = { getAllUsers, findByEmail, findByUsername, createUser };
