export const environment = {
  production: true,
  adtenantid: (window as any)?.envConfig?.adtenantid,
  adclientid: (window as any)?.envConfig?.adclientid,
  publicvapidkey: (window as any)?.envConfig?.publicvapidkey,
  toastDuration: 5000
};
