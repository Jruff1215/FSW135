const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issueSchema')

issueRouter.get("/", (req, res, next) => {
        Issue.find((err, issues) => {
        if(err){
            console.log("err")
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

issueRouter.get("/user", (req, res, next) => {
    Issue.find({ user: req.user._id},(err, issues) => {
    if(err){
        console.log("err")
        res.status(500)
        return next(err)
    }
    return res.status(200).send(issues)
})
})


issueRouter.get("/:issuesId", (req, res, next) => {
    Issue.findOne({_id: req.params.issuesId}, (err, foundItem) => {
        if(err) {
            console.log("err")
            res.status(500)
            return next(err)
        }
        return res.status(201).send(foundItem)
    })
})

issueRouter.post("/addIssue", (req, res, next) => {
    console.log(req.body)
    req.body.user = req.user._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete({_id: req.params.issueId}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send('Successfully Deleted Item')
    })
})

issueRouter.put("/edit/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate({_id: req.params.issueId},
        req.body, 
        { new: true }, 
        (err, updatedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        })
})

issueRouter.put("/upVote/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate({_id: req.params.issueId},
       { $inc: {
            votes: 1
            }, 
        },
    
        { new: true }, 
        (err, updatedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        })
})

issueRouter.put("/downVote/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate({_id: req.params.issueId},
       { $inc: {
            votes: -1
            }, 
        },
    
        { new: true }, 
        (err, updatedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        })
})



module.exports = issueRouter

