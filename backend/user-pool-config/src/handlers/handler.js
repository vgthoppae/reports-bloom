import { CognitoIdentityProviderClient, AdminCreateUserCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });


exports.main = async (event, context) => {
    console.info(JSON.stringify(event));
    const input = {
        DesiredDeliveryMediums: ['EMAIL'],
        MessageActionType: 'RESEND',
        TemporaryPassword: 'TempPassword1',
        UserAttributes: [
            {
                Name: 'email', /* required */
                Value: 'avadmin@agilevision.com'
            },
        ],
        UserPoolId: 'us-east-1_sz3Ir0M3p',
        Username: 'avadmin@agilevision.com'
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
