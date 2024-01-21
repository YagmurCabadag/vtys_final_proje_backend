const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { indexRouter } = require("./routes/index.router");

const mongo_uri = process.env.MONGO_URI;

const store = new MongoDBStore({
  uri: mongo_uri,
  collection: "sessions",
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

const sessionMiddleware = session({
  secret: fs
    .readFileSync(path.join(__dirname, "config", "SecretKey.txt"))
    .toString(),
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
});

app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);

module.exports = app;
module.exports.sessionMiddleware = sessionMiddleware;
