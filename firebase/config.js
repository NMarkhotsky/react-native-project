import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCMcdUaEDJktVs2JFrOKcOJ_me4u099iqI',
  authDomain: 'react-navite-project.firebaseapp.com',
  databaseURL: 'https://react-navite-project-default-rtdb.firebaseio.com',
  projectId: 'react-navite-project',
  storageBucket: 'react-navite-project.appspot.com',
  messagingSenderId: '1005385745744',
  appId: '1:1005385745744:web:33283ba180400ef72e1855',
  measurementId: 'G-66C25NW3Y4',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
