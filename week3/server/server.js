const express = require('express');
const app = express();
require('dotenv').config({ path: './routes/.env' });
const mongoose = require('mongoose');
const morgan = require('morgan');
const expressJwt = require('express-jwt');
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(morgan('dev'))

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/votedb');
  console.log("Connected to the DB")
}
app.get('/test',(req, res, next) => {
        return res.status(201).send('foundItem')
    })
const authRouter = require("./routes/authRouter")
app.use('/auth', authRouter)
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256']}))

const userRouter = require("./routes/userRouter.js")
app.use("/api/users", userRouter)

const issuesRouter = require("./routes/issueRouter.js")
app.use("/api/issues", issuesRouter)

const commentsRouter = require("./routes/commentRouter.js")
app.use("/api/comments", commentsRouter)


app.use((err, req, res, next) => {
    console.log(err, err.name)
    if(err.name === "Unauthorized Error"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})
app.get('/', (req, res) => {
    res.send("Successful")
})
app.listen(9000, () => {
    console.log("The Server is listening on port 9000.")
});

