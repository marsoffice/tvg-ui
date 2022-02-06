import { localenv } from 'localenv';
export const environment = {
  production: false,
  adtenantid: localenv.adtenantid,
  adclientid: localenv.adclientid,
  publicvapidkey: localenv.publicvapidkey,
  toastDuration: 5000,
};

import 'zone.js/plugins/zone-error';
