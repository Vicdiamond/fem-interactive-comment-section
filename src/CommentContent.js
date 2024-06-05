export default function CommentContent ({ comment }) {
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
