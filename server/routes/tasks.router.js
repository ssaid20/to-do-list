const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET
router.get("/", (req, res) => {
    const queryText = `SELECT * FROM "Tasks" ORDER BY "id" ASC;`;
    pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("Error in GET request", err);
      res.sendStatus(500);
    });
});

// POST
router.post("/", (req, res) => {
    let newTask = req.body;
    let queryText = `INSERT INTO "Tasks" ("description") VALUES ($1);`;
    pool
    .query(queryText, [newTask.description])
    .then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log("Error in POST request", error);
        res.sendStatus(500);
    })
});



module.exports = router;
