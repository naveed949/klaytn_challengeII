const {validate} = require('../utils/validator');
const {ethers} = require('ethers');

/**
 * @dev this controller is responsible for verification of given signature as per signer address and signed message.
 * @param req - request object
 * @param res - response object
 * @returns {Promise<void>}
 */
const verify = async (req, res) => {
    try {
        const {message, signature, signer}= validate(req.body);
        const signer2 = ethers.utils.verifyMessage(message, signature);
        if (signer === signer2) {
            res.send({status: true, message: "Verified! Signed by " + signer});
        } else {
            res.send({status: true, message: "Verification failed!"});
        }
    } catch (e) {
        // console.error(e); // logging error on console
        typeof e?.status === "boolean" ? res.status(400).send(e) : res.status(400).send({status: false, message: "something went wrong!"});
    }

}

module.exports = {
    verify
};