import React from 'react';
import Heropng from '../../components/Hero/Hii.png'
import { GrUserExpert } from "react-icons/gr";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";

const Hero = () => {
  return (
    <div className='container py-14 md:py-24 grid grid-cols-1 md:grid grid-cols-2 gap-8 space-y-6 md:space-y-0'>
    <div className='flrx justify-center items-center'> 
    <img src={Heropng} alt=""
    className='w-[350px] md:max-w-[450px] object-cover drop-shadow'
    />
    </div>
    <div className='flex flex-col justify-center'>
    <div className='text-center md:text-left space-y-12'>
    <h1 className='text-3xl md:text-4xl font-bold !leading-snug text-white'>
    The world's Leading Online Learning plateform
    
    </h1>
    <div className='flex items-center gap-4 p-6 bg-[#f4f4f4] rounded-2xl hover:bg-gray-700 duration-300 hover:shadow-2xl'>
    <FaBookReader className='text-2xl'/>
    <p className="text-lg">1000+ Courses </p>
    </div>
    <div className='flex items-center gap-4 p-6 bg-[#f4f4f4] rounded-2xl hover:bg-gray-700 duration-300 hover:shadow-2xl'>
    <GrUserExpert className='text-2xl'/>
    <p className="text-lg">Expert Instruction </p>
    </div>
    <div className='flex items-center gap-4 p-6 bg-[#f4f4f4] rounded-2xl hover:bg-gray-700 duration-300 hover:shadow-2xl'>
    <MdOutlineAccessTime className='text-2xl'/>
    <p className="text-lg"> Lifetime Access</p>
    </div>
    
    
    </div>
    
    </div>
    
    </div>
  )
}

export default Hero;