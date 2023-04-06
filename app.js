const express = require("express");
const fs = require("fs");
const app = express();
//All your code goes here

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
      courses.num.includes(num)
    );
  }

  if (code && num) {
    filteredCourses = filteredCourses.filter(
      (courses) =>
        courses.code.includes(code.toUpperCase()) && course.code.includes(num)
    );
  }

  res.json(filteredCourses);

  res.send(courses);
});

app.get("/account/:id", (req, res) => {
  const fs = require("fs");

  const userData = JSON.parse(fs.readFileSync("users.son", "utf8"));

  console.log(req.params.id);
});

//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = app;

// app.get("/courses", (req, res) => {
//   // Filter by course code prefix
//   let filteredCourses = courses;
//   if (req.query.code) {
//     const codePrefix = req.query.code.toUpperCase();
//     filteredCourses = courses.filter((c) => c.code.startsWith(codePrefix));
//   }

//   // Filter by course number or prefix
//   if (req.query.num) {
//     const numPrefix = req.query.num.toString().slice(0, -2);
//     filteredCourses = filteredCourses.filter((c) =>
//       c.num.toString().startsWith(numPrefix)
//     );
//   }

//   res.json({ courses: filteredCourses });
// });

// app.listen(3000, () => {
//   console.log("Server started on port 3000");
// });

// app.get("/account/:id", (req, res) => {
//   const id = req.params.id;
//   const user = users.find((u) => u.id === id);
//   if (!user) {
//     return res.status(404).json({ error: `User with ID ${id} not found` });
//   }
//   return res.json({
//     user: { username: user.username, courses: user.courses, id: user.id },
//   });
// });

// app.post("/users/login", (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );
//   if (user) {
//     res.json({ userId: user.id });
//   } else {
//     res.status(401).json({ error: "Invalid username or password" });
//   }
// });

// app.post("/users/signup", (req, res) => {
//   const { username, password } = req.body;

//   // Check if username is already in use
//   const userExists = users.some((user) => user.username === username);
//   if (userExists) {
//     return res.status(400).json({ error: "Username already in use" });
//   }

//   // Add new user to database
//   const newUser = {
//     id: uuidv4(),
//     username,
//     password,
//   };
//   users.push(newUser);

//   // Respond with userId
//   res.json({ userId: newUser.id });
// });

// app.patch("/account/:id/courses/add", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const course = req.body;

//   // Check if course object is valid
//   if (!course.code || !course.title || !course.description) {
//     return res.status(400).json({ error: "Invalid course object" });
//   }

//   // Check if user with given ID exists
//   const user = db.users.find((user) => user.id === userId);
//   if (!user) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   // Check if course is already in user's course list
//   const alreadyEnrolled = user.courses.some((c) => c.code === course.code);
//   if (alreadyEnrolled) {
//     return res.status(400).json({ error: "Course already added" });
//   }

//   // Add course to user's course list
//   user.courses.push(course);

//   // Update user data in the database
//   db.users = db.users.map((u) => (u.id === userId ? user : u));

//   // Respond with updated course list
//   res.json(user.courses);
// });

// app.patch("/account/:id/courses/remove", (req, res) => {
//   const userId = req.params.id;
//   const course = req.body;

//   // check if course object exists and has necessary fields
//   if (!course || !course.code || !course.title || !course.description) {
//     return res.status(400).json({ error: "Invalid course object" });
//   }

//   // check if user exists
//   const user = users.find((user) => user.id === userId);
//   if (!user) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   // check if course is in user's course list
//   const courseIndex = user.courses.findIndex((c) => c.code === course.code);
//   if (courseIndex === -1) {
//     return res
//       .status(400)
//       .json({ error: "Course not found in user's course list" });
//   }

//   // remove course from user's course list
//   user.courses.splice(courseIndex, 1);

//   // return updated user object
//   return res.json({ user });
// });
