import Main from '@/components/DashBoardComponents/Main'
import MobileSidebar from '@/components/DashBoardComponents/MobileSidebar'
import Sidebar from '@/components/DashBoardComponents/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex  '>
      <MobileSidebar/>
<Sidebar/>
<Main/>
        
    </div>
  )
}

export default page