const express = require("express");
const app = express();
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/moviesdb', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the DB")
)

app.get('/', (req, res) => {
    res.send("Good Morning, Dave.");
});

app.listen(3000, () => {
    console.log("The App is listening on port 3000.")
});