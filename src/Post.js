import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import './Post.css'
import { db } from "./firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()))
        })
    }
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault()

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setComment('')
  }

  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar className='post__avatar' alt="Remy Sharp" src="https://thumbs.dreamstime.com/b/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D1%81%D0%BC%D0%B8-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B0-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E-%D1%81%D0%BE%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80-176194876.jpg" />

        <h3>{username}</h3>
      </div>

      <img className='post__image' src={imageUrl} alt="" />

      <h4 className='post__text'><strong>{username}</strong> {caption}</h4>

      <div className='post__comments'>
        {comments.map((comment) => (
          <p>
            <b>{comment.username}</b> {comment.text}
          </p>
        ))}
      </div>

      {
        user && (
          <form className='post__commentBox'>
            <input
              className='post__input'
              type="text"
              placeholder='Add a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className='post__button'
              disabled={!comment}
              type='submit'
              onClick={postComment}
            >
              Post
            </button>
          </form>
        )
      }

    </div>
  )
}

export default Post
