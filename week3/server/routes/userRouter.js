const express = require('express')
const userRouter = express.Router()
const User = require('../models/userSchema')

userRouter.get("/", (req, res, next) => {
        User.find((err, users) => {
        if(err){
            console.log("err")
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users)
    })
})

userRouter.get("/:usersId", (req, res, next) => {
    User.findOne({_id: req.params.usersId}, (err, foundUser) => {
        if(err) {
            console.log("err")
            res.status(500)
            return next(err)
        }
        return res.status(201).send(foundUser)
    })
})

userRouter.post("/", (req, res, next) => {
    console.log(req.body)
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedUser)
    })
})

userRouter.delete("/:UserId", (req, res, next) => {
    User.findOneAndDelete({_id: req.params.userId}, (err, deletedUser) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send('Successfully Deleted Item')
    })
})

userRouter.put("/:UserId", (req, res, next) => {
    User.findOneAndUpdate({_id: req.params.userId},
        req.body, 
        { new: true }, 
        (err, updatedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedUser)
        })
})

module.exports = userRouter

