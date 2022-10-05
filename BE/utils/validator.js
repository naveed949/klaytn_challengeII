const { ethers} = require('ethers');

/**
* @dev this validator is responsible for validations of all given requests parameters
 * @param body - the request body containing the request parameters
         * body = { message, signer, signature }
         **** where
         ********** message - the message which is signed
         ********** signer - the account which claims to be the signer
         ********** signature - message signed by signer
 * @returns body - validated parameters of request body
*/
const validate = (body) => {
    // body should have three fields / parameters
    if (Object.keys(body).length !== 3) {
        throw({status: false, message: "Three params required in body!"});
    }
    // signer address should be a valid public key
    if (!isValidSignerAddress(body.signer)) {
        throw({status: false, message: "signer address is invalid!"});
    }
    // message should not be empty or other than of type 'string'
    if (!isValidMessage(body.message)) {
        throw({status: false, message: `message is invalid, should be of type string & non empty`});
    }
    // signature should not be empty or other than of type 'string'
    if (!isValidSignature(body.signature)) {
        throw({status: false, message: `signature is invalid, should be of type string`});
    }
    return body;
}
const isValidSignerAddress = (address) => {
        return ethers.utils.isAddress(address);
}
const isValidMessage = (message) => {
        return  typeof message === 'string' && message.length > 0;
}
const isValidSignature = (signature) => {
        return typeof signature === 'string' && signature.length !==0;
}

module.exports = {
    validate
}