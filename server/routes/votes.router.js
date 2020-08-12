const express = require('express');
const router = express.Router();
const { default: axios } = require('axios');
require('dotenv').config();


router.get('/recent', (req, res) => {
  axios.get(`https://api.propublica.org/congress/v1/both/votes/recent.json`,
  {headers: {
    'X-API-Key': `${process.env.PROPUBLICA_API_KEY}`
  }}
  )
  .then( (response) => {
      console.log( 'Successfully got recent votes');
      res.send(response.data);
  })
  .catch( (err) => {
      console.log('An error occured while getting recent votes:', err);
      res.sendStatus(500);
  })
})


router.get('/info/house/:billId', (req, res) => {
  const session = req.params.billId[0];
  const billId = req.params.billId.slice(1);
  axios.get(`https://api.propublica.org/congress/v1/116/house/sessions/${session}/votes/${billId}.json`,
  {headers: {
    'X-API-Key': `${process.env.PROPUBLICA_API_KEY}`
  }}
  )
  .then( (response) => {
      console.log( 'Successfully got recent bills');
      res.send(response.data);
  })
  .catch( (err) => {
      console.log('An error occured while getting recent bills:', err);
      res.sendStatus(500);
  })
})


router.get('/info/senate/:billId', (req, res) => {
  const session = req.params.billId[0];
  const billId = req.params.billId.slice(1);
  axios.get(`https://api.propublica.org/congress/v1/116/senate/sessions/${session}/votes/${billId}.json`,
  {headers: {
    'X-API-Key': `${process.env.PROPUBLICA_API_KEY}`
  }}
  )
  .then( (response) => {
      console.log( 'Successfully got recent bills');
      res.send(response.data);
  })
  .catch( (err) => {
      console.log('An error occured while getting recent bills:', err);
      res.sendStatus(500);
  })
})



module.exports = router;