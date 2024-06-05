
export default function AddComment ({ dummyData, handleAddComment, content, setContent }) {
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