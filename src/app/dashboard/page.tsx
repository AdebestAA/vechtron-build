import Main from '@/components/DashBoardComponents/Main'
import Sidebar from '@/components/DashBoardComponents/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex  '>
<Sidebar/>
<Main/>
        
    </div>
  )
}

export default page