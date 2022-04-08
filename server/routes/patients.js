const express = require("express");
let router = express.Router();
const db = require('../db')


router.route("/")
  .get(async (req, res) => {
    const response = await db('patients').select("*")
    res.send(response)
  })

router.route("/:id")
  .get(async (req, res) => {
    const id = req.params.id
    const response = await db('patients').where({id: id})
    res.send(response)
  })
  
module.exports = router;