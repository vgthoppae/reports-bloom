exports.checkRequest = (event) => {
  if (
    event.queryStringParameters &&
    event.queryStringParameters.fullDomainName === undefined
  ) {
    throw 'fullDomainName is required in the request parameter';
  }
};
