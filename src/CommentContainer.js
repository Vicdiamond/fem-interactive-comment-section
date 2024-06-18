import CommentBox from './CommentBox'
import AddComment from './AddComment'
import { useState } from 'react'

export default function CommentContainer ({ dummyData }) {
  const [content, setContent] = useState('')
  const [deleteSelectedId, setDeleteSelectedId] = useState('')
  const [comments, setComments] = useState(dummyData.comments)
  const [openReplyBoxId, setOpenReplyBoxId] = useState({
    commentId: null,
    replyId: null
  })

  const toggleReplyBox = (commentId, replyId = null) => {
    if (
      openReplyBoxId.commentId === commentId &&
      openReplyBoxId.replyId === replyId
    ) {
      setOpenReplyBoxId({
        commentId: null,
        replyId: null
      }) // Close if the same comment's button is clicked again
    } else {
      setOpenReplyBoxId({
        commentId,
        replyId
      }) // Open the clicked comment's reply box
    }
  }

  const newReply = {
    content: content,
    createdAt: 'Today',
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    replies: [],
    score: 0,
    user: {
      image: { png: './images/avatars/image-juliusomo.png' },
      username: 'juliusomo'
    }
  }

  function handleAddComment (e) {
    e.preventDefault()
    setComments(prevData => [...prevData, newReply])
    setContent('')
  }

  function handleDeleteComment () {
    setComments(comments =>
      comments.filter(comment => comment.id !== deleteSelectedId)
    )
  }

  return (
    <div className='relative'>
      {comments.map(comment => (
        <CommentBox
          comment={comment}
          key={comment.id}
          dummyData={dummyData}
          deleteSelectedId={deleteSelectedId}
          setDeleteSelectedId={setDeleteSelectedId}
          handleDeleteComment={handleDeleteComment}
          toggleReplyBox={toggleReplyBox}
          openReplyBoxId={openReplyBoxId}
        />
      ))}
      <AddComment
        dummyData={dummyData}
        handleAddComment={handleAddComment}
        setContent={setContent}
        content={content}
      />
    </div>
  )
}
