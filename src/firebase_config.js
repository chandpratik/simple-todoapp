import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyDKjUj6XkkGI-3rhKGo2_71NT4INdIE09E',
  authDomain: 'todo-1717e.firebaseapp.com',
  projectId: 'todo-1717e',
  storageBucket: 'todo-1717e.appspot.com',
  messagingSenderId: '172839011322',
  appId: '1:172839011322:web:029685e3c11e2ddd49da43',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
