import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";
import TopSection from '../components/topSection';
import Card from '../components/card';
import Image from 'next/image';



function AboutPage() {
  return (
    <section className='about' id='about'>
      <TopSection desc='Get To Know' title='About Me'/>
      <div className="wrapper grid grid-cols-1 gap-0 lg:grid-cols-[35%_50%] lg:gap-[15%]">
        <div className="about-me w-[65%] md:w-1/2 lg:w-full mt-0 mx-auto mb-12 md:mt-8 md:mx-auto md:mb-16 lg:m-0 aspect-square rounded-4xl bg-[linear-gradient(45deg,transparent,#4db5ff,transparent)]">
          <div className="image rotate-10 rounded-4xl bg-primary overflow-hidden transition-main-all hover:rotate-0">
            <Image src='/assets/Mogamed-half.png' alt="Mohamed Haytham" width={1000} height={1057}/>
          </div>
        </div>
        <div className="content text-center md:text-start">
          <div className="cards grid grid-cols-[1fr,1fr] gap-4 lg:grid-cols-[repeat(3,1fr)] lg:gap-6">
            <Card
              icon={<FaAward className='mb-4 text-[2rem] fill-primary'/>}
              title={'Experience'}
              subTitle={'1+ years working'}
            />
            <Card 
              icon={<FiUsers className='mb-4 text-[2rem] text-primary'/>}
              title={'Clients'}
              subTitle={'200+ worldwide'}
            />
            <Card 
              icon={<VscFolderLibrary className='mb-4 text-[2rem] fill-primary'/>}
              title={'Projects'}
              subTitle={'3+ Completed'}
            />
          </div>
          <p className='my-6 mx-0 md:mt-4 md:mb-6 lg:mt-8 lg:mb-[2.6rem] text-light'>Motivated Full Stack MERN Developer with hands-on experience in building scalable and high-performance web applications using MongoDB, Express.js, React.js, and Node.js. Specialized in developing end-to-end solutions, including responsive frontend interfaces, robust backend APIs, and efficient database design. Strong in RESTful API development, state management, performance optimization, and building maintainable, scalable applications with clean and reusable code architecture.</p>
          <a href="#contact" className='btn btn-primary'>Let&apos;s Talk</a>
        </div>
      </div>
    </section>
  )
}

export default AboutPage