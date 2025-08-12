"use client";

import Main from '@/components/DashBoardComponents/Main';
import Sidebar from '@/components/DashBoardComponents/Sidebar';

const page = () => {
  return (
    <div className='flex  '>
      <Sidebar />
      <Main />

    </div>
  )
}

export default page