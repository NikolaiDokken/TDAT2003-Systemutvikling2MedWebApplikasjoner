let loginButton = document.querySelector("#loginButton");
let getPersonButton = document.querySelector("#getPersonButton");
let localStorage = "";

loginButton.addEventListener("click", e => {
  let url = "/login";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ "brukernavn": document.querySelector("#username").value, "passord": document.querySelector("#password").value })
  })
    .then(response => response.json())
    .then(json => (localStorage = json.jwt))
    .catch(error => console.error("Error: ", error));
});


getPersonButton.addEventListener("click", e => {
  let url = "/api/person";
  fetch(url, {
    method: "GET",
    headers: {
      "x-access-token": localStorage 
    }
  })
    .then(response => response.json())
    .then(json => document.getElementById("personer").innerHTML = (json.name))
    .catch(error => console.error("Error: ", error));
  let url2 = "/token";
  fetch(url2, {
    method: "POST",
    headers: {
      "x-access-token": localStorage
    },
  })
  .then(response => response.json())
  .then(json => (localStorage = json.jwt))
  .catch(error => console.error("Error: ", error));
});