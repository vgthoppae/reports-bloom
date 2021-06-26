require("babel-core/register");
require("babel-polyfill");
const sampleEvent = require('../../../events/event-cloudwatch-event.json');

// Import all functions from scheduled-event-logger.js
const handler = require('../../../src/handlers/handler.js');

describe('Test for sqs-payload-logger', function () {
  // This test invokes the scheduled-event-logger Lambda function and verifies that the received payload is logged
  it('Verifies the payload is logged', async () => {
    // Mock console.log statements so we can verify them. For more information, see
    // https://jestjs.io/docs/en/mock-functions.html
    console.info = jest.fn()

    await handler.main(sampleEvent, null)

    // Verify that console.info has been called with the expected payload
    expect(console.info).toHaveBeenCalledWith(JSON.stringify(sampleEvent))
  });
});
