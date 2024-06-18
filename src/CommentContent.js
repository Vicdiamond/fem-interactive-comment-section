import { useState } from 'react'

export default function CommentContent ({ comment, setEditing, editing }) {
  const { username } = comment.user
  const { createdAt, content, id } = comment
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
      {editing.editingId === id && editing.isEditing ? (
        <EditingForm comment={comment} setEditing={setEditing} />
      ) : (
        <p className='font-[550] text-lg text-zinc-400 mt-3'>
          {comment.replyingTo && (
            <span className='text-[#3F69AA]'>@{comment.replyingTo} </span>
          )}

          {content}
        </p>
      )}
    </>
  )
}

function EditingForm ({ comment, setEditing }) {
  const [editedContent, setEditedContent] = useState(
    `${comment.replyingTo ? `@${comment.replyingTo}` : ''} ${comment.content}`
  )

  function handleClick () {
    // console.log(editedContent.split(' ').shift[0])
    comment.content = editedContent.split(' ').slice(1).join(' ')
    setEditing({ isEditing: false, editingId: '' })
  }

  return (
    <div className='flex flex-col items-end'>
      <textarea
        value={editedContent}
        onChange={e => setEditedContent(e.target.value)}
        className='border w-full rounded-lg border-slate-400 pl-2 pr-2 h-20 mt-4 text-zinc-400'
      ></textarea>
      <button
        className='bg-[#3F69AA] text-white p-5 mt-3 h-8 rounded-lg flex items-center'
        onClick={handleClick}
      >
        Update
      </button>
    </div>
  )
}
//
