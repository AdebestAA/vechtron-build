import React from 'react'
import MaintananceLists from './MaintananceConponents/MaintananceLists'
import MaintananceHistory from './MaintananceConponents/MaintananceHistory'
import MaintananceSchedule from './MaintananceConponents/MaintananceSchedule'

const Maintenance = () => {
  return (
    <div className=''>
      <MaintananceLists/>
      <MaintananceHistory/>
      <MaintananceSchedule/>
      </div>
  )
}

export default Maintenance