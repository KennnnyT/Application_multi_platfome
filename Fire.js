import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBgC2w0fQzHQoDWyYp5eHyjANn430nQp4A",
  authDomain: "mymovie-7defe.firebaseapp.com",
  projectId: "mymovie-7defe",
  storageBucket: "mymovie-7defe.appspot.com",
  messagingSenderId: "756929789577",
  appId: "1:756929789577:web:f9bf5030f0eeeb16c29058",
  measurementId: "G-610RC54Y2B"
};
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default class Fire {
  getMovies (callback) {
    const q = query(collection(db, 'Movies'), orderBy('title', 'asc'))
    onSnapshot(q, snapshot => {
      let movies = []
      snapshot.forEach(doc => {
        movies.push({ id: doc.id, ...doc.data() })
      })
      callback(movies)
    })
  }

  addMovie (movie) {
    addDoc(collection(db, 'Movies'), movie)
  }

  updateMovie (movie) {
    updateDoc(doc(db, 'Movies', movie.id), movie)
  }

  deleteMovie (movie) {
    deleteDoc(doc(db, 'Movies', movie.id))
  }
}
