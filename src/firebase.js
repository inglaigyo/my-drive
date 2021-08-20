import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const app = firebase.initializeApp({
  apiKey: "AIzaSyA-hxeqGFI62kPbenBBrvoO01yYXFrFg5w",
  authDomain: "online-drive-31fd0.firebaseapp.com",
  projectId: "online-drive-31fd0",
  storageBucket: "online-drive-31fd0.appspot.com",
  messagingSenderId: "953629342685",
  appId: "1:953629342685:web:5a2e5eef354c3d94cb1434"
})

const firestore = app.firestore()
export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}
export const storage = app.storage()
export const auth = app.auth()
export default app
