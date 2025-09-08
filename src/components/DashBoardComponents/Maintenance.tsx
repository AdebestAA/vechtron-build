import React from 'react'
import MaintananceLists from './MaintananceConponents/MaintananceLists'
import MaintananceHistory from './MaintananceConponents/MaintananceHistory'
import MaintananceSchedule from './MaintananceConponents/MaintananceSchedule'
import AboutVehicle from './about-vehicle'
import EngineHealth from './engine-health'
import LineChartComponent from './line-chart-component'

const Maintenance = () => {
  return (
    <div className=''>
      <div className='text-sm my-4'>
        <EngineHealth />
        <LineChartComponent />
      </div>

      <AboutVehicle />
      <MaintananceLists />
      <MaintananceHistory />
      <MaintananceSchedule />

    </div>
  )
}

export default Maintenance