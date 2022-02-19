import { localenv } from 'localenv';
export const environment = {
  production: false,
  adtenantid: localenv.adtenantid,
  adclientid: localenv.adclientid,
  publicvapidkey: localenv.publicvapidkey,
  toastDuration: 5000,
  ttclientkey: localenv.ttclientkey
};

import 'zone.js/plugins/zone-error';
