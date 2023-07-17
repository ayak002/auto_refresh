const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json(); 
const db = require('../config/db');
const axios = require('axios');
const cheerio = require('cheerio');
const Link = "";
const Delay = "";
const CurrentCode = "";
const PreviousCode = "";

const handle_link = (link, next) => {  //fonction qui vérifie si le lien n'est pas vide/faux
    if (link[0].length == 0) {
        console.log("no link inside");
        return res.status(404).json('Empty link');
    } else {
        next();
    }
}

const handle_delay = (delay, next) => {
    if (delay[0].length == 0) {
        console.log("no delay inside");
        return res.status(404).json('Delay link');
    } else {
        next();
    }
}

router.post("/", jsonParser, async (req, res) => { // fonction qui stocke les infos (link/delay) dans la db
    console.log(body);
    const link = req.body.link;
    const delay = req.body.delay;
    console.log(`console dans server : lien = ${link} et deley = ${delay}`);
    try {
        //handle_link(link);
        //handle_delay(delay);
        const [data] = await db.promise().query('INSERT INTO a_refresh (link, delay) VALUES (?, ?)', [
            link,
            delay
        ]);
        Link = link;
        Delay = delay;
        return res.status(200).json(`${link} catched succesfully and refresh in ${delay}`);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');     
    }
});

router.get('/', jsonParser, async (req, res) => { //fonction qui va chercher les infos
    try {
        const link = await db.promise().query('SELECT * FROM a_refresh WHERE link = ?', [Link]); //recuperer/stocker les infos db.sql pour les utiliser
        const delay = await db.promise().query('SELECT * FROM a_refresh WHERE delay = ?', [Delay]);

        if (link[0].length == 0 || delay[0].length == 0) {
            return res.status(404).json('Not found');
        }
        const reponse = await axios.get(link);
        if (CurrentCode) {
            PreviousCode = CurrentCode;
            CurrentCode = response.data;
        } else {
            CurrentCode = response.data;
        }
        if (PreviousCode && (CurrentCode === PreviousCode)) {
            return res.status(852).json("MODIFICATION");
        } else {
            return res.status(853).json("REFRESH");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

router.delete('/', jsonParser, async (req, res) => {
    try {
        const link = await db.promise().query('SELECT * FROM a_refresh WHERE link = ?', [Link]); //récuperer/stocker les infos pour les supprimer
        const delay = await db.promise().query('SELECT * FROM a_refresh WHERE delay = ?', [Delay]);
        
        if (link[0].length == 0 || delay[0].length == 0) {
            return res.status(404).json('Not found');
        }
        const delete_link = await db.promise().query('DELETE from user where id = ?', [link]);
        const delete_delay = await db.promise().query('DELETE from user where id = ?', [delay]);
        if (delete_link && delete_delay) {
            return res.status(200).json("Successfully reset");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

module.exports = (app) => {
    app.use(router);
}