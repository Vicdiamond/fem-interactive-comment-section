import CommentContent from './CommentContent'
import DeleteAndEditBtn from './DeleteAndEditBtn'
import ReplyBtn from './ReplyBtn'
import RatingCounter from './RatingCounter'

export default function RepliedCommentContent ({
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
