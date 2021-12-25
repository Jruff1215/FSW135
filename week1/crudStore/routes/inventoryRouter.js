const express = require('express')
const inventory = require('../models/inventory.js')
const inventoryRouter = express.Router()
const Inventory = require('../models/inventory.js')

inventoryRouter.get("/", (req, res, next) => {
        Inventory.find((err, inventories) => {
        if(err){
            console.log("err")
            res.status(500)
            return next(err)
        }
        return res.status(200).send(inventories)
    })
})

inventoryRouter.get("/:inventoryId", (req, res, next) => {
    Inventory.findOne({_id: req.params.inventoryId}, (err, foundItem) => {
        if(err) {
            console.log("err")
            res.status(500)
            return next(err)
        }
        return res.status(201).send(foundItem)
    })
})

inventoryRouter.post("/", (req, res, next) => {
    console.log(req.body)
    const newInventory = new Inventory(req.body)
    newInventory.save((err, savedInventory) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedInventory)
    })
})

inventoryRouter.delete("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndDelete({_id: req.params.inventoryId}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send('Successfully Deleted Item')
    })
})

inventoryRouter.put("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndUpdate({_id: req.params.inventoryId},
        req.body, 
        { new: true }, 
        (err, updatedItem) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedItem)
        })
})

module.exports = inventoryRouter
