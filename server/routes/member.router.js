const express = require('express');
const router = express.Router();
const { default: axios } = require('axios');
require('dotenv').config();




router.get('/:id', (req, res) => {
    console.log('find the id in here:', req.params.id);
    axios.get(`https://api.propublica.org/congress/v1/members/${req.params.id}.json`,
    {headers: {
      'X-API-Key': `${process.env.PROPUBLICA_API_KEY}`
    }}
    )
    .then( (response) => {
        console.log( 'Successfully got member data');
        res.send(response.data);
    })
    .catch( (err) => {
        console.log('An error occured while searching for member data:', err);
        res.sendStatus(500);
    })

})

module.exports = router;