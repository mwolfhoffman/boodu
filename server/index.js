const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
const axios = require("axios");

app.listen(port, () =>
  console.log(`Boodu REST API is listening on port ${port}!`)
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

//  Login
app.post("/api/auth/github-token", async (req, res, next) => {
  let response = await axios.post(accessTokenUrl);
  if (response.ok) {
    let data = await response.json();
    console.log(data);
  } else {
    console.log(response.status);
  }
});
