const express = require("express");
const fs = require("fs");
const app = express();
//All your code goes here

app.use(express.json()); //Used to parse JSON bodies

app.use(express.static("public"));

app.get("/courses", (req, res) => {
  const { code, num } = req.query;

  let courses = JSON.parse(
    fs.readFileSync(__dirname + "/database/courses.json")
  );

  let filteredCourses = courses;

  if (code) {
    filteredCourses = filteredCourses.filter((courses) =>
      courses.code.includes(code.toUpperCase())
    );
  }

  if (num) {
    filteredCourses = filteredCourses.filter((courses) =>
      courses.num.startsWith(num)
    );
  }

  if (code && num) {
    filteredCourses = filteredCourses.filter(
      (courses) =>
        courses.code.includes(code.toUpperCase()) && courses.num.startsWith(num)
    );
  }

  res.status(200);

  res.send(filteredCourses);
});

app.get("/account/:id", (req, res) => {
  const id = req.params.id;

  let userData = loadUsers();

  console.log(req.params.id);

  const user = userData.find((u) => u.id == id);
  console.log(user);
  if (!user) {
    return res.status(404).json({ error: `User with ID ${id} not found` });
  } else {
    res.send({
      user: { username: user.username, courses: user.courses, id: user.id },
    });
  }
});

app.post("/users/login", (req, res) => {
  let users = loadUsers();

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == req.body.username) {
      if (users[i].password == req.body.password) {
        res.json({ userId: users[i].id });
        return;
      } else {
        res.statusCode = 401;
        res.json({ userId: null, error: "wrong password" });
        return;
      }
    }
  }

  res.statusCode = 404;
  res.json({ userId: null, error: "account doesn't exist" });
});

app.post("/users/signup", (req, res) => {
  let users = loadUsers();

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == req.body.username) {
      res.statusCode = 409;
      res.json({ userId: null, error: "username unavailable" });
      return;
    }
  }

  let newUser = {
    username: req.body.username,
    password: req.body.password,
    id: users.length + 1,
  };
  users.push(newUser);

  writeUsers(users);
  res.statusCode = 201;
  res.json({ userId: newUser.id });
});

app.patch("/account/:id/courses/add", (req, res) => {
  let users = loadUsers();
  const userId = parseInt(req.params.id);
  const course = req.body;

  // Check if course object is valid
  if (!course.code || !course.title || !course.description) {
    res.status(400).json({ error: "Invalid course object" });
  }

  // Check if user with given ID exists
  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.statusCode = 401;
    res.json({ error: "User not found" });
    return;
  }

  // Check if course is already in user's course list
  const alreadyEnrolled = users.courses.some((c) => c.code === course.code);
  if (alreadyEnrolled) {
    res.statusCode = 409;
    res.json({ error: "Course already added" });
    return;
  }

  // Add course to user's course list
  user.courses.push(course);

  // Update user data in the database
  users = users.map((u) => (u.id === userId ? user : u));

  // Respond with updated course list
  res.json(user.courses);
  res.statusCode = 201;
});

app.patch("/account/:id/courses/remove", (req, res) => {
  let users = loadUsers();
  const userId = req.params.id;
  const course = req.body;

  // check if course object exists and has necessary fields
  if (!course || !course.code || !course.title || !course.description) {
    return res.status(400).json({ error: "Invalid course object" });
  }

  // check if user exists
  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.statusCode = 401;
    res.json({ error: "User not found" });
    return;
  }

  // check if course is in user's course list
  const courseIndex = user.courses.findIndex((c) => c.code === course.code);
  if (courseIndex === -1) {
    return res
      .status(400)
      .json({ error: "Course not found in user's course list" });
  }

  // remove course from user's course list
  user.courses.splice(courseIndex, 1);

  // return updated user object
  return res.json({ user });
});

function loadUsers() {
  return JSON.parse(fs.readFileSync("./database/users.json").toString());
}

function writeUsers(newData) {
  fs.writeFileSync("./database/users.json", JSON.stringify(newData));
}

//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports

module.exports = app;
