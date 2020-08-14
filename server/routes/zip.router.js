const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const { default: axios } = require('axios');
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

router.get('/:zip', rejectUnauthenticated, (req, res) => {
  const zip = req.params.zip;
  axios.get(`http://whoismyrepresentative.com/getall_mems.php?zip=${zip}&output=json`)
  .then( (response) => {
      console.log( 'Successfully got district');
      res.send(response.data);
  })
  .catch( (err) => {
      console.log('An error occured while getting district:', err);
      res.sendStatus(500);
  })
})



module.exports = router;