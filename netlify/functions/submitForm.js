const { MongoClient } = require("mongodb");

// Replace with your actual MongoDB Atlas connection string
const uri = "mongodb+srv://sriraksha17siva:bHHdyV0Ud1MkZJkC@portfolioform.jyzsjbe.mongodb.net/";
let cachedClient = null;

async function connectToDatabase() {
    if (cachedClient) {
        return cachedClient;
    }
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await client.connect();
    cachedClient = client;
    return client;
}

exports.handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" })
        };
    }

    try {
        const data = JSON.parse(event.body);
        const client = await connectToDatabase();
        const db = client.db("portfolio");
        const collection = db.collection("submissions");

        // Insert the form data into the collection
        const result = await collection.insertOne(data);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Form submitted successfully", result: result })
        };
    } catch (error) {
        console.error("Error inserting document:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error: error.message })
        };
    }
};
