const handlerProvider = require('./mods/r53-event-handler');

let response = {
  statusCode: 200,
  body: JSON.stringify({
    message: 'about to process the route53 event',
  }),
};

exports.lambdaHandler = async (event, context) => {
  try {
    console.log(event);
    console.log(event.detail.responseElements.hostedZone);
    await handlerProvider.handleEvent(event);
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
