import Image from 'next/image';
import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";


function HomePage() {
  return (
    <div className='home h-auto pt-20 xl:pb-40  md:pt-25 capitalize'>
      <div className="wrapper h-full text-center relative">
        
        <h4 className='text-[25px]'>hello I&apos;m</h4>
        <h1 className='text-[1.85rem] md:text-[2.5rem]'>Mohamed Haytham</h1>
        <h4 className='text-light'>Frontend Developer</h4>

        <div className='btns flex justify-center gap-5 mt-10'>
          <a href="/assets/Mohamed Haytham Resume.pdf" download={true} className='btn'>Download CV</a>
          <a href="#contact" className='btn btn-primary'>Let&apos;s Talk</a>
        </div>

        <div className="image max-w-full w-75 h-95 md:w-82.5 md:h-100 bg-linear-to-t from-transparent to-primary rounded-t-[12rem] my-10 mx-auto pt-24 md:pt-20 pb-6 px-6 overflow-hidden">
          <Image 
            src="/assets/me.png" 
            alt='Mohamed Haytham'           
            width={1200}
            height={1300}
          />
        </div>

        <a href="#about" className='hidden xl:block absolute -bottom-22.5 -right-8.75 font-light rotate-90'>Scroll Down</a>

        <div className="links text-[25px] flex justify-center gap-5 xl:flex-col md:items-center xl:absolute xl:-bottom-30 xl:after:content-[''] xl:after:w-px xl:after:h-8 xl:after:bg-primary">
          <a href="https://www.linkedin.com/in/mohamed-haytham-47ab193a8" target='_blank'><FaLinkedin /></a>
          <a href="https://github.com/MedoHaytham" target='_blank'><FaGithub /></a>
          <a href="https://www.facebook.com/medo.haytham.31" target='_blank'><FaFacebook /></a>
        </div>
      </div>
    </div>
  )
}

export default HomePage