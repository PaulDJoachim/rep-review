const express = require('express');
const router = express.Router();
const { default: axios } = require('axios');
require('dotenv').config();


router.get('/recent', (req, res) => {
    axios.get(`https://api.propublica.org/congress/v1/116/both/bills/introduced.json`,
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