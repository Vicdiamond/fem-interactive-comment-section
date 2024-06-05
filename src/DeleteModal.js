export default function DeleteModal ({
  setIsDeleteModelOpen,
  handleDeleteComment
}) {
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
