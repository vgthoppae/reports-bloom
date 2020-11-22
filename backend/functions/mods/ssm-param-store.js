const AWS = require('aws-sdk');
const ssm = new AWS.SSM({
  region: process.env.region,
});

exports.storeParam = async (key, value, product) => {
  var params = {
    Name: key,
    Value: value,
    Type: 'SecureString',
  };

  //if the key already exists - use the overwrite option. otherwise, add the
  //Tags for the first time entries
  try {
    await ssm.getParameter({ Name: key }).promise();
    console.log(
      `${key} already exists in the store, overwriting with new value`
    );
    params = {
      ...params,
      Overwrite: true,
    };
  } catch (err) {
    console.log(`${key} does not exist in the store, adding with tags`);
    params = {
      ...params,
      Tags: [
        {
          Key: 'Product',
          Value: product,
        },
      ],
    };
  }

  try {
    const ret = await ssm.putParameter(params).promise();
    console.log(
      console.log(`Added SSM key for key ${key} and product ${product}`),
      ret.Version
    );
  } catch (err) {
    console.log(
      `Failed adding SSM key for key ${key} and product ${product}`,
      err
    );
  }
};
