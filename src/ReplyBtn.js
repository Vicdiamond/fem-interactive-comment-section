export default function ReplyBtn ({ setIsReplyOpen }) {
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
