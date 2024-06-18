import DeleteAndEditBtn from './DeleteAndEditBtn'

import RatingCounter from './RatingCounter'
import ReplyModal from './ReplyModal'

export default function RepliedCommentContent ({
  commentContent,
  parentCommentId,
  setIsDeleteModelOpen,
  setDeleteSelectedId,
  setClickedComment,
  toggleReplyBox,
  setEditing,
  editing
}) {
  function handleClick () {
    // console.log(parentCommentId, commentContent.id)
    setClickedComment(commentContent.user.username)
    toggleReplyBox(parentCommentId, commentContent.id)
  }
  return (
    <>
      <ReplyModal
        comment={commentContent}
        toggleReplyBox={toggleReplyBox}
        commentReplyId={commentContent.id}
        setClickedComment={setClickedComment}
        setDeleteSelectedId={setDeleteSelectedId}
        setIsDeleteModelOpen={setIsDeleteModelOpen}
        setEditing={setEditing}
        editing={editing}
      />

      <div className='flex justify-between'>
        <RatingCounter />

        {commentContent.user.username !== 'juliusomo' && (
          <div className='min-[700px]:hidden'>
            <button className='flex items-center gap-2' onClick={handleClick}>
              <img src={'./images/icon-reply.svg'} alt='icon reply' />
              <span className='text-[#3F69AA] text-base font-[551]'>Reply</span>
            </button>
          </div>
        )}

        {commentContent.user.username === 'juliusomo' && (
          <div className='min-[700px]:hidden '>
            <DeleteAndEditBtn
              setIsDeleteModelOpen={setIsDeleteModelOpen}
              commentContent={commentContent}
              setDeleteSelectedId={setDeleteSelectedId}
              setEditing={setEditing}
            />
          </div>
        )}
      </div>
    </>
  )
}
