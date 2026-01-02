import React from 'react'
import './aboutPage.css'
import TopSection from '../../components/topSection'
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";



function AboutPage() {
  return (
    <section className='about' id='about'>
      <TopSection desc='Get To Know' title='About Me'/>
      <div className="container grid grid-cols-1 gap-0 lg:grid-cols-[35%_50%] lg:gap-[15%]">
        <div className="about-me w-[65%] md:w-1/2 lg:w-full mt-0 mx-auto mb-12 md:mt-8 md:mx-auto md:mb-16 lg:m-0 aspect-square rounded-[2rem] bg-[linear-gradient(45deg,transparent,#4db5ff,transparent)]">
          <div className="image rotate-[10deg] rounded-[2rem] bg-primary overflow-hidden transition-main-all hover:rotate-0">
            <img src="./assets/Mogamed-half.png" alt="" />
          </div>
        </div>
        <div className="content text-center md:text-start">
          <div className="cards grid grid-cols-[1fr,1fr] gap-4 lg:grid-cols-[repeat(3,1fr)] lg:gap-6">
            <div className="card flex flex-col items-center p-8 bg-bgVariant border border-solid border-transparent rounded-2xl hover:border-primary hover:bg-transparent transition-main-all">
              <FaAward className='mb-4 text-[2rem] fill-primary'/>
              <h5 className='text-[0.9rem]'>Experience</h5>
              <small className='text-light text-[0.7rem]'>1+ years working</small>
            </div>
            <div className="card flex flex-col items-center p-8 bg-bgVariant border border-solid border-transparent rounded-2xl hover:border-primary hover:bg-transparent transition-main-all">
              <FiUsers className='mb-4 text-[2rem] text-primary'/>
              <h5 className='text-[0.9rem]'>Clients</h5>
              <small className='text-light text-[0.7rem]'>200+ worldwide</small>
            </div>
            <div className="card flex flex-col items-center p-8 bg-bgVariant border border-solid border-transparent rounded-2xl hover:border-primary hover:bg-transparent transition-main-all">
              <VscFolderLibrary className='mb-4 text-[2rem] fill-primary'/>
              <h5 className='text-[0.9rem]'>Projects</h5>
              <small className='text-light text-[0.7rem]'>3+ Completed</small>
            </div>
          </div>
          <p className='my-6 mx-0 md:mt-4 md:mb-6 lg:mt-8 lg:mb-[2.6rem] text-light'>As a React Frontend Engineer, I specialize in building dynamic, responsive, and user-friendly web applications using React. My expertise lies in developing reusable components, managing state efficiently, and creating scalable frontend architectures that deliver seamless user experiences. I focus on turning design concepts into interactive interfaces, optimizing performance, and ensuring maintainable code that supports long-term project growth.</p>
          <a href="" className='btn btn-primary'>Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default AboutPage