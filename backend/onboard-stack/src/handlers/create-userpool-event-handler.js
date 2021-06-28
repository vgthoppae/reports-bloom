const {
    CognitoIdentityProviderClient,
    AdminCreateUserCommand,
  } = require("@aws-sdk/client-cognito-identity-provider");

 const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

exports.main = async (event, context) => {
    console.info(JSON.stringify(event));
    const userPoolId = event["detail"]["responseElements"]["userPool"]["id"]
    const input = {
        DesiredDeliveryMediums: ['EMAIL'],
        ForceAliasCreation: false,
        MessageActionType: 'RESEND',
        UserAttributes: [
            {
                Name: 'email', /* required */
                Value: 'venkat.thoppae@gmail.com'
            },
        ],
        UserPoolId: userPoolId,
        Username: 'venkat.thoppae@gmail.com'
    }
    const command = new AdminCreateUserCommand(input);
    try {
        const data = await client.send(command);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        
      }
}
