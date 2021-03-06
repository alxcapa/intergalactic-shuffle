require("dotenv").config();

const cookieParser = require("cookie-parser");

const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const app_name = require("./package.json").name;

mongoose
  .connect(process.env.MONGODB_URI || `mongodb://localhost/${app_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS
const cors = require('cors');
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

// Enable authentication using session + passport
app.use(
  session({
    secret: `${app_name}-shhhhhhht`,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
require("./passport")(app);

const index = require("./routes/index");
app.use("/game", index);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

//
// After routes: static server || React SPA
//

app.use(express.static(path.join(__dirname, "client/build")));

// route not-found => could be a React route => render the SPA
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"), function (err) {
    if (err) {
      next(err);
    }
  });
});

// catch 404
// app.use((req, res, next) => {
//   console.log('404')
//   const err = new Error()
//   err.status = 404;

//   next(err);
// });

app.use((err, req, res, next) => {
  function er2JSON(er) {
    // http://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify#18391212
    var o = {};

    Object.getOwnPropertyNames(er).forEach(function (key) {
      o[key] = er[key];
    });

    return o;
  }

  // always log the error
  console.error("ERROR", req.method, req.path, err);

  err = er2JSON(err);
  err.status || (err.status = 500); // default to 500
  res.status(err.status);

  res.json(err);
});

// Serve static files from client/build folder
app.use(express.static('client/build'));

// For any other routes: serve client/build/index.html SPA
app.use((req, res, next) => {
  res.sendFile(`${__dirname}/client/build/index.html`, err => {
    if (err) next(err)
  })
});

module.exports = app;
