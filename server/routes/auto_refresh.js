const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json(); 

router.post("/", async (req, res) => {
    const link = req.body.link;
    const delay = req.body.delay;

    if (!link) {
        console.log("no link inside");
        return res.status(404).json('Empty link');
    } else {

    }
});