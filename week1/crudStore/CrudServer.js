const express = require('express');
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/storedb', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the DB")
)
const inventoryRouter = require("./routes/inventoryRouter.js")
app.use("/inventories", inventoryRouter)

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.Message})
})
app.get('/', (req, res) => {
    res.send("Successful")
})
app.listen(9000, () => {
    console.log("The Server is listening on port 9000.")
});

