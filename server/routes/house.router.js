const express = require('express');
const router = express.Router();
const { default: axios } = require('axios');
require('dotenv').config();




router.get('/', (req, res) => {
    axios.get(`https://api.propublica.org/congress/v1/116/house/members.json`,
    {headers: {
      'X-API-Key': `${process.env.PROPUBLICA_API_KEY}`
    }}
    )
    .then( (response) => {
        console.log( 'Successfully got search results');
        res.send(response.data);
    })
    .catch( (err) => {
        console.log('An error occured while searching for a state reps:', err);
        res.sendStatus(500);
    })

})

module.exports = router;