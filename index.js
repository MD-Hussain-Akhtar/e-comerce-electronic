const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017"; 
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB ✅");

    const db = client.db("myDatabase");
    const collection = db.collection("users");

    // insert data
    await collection.insertOne({ name: "hussain", age: 20 });

    console.log("Data inserted ✔️");

    // 📊 count documents
    const count = await collection.countDocuments();
    console.log("Total entries:", count);

    // 📄 get all data
    const data = await collection.find().toArray();
    console.log("All Data:", data);

  } finally {
    await client.close();
  }
}

run();