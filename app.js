const express = require("express");
const app = express();
const port = 3000;

const qburl = "https://api.quickbase.com/v1/";

const musicappid = process.env.MUSIC_APP;

var headers = {
  "QB-Realm-Hostname": process.env.REALM_NAME,
  Authorization: process.env.QB_TOKEN,
  "Content-Type": "application/json",
};

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/users", (req, res) => {
  res.send("List of users");
});

app.get("/users/:id", (req, res) => {
  // Handle user details based on ID
  const userId = req.params.id;
  res.send(`User details for ID ${userId}`);
});

app.get("/validateApp/:appID", (req, res) => {
  // Handle user details based on ID
  const appId = req.params.appid;
  fetch("https://api.quickbase.com/v1/apps/" + musicappid, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (response.ok) {
        // return response.json().then((response) => console.log(response));
        console.log("This is a real App");
      }
      return response
        .json()
        .then((resBody) =>
          Promise.reject({ status: response.status, ...resBody })
        );
    })
    .catch((err) => console.log(err));
});

// fetch("https://api.quickbase.com/v1/apps/", {
//   method: "GET",
//   headers: headers,
// })
//   .then((response) => {
//     if (response.ok) {
//       return response.json().then((response) => console.log(response));
//     }
//     return response
//       .json()
//       .then((resBody) =>
//         Promise.reject({ status: response.status, ...resBody })
//       );
//   })
//   .catch((err) => console.log(err));
