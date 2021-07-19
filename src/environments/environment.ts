// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDY7h7zNKoinHO72WcJ2cso6nZD3x01POs",
    authDomain: "angular-quote.firebaseapp.com",
    projectId: "angular-quote",
    storageBucket: "angular-quote.appspot.com",
    messagingSenderId: "111644612898",
    appId: "1:111644612898:web:59023ca49e078555c3ad7b"
  }
};
// Added firebase config over here to fetch data from realtime database
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
