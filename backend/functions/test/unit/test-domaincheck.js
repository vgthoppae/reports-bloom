'use strict';

const app = require('../../domaincheck.js');
const chai = require('chai');
const expect = chai.expect;
var context;

const event = require('../sample-events/api-event.json');
describe('Tests index', function () {
  it('verifies successful response', async () => {
    // console.log(event);
    const result = await app.lambdaHandler(event, context);

    expect(result).to.be.an('object');
    expect(result.statusCode).to.be.oneOf([200, 409]);
    expect(result.body).to.be.an('string');

    // let response = JSON.parse(result.body);

    // expect(response).to.be.an('object');
    // expect(response.message).to.be.equal("about to check the domain");
    // // expect(response.location).to.be.an("string");
  });
});
