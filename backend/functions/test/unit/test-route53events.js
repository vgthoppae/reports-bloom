'use strict';

const app = require('../../route53events.js');
const chai = require('chai');
const expect = chai.expect;
var context;

const event = require('../sample-events/r53-create-hosted-zone.json');
describe('Tests index', function () {
  it('verifies successful response', async () => {
    console.log(event1);
    const result = await app.lambdaHandler(event, context);

    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an('string');

    // let response = JSON.parse(result.body);

    // expect(response).to.be.an('object');
    // expect(response.message).to.be.equal("about to check the domain");
    // // expect(response.location).to.be.an("string");
  });
});
