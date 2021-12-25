const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/commentSchema')

commentRouter.get("/", (req, res, next) => {
        Comment.find((err, comments) => {
        if(err){
            console.log("err")
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

commentRouter.get("/:commentsId", (req, res, next) => {
    Comment.findOne({_id: req.params.commentsId}, (err, foundComment) => {
        if(err) {
            console.log("err")
            res.status(500)
            return next(err)
        }
        return res.status(201).send(foundComment)
    })
})

commentRouter.post("/", (req, res, next) => {
    console.log(req.body)
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

commentRouter.delete("/:commentId", (req, res, next) => {
    comment.findOneAndDelete({_id: req.params.commentId}, (err, deletedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send('Successfully Deleted Item')
    })
})

commentRouter.put("/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate({_id: req.params.commentId},
        req.body, 
        { new: true }, 
        (err, updatedComment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        })
})

module.exports = commentRouter

