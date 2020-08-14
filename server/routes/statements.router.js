const express = require('express');
const router = express.Router();
const { default: axios } = require('axios');
require('dotenv').config();


router.get('/recent/:date', (req, res) => {
  console.log('this is the date on the server:', req.params.date)
  axios.get(`https://api.propublica.org/congress/v1/statements/date/${req.params.date}.json`,
  {headers: {
    'X-API-Key': `${process.env.PROPUBLICA_API_KEY}`
  }}
  )
  .then( (response) => {
      console.log( 'Successfully got statements for today');
      res.send(response.data);
  })
  .catch( (err) => {
      console.log('An error occured while getting statements for today:', err);
      res.sendStatus(500);
  })
})


module.exports = router;