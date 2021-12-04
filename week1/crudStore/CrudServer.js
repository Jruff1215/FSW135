const express = require('express');
const app = express();
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/storedb', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the DB")
)
app.get('/', (req, res) => {
    res.send("Successful")
})
app.listen(9000, () => {
    console.log("The App is listening on port 9000.")
});