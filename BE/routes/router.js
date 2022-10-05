const express = require('express');
const verifier = require('../controller/verifier');


const router = express.Router();
// config route with its controller
router.post('/verify', verifier.verify);

module.exports = {
    router
};
