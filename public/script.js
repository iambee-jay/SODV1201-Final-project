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