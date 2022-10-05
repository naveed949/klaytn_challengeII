const request = require('supertest');
httpStatus = require('http-status');
const app = require('../app');
const { expect  } = require('chai')

describe('POST /verify route', () => {
    let body;
    beforeEach(() => {
        body = {
            message: "iamnaveediqbal",
            signer: "0xd8984366805fEe9ccc68a7802fFb9250c415b2C5",
            signature: "0xb22529a11a9b11cf05fc91382a6cfa22db4a0c79aac02f25a4dcd136dbfcd2d128496e8ae2764dc39bf49d6fd0f5c6bfad5f915da53806956f5a00c5f4308caf1c"
        };
    });
    describe('Validations', () => {
       it('should return error if given parameters are !== 3', async () => {
           delete body.message;
           const res = await request(app).post('/verify').send(body);
           expect(res.statusCode).to.equal(400);
           expect(res.body.status).to.equal(false);
           expect(res.body.message).to.equal("Three params required in body!");
       })
        it('should return \'signer address is invalid!\' if singer\'s address is not valid public_key', async () => {
             body.signer = '0x1234';
            const res = await request(app).post('/verify').send(body);
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equal(false);
            expect(res.body.message).to.equal("signer address is invalid!");
        })
        it('should return error if given message is empty OR not a string', async () => {
             body.message = '';
            let res = await request(app).post('/verify').send(body);
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equal(false);
            expect(res.body.message).to.equal("message is invalid, should be of type string & non empty");
            body.message = 123;
            res = await request(app).post('/verify').send(body);
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equal(false);
            expect(res.body.message).to.equal("message is invalid, should be of type string & non empty");
        })
        it('should return error if given signature is empty OR not a string', async () => {
             body.signature = '';
            let res = await request(app).post('/verify').send(body);
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equal(false);
            expect(res.body.message).to.equal("signature is invalid, should be of type string");
            body.signature = 123;
            res = await request(app).post('/verify').send(body);
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equal(false);
            expect(res.body.message).to.equal("signature is invalid, should be of type string");
        })
    })
  describe("Verification", function () {
      it('should verify valid signature', async () => {
          const res = await request(app).post('/verify').send(body).expect(httpStatus.OK);
          expect(res.body.status).to.equal(true);
          expect(res.body.message).to.equal("Verification completed!");
      })
  })
})