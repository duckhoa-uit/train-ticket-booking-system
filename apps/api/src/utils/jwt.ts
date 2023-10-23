import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';
import { SHA256 } from './sha';

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions
) => {
  const privateKey = Buffer.from(config.get<string>(`auth.${keyName}`), 'base64').toString('ascii');

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    allowInsecureKeySizes: true,
    algorithm: 'RS256',
  });
};
export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    const publicKey = Buffer.from(config.get<string>(`auth.${keyName}`), 'base64').toString(
      'ascii'
    );
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};

// const SHA256 = (str: string) => crypto.createHash('sha256').update(str).digest('hex');
/**
 * Given a 'password' from the client, extract the string that we should bcrypt. 'password' can be one of:
 * - String (the plaintext password)
 * - Object with 'digest' and 'algorithm' keys. 'algorithm' must be "sha-256".
 * Meteor Reference: https://github.com/meteor/meteor/blob/devel/packages/accounts-password/password_server.js#L30
 */
export const getPasswordString = (password: string | { algorithm: string; digest: string }) => {
  let pw: string;

  if (typeof password === 'string') {
    pw = SHA256(password);
  } else {
    // 'password' is an object
    if (password.algorithm !== 'sha-256') {
      throw new Error('Invalid password hash algorithm. ' + "Only 'sha-256' is allowed.");
    }
    pw = password.digest;
  }
  return pw;
};

// Extract the number of rounds used in the specified bcrypt hash.
export const getRoundsFromBcryptHash = (hash: string) => {
  let rounds;
  if (hash) {
    const hashSegments = hash.split('$');
    if (hashSegments.length > 2) {
      rounds = parseInt(hashSegments[2], 10);
    }
  }
  return rounds;
};

