const express = require("express");
const cors = require("cors");
const router = require("./indexRoute/indexRoute")

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use('/', router);

// High level error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.statusCode = 404;
  next(error);
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const name = err.name || 'Error';
  res
    .status(statusCode)
    .json({ name, message: err.message });
});
module.exports = app;