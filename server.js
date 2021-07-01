// creating the express app
const exp = require("express");
const app = exp();
const mongoClient = require("mongodb").MongoClient;
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
/*
Connect frontend and backend
*/
app.use(exp.static(path.join(__dirname, "dist/happy-supermarket")));

// to parse body of req object
app.use(exp.json());

// connect to MongoDB ATLAS
const dbUrl = process.env.dbUrl;
let dbObj;
mongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log("Error while connecting to MongoDB ATLAS server: " + err.message);
    }
    else {
        console.log("Connected to MongoDB ATLAS server");
        dbObj = client.db("supermarketDB");
        app.set("dbObj", dbObj);
    }
});

const employeeApiRoute = require("./APIs/employeeApi");
const productApiRoute = require("./APIs/productApi");

app.use("/employee", employeeApiRoute);
app.use("/product", productApiRoute);

// handling invalid routes
app.use((req, res, next) => {
    res.send({ message: `The path: ${req.url} is invalid` });
    next();
});



// setting a port for the server
const port = 4000;
app.listen(port, () => {
    console.log("Server listening on port " + port);
});