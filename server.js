const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const axios = require("axios");

const app = express();

global.__basedir = __dirname;

var corsOptions = {
  // origin: "http://localhost:8081"
  origin: "*",
};

app.use(cors(corsOptions));
// app.use(requestIp.mw());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));


// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

// simple route
// app.get("/", (req, res) => {
//   var ip =
//     req.headers["x-forwarded-for"] ||
//     req.connection.remoteAddress ||
//     req.socket.remoteAddress ||
//     req.connection.socket.remoteAddress;
//   // let ip = req.clientIp;
//   res.json({ message: "Welcome to vanharte application.", ip: ip });
// });

app.post("/api/wefact_api", (req, res) => {
  const url = "https://api.mijnwefact.nl/v2/";
  const body = {
    api_key: process.env.WEFACT_API_KEY,
    controller: "debtor",
    action: "list",
  };

  try {
    axios.post(url, body).then((response) => {
      // console.log("respose", body);
      // console.log(response.data);
      res.send(response.data);
      // res.send(JSON.stringify(response.data));
    });
  } catch (error) {
    console.log(error);
  }
});

require("./app/routes/user.routes")(app);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
