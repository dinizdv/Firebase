import {useState} from 'react'
import {db} from './firebaseConnection'
import {doc, setDoc, collection, addDoc, getDoc, getDocs} from 'firebase/firestore' // to register item

import './index.css'

function App() {

  const[title, setTitle] = useState('') // textarea value
  const[author, setAuthor] = useState('') // input value
  const [posts, setPosts] = useState([])

  async function handleAdd(){
    
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
      console.log("ERROR! " + error)
    })
  
  }

  async function searchPost(){

    const postsRef = collection(db, "posts")
    await getDocs(postsRef) // docs of the 'posts'
    .then((snapshot) => {
      let list = []
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          title: doc.data().title,
          author: doc.data().author
        })
      })

      setPosts(list)

    })
    .catch((error) => {
      console.log("ERROR! " + error)
    })
    
    // const postRef = doc(db, "posts", "12345") // search for a doc ('posts') in db
    // await getDoc(postRef) // getDoc -> promise
    // .then((snapshot) => { // snapshot -> contains the dates (representation)
    //   setAuthor(snapshot.data().author) // snapshot.data() -> access
    //   setTitle(snapshot.data().title)
    // })
    // .catch(() => {
    //   console.log("ERROR!")
    // })
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

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <span>Title: {post.title} </span> <br/>
                <span>Author: {post.author}</span> <br/>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  );
}

export default App;
