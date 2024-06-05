import DeleteModal from './DeleteModal'
import CommentContent from './CommentContent'
import DeleteAndEditBtn from './DeleteAndEditBtn'
import ReplyBtn from './ReplyBtn'
import RepliedCommentContent from './RepliedCommentContent'
import RatingCounter from './RatingCounter'
import { useState } from 'react'

export default function CommentBox ({
  comment,
  dummyData,
  deleteSelectedId,
  setDeleteSelectedId,
  handleDeleteComment
}) {
  const [isReplyOpen, setIsReplyOpen] = useState(false)
  const [isReplyCommentOpen, setIsReplyCommentOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModelOpen] = useState(false)
  const [content, setContent] = useState('')
  const [commentReplies, setCommentReplies] = useState(comment.replies)
  const [repliedContent, setRepliedContent] = useState('')
  const [clickedComment, setClickedComment] = useState({})

  // console.log(comment)

  function handleClickComment (commentObj, isReply = false) {
    // console.log(commentObj)
    setClickedComment(commentObj && { ...commentObj, isReply })
    // clickedComment
    // All these na when i don tire, come dey try diff things😪
    const newReply = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      content: content === '' ? repliedContent : content,
      createdAt: 'Today',
      score: 0,
      replyingTo: clickedComment?.user?.username,
      user: {
        image: { png: './images/avatars/image-juliusomo.png' },
        username: 'juliusomo'
      }
    }

    console.log(clickedComment)
    return newReply
  }

  // console.log(commentReplies)

  function handleNewCommentReply () {
    if (content === '') return
    console.log('working')
    setCommentReplies(prevReplies => [...prevReplies, handleClickComment()])
  }

  function handleDeleteCommentReply () {
    setCommentReplies(prevReplies =>
      prevReplies.filter(comment => comment.id !== deleteSelectedId)
    )
    handleDeleteComment()
    setIsDeleteModelOpen(false)
  }

  return (
    <div className='mt-5 relative'>
      {/* MAIN COMMENT */}
      <div
        className='bg-white p-3 rounded-lg text-black min-[700px]:flex min-[700px]:flex-row-reverse min-[700px]:gap-5 min-[700px]:items-start min-[700px]:justify-start min-[700px]:pb-7'
        onClick={() => handleClickComment(comment)}
      >
        {/* For sake of fitting the design */}
        <div className='relative'>
          <CommentContent comment={comment} />
          <div className='absolute top-2 right-0 min-[700px]:inline hidden'>
            {comment.user.username !== 'juliusomo' && (
              <ReplyBtn setIsReplyOpen={setIsReplyOpen} />
            )}
            {comment.user.username === 'juliusomo' && (
              <DeleteAndEditBtn
                setIsDeleteModelOpen={setIsDeleteModelOpen}
                setDeleteSelectedId={setDeleteSelectedId}
                commentContent={comment}
              />
            )}
          </div>
        </div>

        <div
          className='mt-5 flex items-center justify-between'
          onClick={() => handleClickComment(comment)}
        >
          <RatingCounter />
          <div className='min-[700px]:hidden'>
            {comment.user.username !== 'juliusomo' && (
              <ReplyBtn setIsReplyOpen={setIsReplyOpen} />
            )}
            {comment.user.username === 'juliusomo' && (
              <DeleteAndEditBtn
                setIsDeleteModelOpen={setIsDeleteModelOpen}
                setDeleteSelectedId={setDeleteSelectedId}
                commentContent={comment}
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
              <RepliedComment key={commentContent.id}>
                <div
                  className='bg-white p-3 rounded-lg min-[700px]:flex min-[700px]:flex-row-reverse min-[700px]:gap-5 w-full'
                  onClick={() => handleClickComment(commentContent)}
                >
                  <RepliedCommentContent
                    commentContent={commentContent}
                    setIsReplyCommentOpen={setIsReplyCommentOpen}
                    setIsDeleteModelOpen={setIsDeleteModelOpen}
                    setDeleteSelectedId={setDeleteSelectedId}
                  />
                </div>
                {isReplyCommentOpen &&
                  commentContent.user.username !== 'juliusomo' && (
                    <ReplyBox
                      currentUser={dummyData.currentUser}
                      content={repliedContent}
                      setContent={setRepliedContent}
                      onHandleNewCommentReply={handleNewCommentReply}
                    />
                  )}
              </RepliedComment>
            ))}
          </div>
        </div>
      )}

      {isReplyOpen && (
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

function RepliedComment ({ children }) {
  return <div className='mt-5'>{children}</div>
}

function ReplyBox ({
  currentUser,
  content,
  setContent,
  onHandleNewCommentReply
}) {
  function handleClick () {
    onHandleNewCommentReply()
    setContent('')
  }

  console.log(content)

  return (
    <div className='bg-white p-3 rounded-lg text-black mt-2 flex items-start gap-2 '>
      <img src={currentUser.image.png} alt='current user' className='w-7' />
      <textarea
        className='border-2 w-full rounded-lg border-slate-400 pl-2 pr-2 h-16'
        value={content}
        onChange={e => setContent(e.target.value)}
      ></textarea>
      <button
        className='bg-[#3F69AA] text-white p-3 rounded-lg h-8 flex items-center'
        onClick={() => handleClick()}
      >
        Reply
      </button>
    </div>
  )
}
