require("dotenv").config();
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
  if (!req.body.token) {
    let error = new Error("Token is required");
    error.status = 500;
    next(error);
  }
  const accessTokenUrl = `https://github.com/login/oauth/access_token?client_id=${
    process.env.GITHUB_CLIENT_ID
  }&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${req.body.token}`;
  console.log(accessTokenUrl);
  let response = await axios.post(accessTokenUrl, {
      headers: {
          "Content-Type": "application/json",
        },
    });
      return res.send(response.data);
});
