import firebase from 'firebase/app'
import firebaseConfig from './firebaseconf'
import 'firebase/database'

const firebaseApp = firebase.initializeApp(firebaseConfig)

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
