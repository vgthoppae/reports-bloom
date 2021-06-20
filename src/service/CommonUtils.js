// import { Auth } from 'aws-amplify';
import Auth from '../service/congnitoAuth'

export function getCurrentOrg() {
  return "loc";
}

export async function getCurrentUser() {
  return await Auth.currentAuthenticatedUser();
}