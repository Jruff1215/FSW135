const express = require('express');
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('dev'))

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/votedb');
  console.log("Connected to the DB")
}

const userRouter = require("./routes/userRouter.js")
app.use("/users", userRouter)

const issuesRouter = require("./routes/issueRouter.js")
app.use("/issues", issuesRouter)

const commentsRouter = require("./routes/commentRouter.js")
app.use("/comments", commentsRouter)


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

