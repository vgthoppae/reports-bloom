const {
  CognitoIdentityProviderClient,
  CreateUserPoolCommand,
  CreateUserPoolClientCommand
} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });


const sendCommand = async(command) => {
  try {
    const data = await client.send(command);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw "failed"
  } 
}
exports.createUserPool = async (orgCode) => {
  console.log('inside create user pool-'+ orgCode)
  const input = {
      PoolName: `${orgCode}-teamreports-userpool`,
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireLowercase: true,
          RequireNumbers: true,
          RequireSymbols: true,
          RequireUppercase: true
        }
      },
      UsernameAttributes: ['email'],
      Schema: [
          {
            AttributeDataType: 'String',
            Name: 'name',
            Required: true
          },
          {
            AttributeDataType: 'String',
            Name: 'phone_number',
            Required: true
          },          
          {
            AttributeDataType: 'String',
            Name: 'email',
            Required: true
          },
      ],
      UserPoolTags: {
        "Project": "TeamReports"
      }
  }
  const command = new CreateUserPoolCommand(input);
  return await sendCommand(command);
}

exports.createUserPoolClient = async (orgCode, userPooId) => {
  const input = {
      UserPoolId: userPooId,
      GenerateSecret: false,
      ClientName: `${orgCode}-teamreports-webapp`
  }

  const command = new CreateUserPoolClientCommand(input);
  return await sendCommand(command);
}
