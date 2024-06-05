import { useState } from 'react'
export default function RatingCounter () {
  const [count, setCount] = useState(0)
  return (
    <div className=' flex items-center justify-between w-24 bg-blue-50 p-2 rounded-md min-[700px]:flex-col min-[700px]:w-8 min-[700px]:gap-5'>
      <button className='' onClick={() => setCount(count => count + 1)}>
        <img src='./images/icon-plus.svg' alt='icon plus' />
      </button>
      <span className='font-semibold text-[#3F69AA]'>{count}</span>
      <button
        className=''
        onClick={() => setCount(count => (count > 0 ? count - 1 : 0))}
      >
        <img src='./images/icon-minus.svg' alt='icon minus' />
      </button>
    </div>
  )
}
