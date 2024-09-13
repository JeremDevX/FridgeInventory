const express = require("express");
const cors = require("cors");

const itemRouter = require("./routes/item");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/items", itemRouter);

module.exports = app;
