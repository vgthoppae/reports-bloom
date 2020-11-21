var AWS = require("aws-sdk");
var ssm = new AWS.SSM();


exports.storeParam = (key, value, product) => {
  const params = {
    Name: key,
    Value: value,
    DataType: 'String',
    Tags: [
      {
        Key: 'Product',
        Value: product
      }
    ]
  }
  ssm.putParameter(params, (err, data) => {
    if (err) {
      console.log("Failed adding SSM key for key `${key}` and product `${product}")
    } else {
      console.log("Added SSM key for key `${key}` and product `${product}")
    }
  })
}

