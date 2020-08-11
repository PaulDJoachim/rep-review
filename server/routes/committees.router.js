const express = require('express');
const router = express.Router();
const { default: axios } = require('axios');
require('dotenv').config();



router.get('/house', (req, res) => {
    axios.get(`https://api.propublica.org/congress/v1/116/house/committees.json`,
    {headers: {
      'X-API-Key': `${process.env.PROPUBLICA_API_KEY}`
    }}
    )
    .then( (response) => {
        console.log( 'Successfully got house committee data');
        res.send(response.data);
    })
    .catch( (err) => {
        console.log('An error occured while getting house committees:', err);
        res.sendStatus(500);
    })
})

router.get('/senate', (req, res) => {
  axios.get(`https://api.propublica.org/congress/v1/116/senate/committees.json`,
  {headers: {
    'X-API-Key': `${process.env.PROPUBLICA_API_KEY}`
  }}
  )
  .then( (response) => {
      console.log( 'Successfully got senate committee data');
      res.send(response.data);
  })
  .catch( (err) => {
      console.log('An error occured while getting senate committees:', err);
      res.sendStatus(500);
  })
})

router.get('/joint', (req, res) => {
  axios.get(`https://api.propublica.org/congress/v1/116/joint/committees.json`,
  {headers: {
    'X-API-Key': `${process.env.PROPUBLICA_API_KEY}`
  }}
  )
  .then( (response) => {
      console.log( 'Successfully got joint committee data');
      res.send(response.data);
  })
  .catch( (err) => {
      console.log('An error occured while getting joint committees:', err);
      res.sendStatus(500);
  })
})

module.exports = router;