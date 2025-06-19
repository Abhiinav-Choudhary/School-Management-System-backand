const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const port = process.env.port || 8000;

const schoolRoute = require('./routes/school.route.js');
const { connectDB } = require('./connection.js');


connectDB(`mongodb+srv://user:${process.env.password}@cluster1.nku5gq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error:", err));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', schoolRoute);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
