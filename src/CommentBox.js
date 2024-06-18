import DeleteModal from './DeleteModal'

import DeleteAndEditBtn from './DeleteAndEditBtn'
import ReplyBtn from './ReplyBtn'
import RepliedCommentContent from './RepliedCommentContent'
import RatingCounter from './RatingCounter'
import { useState } from 'react'
import ReplyModal from './ReplyModal'

export default function CommentBox ({
  comment,
  dummyData,
  deleteSelectedId,
  setDeleteSelectedId,
  handleDeleteComment,
  toggleReplyBox,
  openReplyBoxId
}) {
  const [commentReplies, setCommentReplies] = useState(comment.replies)
  const [content, setContent] = useState('')
  const [repliedContent, setRepliedContent] = useState('')
  const [isDeleteModalOpen, setIsDeleteModelOpen] = useState(false)
  const [clickedComment, setClickedComment] = useState('')
  const [editing, setEditing] = useState({ isEditing: false, editingId: '' })

  const isOpen =
    openReplyBoxId.commentId === comment.id && openReplyBoxId.replyId === null

  // console.log(openReplyBoxId.replyId, openReplyBoxId.commentId)

  function handleNewCommentReply () {
    console.log(content)
    if (content === '' && repliedContent === '') return
    const newReply = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      content: content || repliedContent,
      createdAt: 'Today',
      score: 0,
      replyingTo: clickedComment,
      user: {
        image: { png: './images/avatars/image-juliusomo.png' },
        username: 'juliusomo'
      }
    }
    // console.log('working')
    setCommentReplies(prevReplies => [...prevReplies, newReply])
    setContent('')
    setRepliedContent('')
  }

  function handleDeleteCommentReply () {
    setCommentReplies(prevReplies =>
      prevReplies.filter(comment => comment.id !== deleteSelectedId)
    )
    handleDeleteComment()
    setIsDeleteModelOpen(false)
  }
  // console.log(comment)

  return (
    <div className='mt-5 relative'>
      {/* MAIN COMMENT */}
      <div className='bg-white p-3 rounded-lg text-black min-[700px]:flex min-[700px]:flex-row-reverse min-[700px]:gap-5 min-[700px]:items-start min-[700px]:justify-start min-[700px]:pb-7'>
        {/* For sake of fitting the design */}

        <ReplyModal
          comment={comment}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          setDeleteSelectedId={setDeleteSelectedId}
          toggleReplyBox={toggleReplyBox}
          setClickedComment={setClickedComment}
          commentReplyId={null}
          setEditing={setEditing}
          editing={editing}
        />

        <div className='mt-5 flex items-center justify-between'>
          <RatingCounter />
          <div className='min-[700px]:hidden'>
            {comment.user.username !== 'juliusomo' && (
              <ReplyBtn
                toggleReplyBox={toggleReplyBox}
                setClickedComment={setClickedComment}
                comment={comment}
                commentReplyId={null}
              />
            )}
            {comment.user.username === 'juliusomo' && (
              <DeleteAndEditBtn
                setIsDeleteModelOpen={setIsDeleteModelOpen}
                setDeleteSelectedId={setDeleteSelectedId}
                commentContent={comment}
                setEditing={setEditing}
              />
            )}
          </div>
        </div>
      </div>

      {/*COMMENT REPLIES  */}
      {commentReplies.length > 0 && (
        <div className='flex mt-3 gap-5 pl-5 w-full'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 w-px bg-slate-400'></div>
          </div>
          <div className='w-full text-black text-wrap'>
            {commentReplies.map(commentContent => (
              <div className='mt-5' key={commentContent.id}>
                <div className='bg-white p-3 rounded-lg min-[700px]:flex min-[700px]:flex-row-reverse min-[700px]:gap-5 w-full'>
                  <RepliedCommentContent
                    commentContent={commentContent}
                    setIsDeleteModelOpen={setIsDeleteModelOpen}
                    setDeleteSelectedId={setDeleteSelectedId}
                    parentCommentId={comment.id + 1}
                    toggleReplyBox={toggleReplyBox}
                    setClickedComment={setClickedComment}
                    setEditing={setEditing}
                    editing={editing}
                  />
                </div>
                {openReplyBoxId.commentId === commentContent.id &&
                  commentContent.user.username !== 'juliusomo' && (
                    <ReplyBox
                      currentUser={dummyData.currentUser}
                      content={repliedContent}
                      setContent={setRepliedContent}
                      onHandleNewCommentReply={handleNewCommentReply}
                    />
                  )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <ReplyBox
          currentUser={dummyData.currentUser}
          content={content}
          setContent={setContent}
          onHandleNewCommentReply={handleNewCommentReply}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          handleDeleteComment={handleDeleteCommentReply}
        />
      )}
    </div>
  )
}

function ReplyBox ({
  currentUser,
  content,
  setContent,
  onHandleNewCommentReply
}) {
  function handleClick () {
    onHandleNewCommentReply()
  }

  return (
    <div className='bg-white p-3 rounded-lg text-black mt-2 flex items-start gap-2 '>
      <img src={currentUser.image.png} alt='current user' className='w-7' />
      <textarea
        className='border-2 w-full rounded-lg border-slate-400 pl-2 pr-2 h-16 text-zinc-400'
        value={content}
        onChange={e => setContent(e.target.value)}
      ></textarea>
      <button
        className='bg-[#3F69AA] text-white p-3 rounded-lg h-8 flex items-center'
        onClick={handleClick}
      >
        Reply
      </button>
    </div>
  )
}
