import SuperAgent from 'superagent';
import moment from 'moment';
import { validateSignature, createSignature } from './security';

export const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/app/api/' : 'https://tapi.farooq.xyz/app/api/';

const apiGetRequest = async (options) => {
  const datetime = moment(new Date()).valueOf();
  const appKey = createSignature(datetime);
  const sessionToken = sessionStorage.getItem('user') ? (JSON.parse(sessionStorage.getItem('user'))).token : null;
  try {
    const ret = new Promise((resolve, reject) => {
      SuperAgent.get(API_URL + options.url)
        .accept('application/json')
        .set('date-time', datetime)
        .set('app-key', appKey)
        .set('session-token', sessionToken)
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', 'Origin, Content-Type')
        .query(options.query)
        .end((err, res) => {
          if (res.statusCode > 200) reject(res.statusCode);
          if (err) reject(err);
          if (!res.headers['app-key'] || !res.headers['date-time'] || !validateSignature(res.headers['app-key'], res.headers['date-time'])) return reject(new Error(`invalid app key -- ${res.headers['app-key']}`));
          return resolve(res.body);
        });
    });
    return ret;
  } catch (error) {
    console.error(`Request Failed: ${error}`);
    return { error };
  }
};
const apiPostRequest = async (options) => {
  const datetime = moment(new Date()).valueOf();
  const appKey = createSignature(datetime);
  const sessionToken = sessionStorage.getItem('user') ? (JSON.parse(sessionStorage.getItem('user'))).token : null;
  try {
    const ret = new Promise((resolve, reject) => {
      SuperAgent.post(API_URL + options.url)
        .type('application/json')
        .accept('application/json')
        .set('date-time', datetime)
        .set('app-key', appKey)
        .set('session-token', sessionToken)
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', 'Origin, Content-Type')
        .send(JSON.stringify(options.body))
        .end((err, res) => {
          if (res.statusCode > 200) return reject(res.statusCode);
          if (!res || res === undefined || res === null) return reject(Error('No data returned!'));
          if (err) reject(err);
          if (!res.headers['app-key'] || !res.headers['date-time'] || !validateSignature(res.headers['app-key'], res.headers['date-time'])) return reject(new Error(`invalid app key -- ${res.headers['app-key']}`));
          return resolve(res.body);
        });
    });
    return ret;
  } catch (error) {
    console.error(`Request Failed: ${error}`);
    return { error };
  }
};

const services = {};

export async function init() {
  let apiRoutes;
  if (sessionStorage.routes) {
    apiRoutes = JSON.parse(sessionStorage.getItem('routes'));
  } else {
    const { routes } = await apiGetRequest({ url: 'index' });
    apiRoutes = routes;
    sessionStorage.setItem('routes', JSON.stringify(apiRoutes));
  }

  console.log('SERVICES: ', services);

  if (apiRoutes) {
    apiRoutes.forEach((route) => {
      if (route.method === 'GET') {
        services[route.label] = (async (options) => {
          const data = await apiGetRequest({ url: route.path, ...options });
          return data;
        });
      } else if (route.method === 'POST') {
        services[route.label] = (async (options) => {
          const data = await apiPostRequest({ url: route.path, ...options });
          return data;
        });
      }
    });
  }
}

export default services;
