import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { storage, db } from "./firebase"
import './ImageUpload.css'

function ImageUpload({ username }) {
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')
  const [progress, setProgress] = useState(0)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progres function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress)
      },
      (error) => {
        console.log(error);
        alert(error.message)
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username
            })
            setProgress(0)
            setCaption("")
            setImage(null)
          })
      }
    )
  }

  return (
    <>
      <div className='imageeupload'>
        <progress className='imageupload__progress' value={progress} max="100" />
        <input
          type="text"
          placeholder='Enter a caption...'
          onChange={(e) => setCaption(e.target.value)}
        />
        <input type="file" onChange={handleChange} />
        <Button className='imageupload__btn' onClick={handleUpload}>Upload</Button>
      </div>
    </>
  )
}

export default ImageUpload
