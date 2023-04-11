async function login() {
  let body = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  let config = {
    method: "POST",
    URL: "/users/login",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response = await fetch("/login", config);
  let data = await response.json();
  console.log(data);
  if (data.userId) {
    localStorage.setItem("userId", data.userId);
  }
}
