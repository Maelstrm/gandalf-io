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
        const getAll = `SELECT "item".*,  "person"."username" 
                   FROM "item" JOIN "person" 
                   ON "person"."id" = "item"."person_id";`;
        pool.query(getAll).then((results) => {
            res.send(results.rows);
        }).catch((error) =>  {
            console.log('error getting all items from item table', error);
            res.sendStatus(500);
        });
    }
    else{
        res.sendStatus(403);
    }
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {

});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {

});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

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