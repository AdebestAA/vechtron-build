import React from 'react'

const data = [
    {
        id:1,
        name:"Active Alerts",
        value:"Require Attention",
        number:"8",
    },
    {
        id:1,
        name:"Active Alerts",
        value:"Require Attention",
        number:"8",
    },
    {
        id:1,
        name:"Active Alerts",
        value:"Require Attention",
        number:"8",
    },
    {
        id:1,
        name:"Active Alerts",
        value:"Require Attention",
        number:"8",
    },
    {
        id:1,
        name:"Active Alerts",
        value:"Require Attention",
        number:"8",
    },
    {
        id:1,
        name:"Active Alerts",
        value:"Require Attention",
        number:"8",
    },
    {
        id:1,
        name:"Active Alerts",
        value:"Require Attention",
        number:"8",
    },
]
const OverviewComponent = () => {
  return (
    <div className='flex flex-wrap justify-between items-start gap-y-4 my-6'>
        {
        data.map((item,index)=>{

            return <aside
            className='bg-[var(--overview-container)] md:mx-0 mx-auto w-[95%] md:w-[45%] lg:w-[30%] rounded-lg flex flex-col px-8 py-4 text-black '
            key={index + 1}>
<section className='flex items-center gap-x-3 text-sm'>
    <div className='h-[20px] w-[20px] bg-[#323232]'></div>
    <h1>{item.name}</h1>
</section>
<h1 className='text-[3rem] '>
    {item.number}
</h1>
<section className='text-lg'>
   
    <h1>{item.value}</h1>
</section>
            </aside>
        })
        }</div>
  )
}

export default OverviewComponent