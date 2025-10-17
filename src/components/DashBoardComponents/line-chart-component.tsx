import React from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import LineChart from '../line-chart'

const LineChartComponent = () => {
  return (
    <div>
      <header className='flex justify-between items-center'>
        <h1 className='font-medium lg:text-3xl my-2 text-lg'>Your Coolant level History</h1>
        <Button variant={"ghost"}>
          <X />
        </Button>
      </header>

      <>
        <LineChart />
      </>

    </div>
  )
}

export default LineChartComponent