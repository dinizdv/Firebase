import {useState, useEffect} from 'react'
import {db} from './firebaseConnection'
import {doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot} from 'firebase/firestore'

import './index.css'

function App() {

  const[title, setTitle] = useState('') // textarea value
  const[author, setAuthor] = useState('') // input value
  const [idPost, setIdPost] = useState ('')

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function loadPosts(){
      // onSnapshot -> update in real time
      const unsub = onSnapshot(collection(db, "posts"), (snapshot)=> {
        let listPost = []
        snapshot.forEach((doc) => {
          listPost.push({
            id: doc.id,
            title: doc.data().title,
            author: doc.data().author
          })
        })
        setPosts(listPost)
      })
    }
    loadPosts()
  }, [])

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

  async function editPost() {
    const docRef = doc(db, "posts", idPost)
    await updateDoc(docRef, {
      title: title,
      author: author
    })
    .then(() => {
      console.log("Updated post")
      setIdPost('')
      setTitle('')
      setAuthor('')
    })
    .catch((error) => {
      console.log("ERROR! " + error)
    })
  }

  async function deletePost(id){
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    .then(() => {
      alert('Post deleted')
    })
    .catch((error) => {
      console.log("ERROR! " + error)
    })
  }


  return (
    <div className="App">

      <div className="container">
        
      <h1>React + Firebase</h1>
        <label>ID do post:</label>
        <input value={idPost} onChange={(e) => setIdPost(e.target.value)}></input>
        <label>Title</label>
        <textarea type="text" placeholder='type the title...' value={title} onChange={ (e) => setTitle(e.target.value)}/> <br/>

        <label>Author</label>
        <input type="text" placeholder='Author of the post' value={author} onChange={(e) => setAuthor(e.target.value)} />

        <button onClick={handleAdd}>Registrer</button>
        <button onClick={searchPost}>Search post</button>
        <button onClick={editPost}>Update post</button>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>Id: {post.id}</strong><br/>
                <span>Title: {post.title}</span> <br/>
                <span>Author: {post.author}</span> <br/>
                <button onClick={ () => deletePost(post.id)}>Delete</button><br/><br/>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  );
}

export default App;
