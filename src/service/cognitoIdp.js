import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

const cognitoIdp = new CognitoIdentityProvider({region: "us-east-1"});

export async function signUp(params) {

  var params = {
    ClientId: '6drp028ch8m8stmg1ka3l1dspf', /* required */
    Password: 'StrongPassword', /* required */
    Username: 'avadmin@agilevision.com', /* required */
    UserAttributes: [
      {
        Name: 'email', /* required */
        Value: 'avadmin@agilevision.com'
      },
    ]
  };
  cognitoIdp.signUp(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}