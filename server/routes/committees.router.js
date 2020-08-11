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

router.get('/:var', (req, res) => {
  const chamber = req.params.var.slice(4)
  const committeeId = req.params.var.slice(0,4)

  axios.get(`https://api.propublica.org/congress/v1/116/${chamber}/committees/${committeeId}.json`,
  {headers: {
    'X-API-Key': `${process.env.PROPUBLICA_API_KEY}`
  }}
  )
  .then( (response) => {
      console.log( 'Successfully got committee data');
      res.send(response.data);
  })
  .catch( (err) => {
      console.log('An error occured while getting a committee:', err);
      res.sendStatus(500);
  })
})

router.get('/info/:name', (req, res) => {
  axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles=${req.params.name}`)
  .then( (response) => {
      console.log( 'Successfully got bio data');
      res.send(response.data);
  })
  .catch( (err) => {
      console.log('An error occured while searching for bio data:', err);
      res.sendStatus(500);
  })

})


module.exports = router;