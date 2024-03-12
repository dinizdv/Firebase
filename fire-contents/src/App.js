import {useState} from 'react'
import {db} from './firebaseConnection'
import {doc, setDoc, collection, addDoc, getDoc} from 'firebase/firestore' // to register item

import './index.css'

function App() {

  const[title, setTitle] = useState('') // textarea value
  const[author, setAuthor] = useState('') // input value

  async function handleAdd(){
    // await setDoc(doc(db, "posts", "12345"), { // access 'posts' and create '12345' doc
    //   title: title,
    //   author: author
    // })
    // .then(() => {
    //   console.log("Data registered in the database.")
    // })
    // .catch((error) => {
    //   console.log("Error" + error)
    // })
  
    await addDoc(collection(db, "posts"), {
      title: title,
      author: author
    }) // random id generated (in doc)
    .then (() => {
      console.log("Data registered in the database.")
      setTitle ('') // cleaning the values
      setAuthor ('') // cleaning too...
    })
    .catch ((error) => {
      console.log("Error " + error)
    })
  
  }

  async function searchPost(){
    const postRef = doc(db, "posts", "12345") // search for a doc ('posts') in db
    await getDoc(postRef) // getDoc -> promise
    .then((snapshot) => { // snapshot -> contains the dates (representation)
      setAuthor(snapshot.data().author) // snapshot.data() -> access
      setTitle(snapshot.data().title)
    })
    .catch(() => {
      console.log("ERROR!")
    })
  }


  return (
    <div className="App">

      <div className="container">
        
      <h1>React + Firebase</h1>
        <label>Title</label>
        <textarea type="text" placeholder='type the title...' value={title} onChange={ (e) => setTitle(e.target.value)}/>

        <label>Author</label>
        <input type="text" placeholder='Author of the post' value={author} onChange={(e) => setAuthor(e.target.value)} />

        <button onClick={handleAdd}>Registrer</button>
        <button onClick={searchPost}>Search post</button>

      </div>
    </div>
  );
}

export default App;
