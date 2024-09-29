import React from 'react';
import {RiComputerLine} from "react-icons/ri";
import {TbWorldWww} from "react-icons/tb";
import {CiMobile3} from "react-icons/ci";
import {IoMdHappy} from "react-icons/io";
import {BiSupport} from "react-icons/bi";
import {IoPulseOutline } from "react-icons/io5";

const ServicesData=[
    {
     id:1,
     title:"Web Developement",
     link:"#",
     icon:<TbWorldWww/>,
     delay:0.2
    },
    {
        id:2,
        title:"App Developement",
        link:"#",
        icon:<CiMobile3 />,
        delay:0.3
       },
       {
        id:3,
        title:"Software Developement",
        link:"#",
        icon:<RiComputerLine />,
        delay:0.4
       },
       {
        id:4,
        title:"Satisfied Client",
        link:"#",
        icon:<IoMdHappy />,
        delay:0.5
       },
       {
        id:5,
        title:" BiSupport",
        link:"#",
        icon:<BiSupport />,
        delay:0.6
       },
       {
        id:6,
        title:" SEO Optimization",
        link:"#",
        icon:<IoPulseOutline />,
        delay:0.7
       }
       
                   
]

const Services = () => {
  return (
    <div className='bg-gray-900'>

    <div className='container pb-14 pt-16'>
    <h1 className='text-4xl text-white font-bold text-center pb-10'>
    Services We Provided
    </h1>
     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8'>
     {
         ServicesData.map((service)=>(
         <div className='bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl'>
         <div className='text-4xl mb-4'>{service.icon}</div>
         <h1 className='text-lg font-semibold text-center px-3'>{service.title}</h1>
         </div>


         )
        )
     }
     
     </div>
    </div>
    </div>
  )
}

export default Services;