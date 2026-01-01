import React from 'react'
import './homePage.css'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";


function HomePage() {
  return (
    <div className='home h-auto pt-20 md:h-[100vh] md:pt-[100px] capitalize overflow-hidden'>
      <div className="container h-full text-center relative">
        
        <h4 className='text-2xl'>hello I'm</h4>
        <h1 className='text-[2rem] md:text-[40px]'>Mohamed Haytham</h1>
        <h4 className='text-light'>Frontend Developer</h4>

        <div className='btns flex justify-center gap-5 mt-10'>
          <a href="/React Resume.pdf" download={true} className='btn'>Download CV</a>
          <a href="#" className='btn btn-primary'>Let's Talk</a>
        </div>

        <div className="image max-w-full w-[300px] h-[380px] md:w-[330px] md:h-[400px] bg-gradient-to-t from-transparent to-primary rounded-t-[12rem] my-10 mx-auto pt-24 md:pt-20 pb-6 px-6 overflow-hidden">
          <img src="./src/assets/me.png" alt="" />
        </div>

        <a href="#about" className='hidden md:block absolute right-[-35px] font-light rotate-90 origin-left'>Scroll Down</a>

        <div className="links hidden text-[25px] md:flex flex-col gap-5 items-center absolute bottom-[50px] after:content-[''] after:w-[1px] after:h-8 after:bg-primary ">
          <a href="https://www.linkedin.com/in/mohamed-haytham-8a316015b" target='_blank'><FaLinkedin /></a>
          <a href="https://github.com/MedoHaytham" target='_blank'><FaGithub  /></a>
          <a href="https://www.facebook.com/medo.haytham.31" target='_blank'><FaFacebook /></a>
        </div>
      </div>
    </div>
  )
}

export default HomePage