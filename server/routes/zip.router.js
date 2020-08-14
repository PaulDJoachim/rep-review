const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



router.put('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body.zip)
  const queryText = `
    UPDATE "user"
    SET zip = $1
    WHERE id = $2; `
  const values = [req.body.zip, req.user.id]
  pool.query(queryText, values)
  .then( (response) => {
      console.log( 'Successfully added zip code to database');
      res.send(response.data);
  })
  .catch( (err) => {
      console.log('An error occured while adding zip code:', err);
      res.sendStatus(500);
  })
})


module.exports = router;