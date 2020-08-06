const express = require('express');
const router = express.Router();
const { default: axios } = require('axios');
require('dotenv').config();


router.get('/:name', (req, res) => {
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