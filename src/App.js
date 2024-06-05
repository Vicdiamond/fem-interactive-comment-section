import { useEffect, useState } from 'react'

function App () {
  const [dummyData, setDummyData] = useState(null)

  useEffect(function () {
    async function getData () {
      try {
        const response = await fetch('/data.json')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setDummyData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  return (
    <div className='text-white p-3 max-w-[700px]  flex justify-center items-center'>
      {dummyData && (
        <CommentContainer dummyData={dummyData} setDummyData={setDummyData} />
      )}
    </div>
  )
}

function CommentContainer ({ dummyData }) {
  const [content, setContent] = useState('')
  const [deleteSelectedId, setDeleteSelectedId] = useState('')
  const [comments, setComments] = useState(dummyData.comments)

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
  }

  function handleDeleteComment () {
    setComments(comments =>
      comments.filter(comment => comment.id !== deleteSelectedId)
    )
  }

  return (
    <div className='relative'>
      {comments.map((comment, i) => (
        <CommentBox
          comment={comment}
          key={comment.id}
          dummyData={dummyData}
          deleteSelectedId={deleteSelectedId}
          setDeleteSelectedId={setDeleteSelectedId}
          handleDeleteComment={handleDeleteComment}
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

function CommentBox ({
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

function RepliedCommentContent ({
  commentContent,
  setIsReplyCommentOpen,
  setIsDeleteModelOpen,
  setDeleteSelectedId
}) {
  // console.log(commentContent)
  return (
    <>
      <div className='relative w-full'>
        <CommentContent comment={commentContent} />
        {commentContent.user.username !== 'juliusomo' && (
          <div className='absolute top-2 right-0 min-[700px]:inline hidden'>
            <ReplyBtn setIsReplyOpen={setIsReplyCommentOpen} />
          </div>
        )}
        {commentContent.user.username === 'juliusomo' && (
          <div className='absolute top-2 right-0 min-[700px]:inline hidden'>
            <DeleteAndEditBtn
              setIsDeleteModelOpen={setIsDeleteModelOpen}
              commentContent={commentContent}
              setDeleteSelectedId={setDeleteSelectedId}
            />
          </div>
        )}
      </div>
      <div className='flex justify-between'>
        <RatingCounter />

        {commentContent.user.username !== 'juliusomo' && (
          <div className='min-[700px]:hidden'>
            <ReplyBtn setIsReplyOpen={setIsReplyCommentOpen} />
          </div>
        )}

        {commentContent.user.username === 'juliusomo' && (
          <div className='min-[700px]:hidden '>
            <DeleteAndEditBtn
              setIsDeleteModelOpen={setIsDeleteModelOpen}
              commentContent={commentContent}
              setDeleteSelectedId={setDeleteSelectedId}
            />
          </div>
        )}
      </div>
    </>
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

function AddComment ({ dummyData, handleAddComment, content, setContent }) {
  const image = dummyData.currentUser.image.png
  return (
    <form
      className='bg-white mt-5 p-3 rounded-lg min-[700px]:flex min-[700px]:flex-row-reverse items-start gap-3'
      onSubmit={e => handleAddComment(e)}
    >
      <button className='bg-[#3F69AA] text-white p-5 rounded-lg h-8  items-center min-[700px]:flex hidden'>
        Send
      </button>
      <textarea
        className='border w-full rounded-lg border-slate-400 pl-2 pr-2 h-16 p-1 text-zinc-400'
        placeholder='Add a comment...'
        value={content}
        onChange={e => setContent(e.target.value)}
      ></textarea>
      <div className='mt-2 flex justify-between items-center min-[700px]:mt-0'>
        <img src={image} alt='display pic' className='w-8' />
        <button className='bg-[#3F69AA] text-white p-5 rounded-lg h-8 flex items-center min-[700px]:hidden'>
          Send
        </button>
      </div>
    </form>
  )
}

function DeleteAndEditBtn ({
  setIsDeleteModelOpen,
  commentContent,
  setDeleteSelectedId
}) {
  function handleClick () {
    setIsDeleteModelOpen(true)
    setDeleteSelectedId(commentContent.id)
  }
  // console.log(commentContent)
  return (
    <div className='flex gap-5 items-center'>
      <button
        className='flex items-center gap-2 hover:opacity-30'
        onClick={() => handleClick()}
      >
        <img src='./images/icon-delete.svg' alt='icon- delete' />
        <span className='text-red-500'>Delete</span>
      </button>
      <button className='flex items-center gap-2 hover:opacity-30'>
        <img src='./images/icon-edit.svg' alt='icon- delete' />
        <span className='text-[#3F69AA]'>Edit</span>
      </button>
    </div>
  )
}

function DeleteModal ({ setIsDeleteModelOpen, handleDeleteComment }) {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50'>
      <div className='absolute top-[50%] bg-white left-1/2 -translate-x-1/2 -translate-y-[50%] overflow-hidden flex flex-col gap-5 p-5 w-full max-w-80 rounded-lg'>
        <header className='text-zinc-600 text-xl font-bold'>
          Delete comment
        </header>
        <p className='text-zinc-600 w-72  text-lg'>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className='flex justify-between gap-3'>
          <button
            className='bg-slate-500 rounded-lg w-full p-3'
            onClick={() => setIsDeleteModelOpen(false)}
          >
            NO, CANCEL
          </button>
          <button
            className='rounded-lg bg-red-400 p-3 w-full'
            onClick={() => handleDeleteComment()}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  )
}

function RatingCounter () {
  const [count, setCount] = useState(0)
  return (
    <div className=' flex items-center justify-between w-24 bg-blue-50 p-2 rounded-md min-[700px]:flex-col min-[700px]:w-8 min-[700px]:gap-5'>
      <button className='' onClick={() => setCount(count => count + 1)}>
        <img src='./images/icon-plus.svg' alt='icon plus' />
      </button>
      <span className='font-semibold text-[#3F69AA]'>{count}</span>
      <button
        className=''
        onClick={() => setCount(count => (count > 0 ? count - 1 : 0))}
      >
        <img src='./images/icon-minus.svg' alt='icon minus' />
      </button>
    </div>
  )
}

function ReplyBtn ({ setIsReplyOpen }) {
  function handleClick () {
    setIsReplyOpen(isReplyOpen => !isReplyOpen)
  }
  return (
    <button className='flex items-center gap-2' onClick={() => handleClick()}>
      <img src={'./images/icon-reply.svg'} alt='icon reply' />
      <span className='text-[#3F69AA] text-base font-[551]'>Reply</span>
    </button>
  )
}

function CommentContent ({ comment }) {
  const { username } = comment.user
  const { createdAt, content } = comment
  const image = comment.user.image.png
  return (
    <>
      <div className='flex items-center gap-3 min-[700px]:mt-4 min-[700px]:justify-between'>
        <div className='flex items-center gap-3 '>
          <p>
            <img src={image} alt='display pic' className='w-8' />
          </p>
          <p className='text-black font-semibold text-lg opacity-65'>
            {username}
          </p>
          {username === 'juliusomo' && (
            <p className='bg-[#3F69AA] text-white pl-2 pr-2'>you</p>
          )}
          <p className='text-gray-500'>{createdAt}</p>
        </div>
      </div>
      <p className='font-[550] text-lg text-zinc-400 mt-3'>
        {comment.replyingTo && (
          <span className='text-[#3F69AA]'>@{comment.replyingTo} </span>
        )}
        {content}
      </p>
    </>
  )
}

export default App
