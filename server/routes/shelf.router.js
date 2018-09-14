const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
//route to get all items from item table
router.get('/', (req, res) => {
    //make sure user is logged in to view shelf
    if(req.isAuthenticated()) {
        // "item".* gets all from item table   
        // and the query only grabs username from person table
        const getAll = `SELECT "item".*,  "person"."username" 
                   FROM "item" JOIN "person" 
                   ON "person"."id" = "item"."person_id";`;
        pool.query(getAll).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('error in GET route', error);
            res.sendStatus(500);
        });
    }
    else {
        res.sendStatus(403);
    }
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        const shelfItem = req.body;
        console.log('item to add',shelfItem);
        const query = `INSERT INTO "item" ("person_id", "description","image_url") 
                       VALUES ($1,$2, $3);`;
        pool.query(query, [req.user.id, shelfItem.description, shelfItem.image_url])
            .then((results) => {
                res.send(results.rows);
            }).catch((error) => {
                console.log('error in POST route', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
    if(req.isAuthenticated()) {
        const itemToDelete = req.params.id;
        console.log('delete request', itemToDelete);
        const deleteQuery = `DELETE FROM "item" WHERE "id" = $1;`;
        pool.query(deleteQuery, [itemToDelete])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in DELETE route',error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
    if(req.isAuthenticated()) {
        const idToEdit = req.params.id;
        const editBody = req.body;
        console.log('editing:', idToEdit, editBody);
        const editQuery = `UPDATE "item" SET "description" = $1 WHERE id = $2;`;
        pool.query(editQuery, [idToEdit, editBody.description])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in PUT route', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;