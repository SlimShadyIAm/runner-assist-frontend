import jwt from 'jsonwebtoken';
import NodeRSA from 'node-rsa';
import { dev as config } from '../config';

const PUBLIC_KEY = new NodeRSA(config['public-key']);
const PRIVATE_KEY = new NodeRSA(config['private-key']);
const KEY = config['public-key'];
const APP_KEY = config['app-key'];

export function createSignature(date) {
  const signature = (`+${date}+${APP_KEY}`);
  const valid = PRIVATE_KEY.sign(signature, 'base64');
  return valid;
}

export function validateSignature(signature, date) {
  const truth = `+${date}+${APP_KEY}`;
  const valid = PUBLIC_KEY.verify(truth, Buffer.from(signature, 'base64'));
  return valid;
}

export function validateToken(token) {
  try {
    const content = jwt.verify(token, KEY, { algorithms: ['RS256'] });
    return content;
  } catch (err) {
    console.error(err);
    return null;
  }
}
