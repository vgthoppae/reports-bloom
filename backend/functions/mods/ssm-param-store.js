var AWS = require("aws-sdk");
var ssm = new AWS.SSM({
  region: 'us-east-1'
});


exports.storeParam = (key, value, product) => {
  const params = {
    Name: key,
    Value: value,
    Type: 'SecureString',
    // Overwrite: true,
    Tags: [
      {
        Key: 'Product',
        Value: product
      }
    ]
  }
  ssm.putParameter(params, (err, data) => {
    if (err) {
      console.log(`Failed adding SSM key for key ${key} and product ${product}`, err)
    } else {
      console.log(`Added SSM key for key ${key} and product ${product}`)
    }
  })
}

