require("babel-core/register");
require("babel-polyfill");

// Import all functions from scheduled-event-logger.js
const handler = require('../../../src/handlers/onboard-handler.js');

describe('Test for creating user pool', function () {
  it('Verifies the payload is logged', async () => {
    // Mock console.log statements so we can verify them. For more information, see
    // https://jestjs.io/docs/en/mock-functions.html
    console.info = jest.fn()

    // const event = {
    //   body: {
    //     orgCode: "chase"
    //   }
    // }
    const event = {
      body: '{\n    "orgCode": "pepsi"\n}'
    }

    await handler.main(event, null)

    // Verify that console.info has been called with the expected payload
    expect(console.info).toHaveBeenCalledWith(event)
  });
});
