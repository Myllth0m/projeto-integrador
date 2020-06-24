import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
  apiKey: "AIzaSyBPzM1eA2L8ii2bCkuWYCcRWSS1vtRXyu8",
  authDomain: "reactapp-4cf72.firebaseapp.com",
  databaseURL: "https://reactapp-4cf72.firebaseio.com",
  projectId: "reactapp-4cf72",
  storageBucket: "reactapp-4cf72.appspot.com",
  messagingSenderId: "743135662912",
  appId: "1:743135662912:web:a6d1764c7a23470a0ce0a5",
  measurementId: "G-6ZB8K3QK0Y"
}

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.app = app.database()
  }
  
  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  logOut() {
    return app.auth().signOut()
  }
  
  async register(nome, email, password) {
    await app.auth().createUserWithEmailAndPassword(email, password)
    const uid = app.auth().currentUser.uid
    return app.database().ref('usuarios').child(uid).set({ nome })
  }

  isInitialized() {
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve)
    })
  }

  getCurrent() {
    return app.auth().currentUser && app.auth().currentUser.email
  }

  async getUserName(callback) {
    if(!app.auth().currentUser) {
      return null
    }
    const uid = app.auth().currentUser.uid
    await app.database().ref('usuarios').child(uid).once('value').then(callback)
  }
}

export default new Firebase()