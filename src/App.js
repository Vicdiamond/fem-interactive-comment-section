import { useEffect, useState } from 'react'
import CommentContainer from './CommentContainer'

function App () {
  const [dummyData, setDummyData] = useState(null)

  useEffect(function () {
    async function getData () {
      try {
        const response = await fetch('/data.json')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setDummyData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  return (
    <div className='text-white p-3 max-w-[700px]  flex justify-center items-center'>
      {dummyData && (
        <CommentContainer dummyData={dummyData} setDummyData={setDummyData} />
      )}
    </div>
  )
}

export default App
