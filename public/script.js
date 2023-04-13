async function login() {
  let body = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  let config = {
    method: "POST",
    url: "/users/login",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response = await fetch("/users/login", config);

  let data = await response.json();
  if (data.userId) {
    localStorage.setItem("userId", data.userId);
  }
  window.location.href = "/account.html";
}

async function signup() {
  let body = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  let config = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response = await fetch("/users/signup", config);
  let data = await response.json();
  if (data.userId) {
    localStorage.setItem("userId", data.userId);
  }
}

async function loadCourses() {
  let code = document.getElementById("filter-code").value;
  let num = document.getElementById("filter-num").value;
  let response = await fetch(
    `/courses?${code ? `code=${code}` : ""}${num ? `&num=${num}` : ""}`
  );
  let data = await response.json();
  console.log(data);

  const courseList = document.getElementById("courses-list");
  courseList.innerHTML = "";
  data.forEach((course) => {
    // Create course list item
    const li = document.createElement("li");
    li.textContent = `${course.code} ${course.num}: ${course.name} - ${course.description}`;
    courseList.appendChild(li);
  });
}
