import React from 'react'
import './homePage.css'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";


function HomePage() {
  return (
    <div className='home h-auto pt-20 xl:pb-[160px]  md:pt-[100px] capitalize'>
      <div className="container h-full text-center relative">
        
        <h4 className='text-[25px]'>hello I'm</h4>
        <h1 className='text-[1.85rem] md:text-[2.5rem]'>Mohamed Haytham</h1>
        <h4 className='text-light'>Frontend Developer</h4>

        <div className='btns flex justify-center gap-5 mt-10'>
          <a href="/assets/React Resume.pdf" download={true} className='btn'>Download CV</a>
          <a href="#contact" className='btn btn-primary'>Let's Talk</a>
        </div>

        <div className="image max-w-full w-[300px] h-[380px] md:w-[330px] md:h-[400px] bg-gradient-to-t from-transparent to-primary rounded-t-[12rem] my-10 mx-auto pt-24 md:pt-20 pb-6 px-6 overflow-hidden">
          <img src="/assets/me.png" alt="Mohamed Haytham" />
        </div>

        <a href="#about" className='hidden xl:block absolute bottom-[-90px] right-[-35px] font-light rotate-90'>Scroll Down</a>

        <div className="links text-[25px] flex justify-center gap-5 xl:flex-col md:items-center xl:absolute xl:bottom-[-120px] xl:after:content-[''] xl:after:w-[1px] xl:after:h-8 xl:after:bg-primary">
          <a href="https://www.linkedin.com/in/mohamed-haytham-8a316015b" target='_blank'><FaLinkedin /></a>
          <a href="https://github.com/MedoHaytham" target='_blank'><FaGithub /></a>
          <a href="https://www.facebook.com/medo.haytham.31" target='_blank'><FaFacebook /></a>
        </div>
      </div>
    </div>
  )
}

export default HomePage