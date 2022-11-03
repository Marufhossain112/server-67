const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// get from the server
app.get("/", (req, res) => {
  res.send("I am on the home.");
});

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);

// connect mongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.efpjwcu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const servicesCollection = client
      .db("ServicesCollection")
      .collection("Services");
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = await servicesCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}
run().then((err) => console.error(err));

// listen to the server
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
