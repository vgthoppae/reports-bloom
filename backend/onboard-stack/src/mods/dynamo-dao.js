const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });

exports.putConfigItem = async(orgCode, userPoolId) => {
  try {
    console.log(orgCode)
    console.log(userPoolId)
    const input = {
      TableName: "TeamReportsTable",
      Item: {
        "pk": {"S": `org=${orgCode}#config`},
        "sk": {"S": "default"},
        "congnito_info": {
          "M": {
            "userPooId": {"S": userPoolId}
          }
        }
      }
    }
    const command = new PutItemCommand(input);
    const results = await client.send(command);
    console.log(results)
  } catch (err) {
    console.log(err);
    throw "failed"
  }

}