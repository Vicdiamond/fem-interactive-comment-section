export default function ReplyBtn ({
  setClickedComment,
  toggleReplyBox,
  commentReplyId,
  comment
}) {
  function handleClick () {
    // setIsReplyOpen(isReplyOpen => !isReplyOpen)
    setClickedComment(comment.user.username)
    toggleReplyBox(comment.id, commentReplyId)
  }
  return (
    <button className='flex items-center gap-2' onClick={() => handleClick()}>
      <img src={'./images/icon-reply.svg'} alt='icon reply' />
      <span className='text-[#3F69AA] text-base font-[551]'>Reply</span>
    </button>
  )
}
