const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

dotenv.config({
  path: path.join(__dirname, "config", ".env"),
});

const app = require("./app");
const server = http.createServer(app);

// CORS yapılandırması
app.use(cors());

const port = process.env.PORT || 5000;
const version = process.env.NODE_ENV;
const mongo_uri = process.env.MONGO_URI;

mongoose.set("strictQuery", true);

mongoose.connect(mongo_uri, {}, (err) => {
  if (err) throw err;
  server.listen(port, () =>
    console.log(`Api start on port: ${port} -- version: ${version}`)
  );
});
