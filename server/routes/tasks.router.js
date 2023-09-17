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
// PUT
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const isComplete = req.body.is_complete;
    const queryText = `UPDATE "Tasks" SET "is_complete" = $1 WHERE "id" = $2;`;
    pool
    .query(queryText, [isComplete, id])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log("Error in UPDATING Tasks table", err);
      res.sendStatus(500);
    });
  });
  
  // DELETE
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const queryText = `DELETE FROM "Tasks" WHERE "id" = $1;`;
    pool
    .query(queryText, [id])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log("Error in DELETING from Tasks table", err);
      res.sendStatus(500);
    });
  });



module.exports = router;
