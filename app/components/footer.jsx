import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";

function Footer() {
  return (
    <footer className='bg-primary py-10 text-center text-[14px] mt-25'>
      <a href="#" className='text-bgColor text-[25px] font-medium mb-7.5 inline-block'>Mohamed Haytham</a>
      <ul className='flex flex-col gap-5 md:flex-row flex-wrap justify-center md:gap-7.5 mx-auto mb-7.5'>
        <li><a href="#" className='text-bgColor hover:text-white'>Home</a></li>
        <li><a href="#about" className='text-bgColor hover:text-white'>About</a></li>
        <li><a href="#skills" className='text-bgColor hover:text-white'>Skills</a></li>
        <li><a href="#services" className='text-bgColor hover:text-white'>Services</a></li>
        <li><a href="#projects" className='text-bgColor hover:text-white'>Projects</a></li>
        <li><a href="#contact" className='text-bgColor hover:text-white'>Contact</a></li>
      </ul>
      <div className="socials flex justify-center gap-3.75 mb-10">
        <a href="https://www.instagram.com/medo_haytham/" className='text-white bg-bgColor p-3 rounded-[10px] flex border border-solid border-transparent hover:bg-transparent hover:border-bgColor hover:text-bgColor' target='_blank'><FaInstagram /></a>
        <a href="https://x.com/Medo_Haitham0" className='text-white bg-bgColor p-3 rounded-[10px] flex border border-solid border-transparent hover:bg-transparent hover:border-bgColor hover:text-bgColor' target='_blank'><FaXTwitter /></a>
        <a href="https://www.threads.com/@medo_haytham" className='text-white bg-bgColor p-3 rounded-[10px] flex border border-solid border-transparent hover:bg-transparent hover:border-bgColor hover:text-bgColor' target='_blank'><FaThreads /></a>
      </div>
      <small className='mb-16 text-bgColor'>&copy; <a href="#" className='text-white'>Mohamed Haytham</a> All rights reserved</small>
    </footer>
  )
}

export default Footer