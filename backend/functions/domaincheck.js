const route53 = require('./mods/route53');
const val = require('./mods/vaidate-domain-check');

let response,
  statusCode = 200,
  message;

exports.lambdaHandler = async (event, context) => {
  try {
    console.log(event);
    const err = val.checkRequest(event);

    if (err) {
      statusCode = 400;
      message = err;
    } else {
      message = await route53.recordExists(
        event.queryStringParameters.fullDomainName
      );
    }
  } catch (err) {
    statusCode = 500;
    message = 'Internal Server Error';
    console.log(err);
    return err;
  }

  response = {
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };

  return response;
};
