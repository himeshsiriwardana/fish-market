import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAkey6UC3U96-8XDHih8S-vxyNbaG26dnE",
    authDomain: "catch-of-the-day-himesh.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-himesh.firebaseio.com",   
  });

const base = Rebase.createClass(firebaseApp.database());

//this is a named export
export { firebaseApp };

//this is a default export
export default base;


