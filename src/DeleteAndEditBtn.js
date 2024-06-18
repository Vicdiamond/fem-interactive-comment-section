export default function DeleteAndEditBtn ({
  setIsDeleteModelOpen,
  commentContent,
  setDeleteSelectedId,
  setEditing
}) {
  function handleDelete () {
    setIsDeleteModelOpen(true)
    setDeleteSelectedId(commentContent.id)
  }
  function handleEdit () {
    // console.log(commentContent)
    setEditing({ isEditing: true, editingId: commentContent.id })
  }
  // console.log(commentContent)
  return (
    <div className='flex gap-5 items-center'>
      <button
        className='flex items-center gap-2 hover:opacity-30'
        onClick={handleDelete}
      >
        <img src='./images/icon-delete.svg' alt='icon- delete' />
        <span className='text-red-500'>Delete</span>
      </button>
      <button
        className='flex items-center gap-2 hover:opacity-30'
        onClick={handleEdit}
      >
        <img src='./images/icon-edit.svg' alt='icon- delete' />
        <span className='text-[#3F69AA]'>Edit</span>
      </button>
    </div>
  )
}
