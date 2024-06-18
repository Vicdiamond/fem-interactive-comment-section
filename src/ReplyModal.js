import CommentContent from './CommentContent'
import DeleteAndEditBtn from './DeleteAndEditBtn'

export default function ReplyModal ({
  comment,
  setIsDeleteModelOpen,
  setDeleteSelectedId,
  setClickedComment,
  toggleReplyBox,
  commentReplyId,
  setEditing,
  editing
}) {
  function handleClick () {
    setClickedComment(comment.user.username)
    toggleReplyBox(comment.id, commentReplyId)
  }

  return (
    <div className='relative w-full'>
      <CommentContent
        comment={comment}
        editing={editing}
        setEditing={setEditing}
      />

      {comment.user.username === 'juliusomo' ? (
        <div className='absolute top-2 right-0 min-[700px]:inline hidden'>
          <DeleteAndEditBtn
            setIsDeleteModelOpen={setIsDeleteModelOpen}
            setDeleteSelectedId={setDeleteSelectedId}
            commentContent={comment}
            setEditing={setEditing}
          />
        </div>
      ) : (
        <div className='absolute top-2 right-0 min-[700px]:inline hidden'>
          <button className='flex items-center gap-2' onClick={handleClick}>
            <img src={'./images/icon-reply.svg'} alt='icon reply' />
            <span className='text-[#3F69AA] text-base font-[551]'>Reply</span>
          </button>
        </div>
      )}
    </div>
  )
}
