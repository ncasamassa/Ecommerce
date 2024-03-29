const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const objectId = mongodb.ObjectId;

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

const DB_URL = process.env.DB_URL;
const DB_NAME = "Ecommerce";

MongoClient.connect(DB_URL).then((client) => {
  console.log("Connected to database");

  const db = client.db(DB_NAME);
  const productsCollection = db.collection("products");

  server.get("/", (req, res) => {
    res.send("welcome");
  })

  server.get("/api/get-products", (req, res) => {
    productsCollection
      .find()
      .toArray()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error("Error getting products:", error);
        res.status(500).send("Internal Server Error");
      });
  });

  const PORT = 3003;
  server.listen(PORT, () => {
    console.log("Server is listening on port:", PORT);
  });
});

module.exports = server