const express = require('express');
const app = express();
const port = 8000;

const schoolRoute = require('./routes/school.route.js');
const { connectDB } = require('./connection.js');


connectDB('mongodb://127.0.0.1:27017/schoolDB')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error:", err));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', schoolRoute);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
