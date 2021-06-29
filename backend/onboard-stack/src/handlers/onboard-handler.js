const { createUserPool, createUserPoolClient, createAdminUser } = require('../mods/cognito-user-pool')
const { putConfigItem } = require('../mods/dynamo-dao')

const headers = {
  "Content-Type": "application/json"
};
var message = 'success'
var statusCode = 200
var body = undefined

exports.main = async (event, context) => {  
  const rawPayload = event["body"]
  var payload = rawPayload

  if (typeof(rawPayload) === 'string') {
    payload = JSON.parse(rawPayload)
  }
  const orgCode = payload["orgCode"]
  const adminEmail = payload["adminEmail"]
  
  try {
    //create user pool
    const userPoolData = await createUserPool(orgCode)
    const userPoolId = userPoolData.UserPool?.Id

    //store user pool Id
    const dbRet = await putConfigItem(orgCode, userPoolId);

    await createUserPoolClient(orgCode, userPoolId);

    await createAdminUser(adminEmail, userPoolId);
  } catch(error) {
    console.log(error)
    statusCode = 500
    message = 'failure'
  } finally {
    body = JSON.stringify({
      message
    })
  }

  //create user pool client

  console.info(event);
  return {
    statusCode,
    body,
    headers
  }
  
}

