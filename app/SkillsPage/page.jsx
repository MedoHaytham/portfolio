import React from 'react'
import Skill from './../components/skill';
import TopSection from '../components/topSection';

const skillsData = [
  {
    id: 1, 
    img:'html.svg',
    title: 'html',
    desc:'User Interface'
  },
  {
    id: 2, 
    img:'css3.svg',
    title: 'CSS',
    desc:'User Interface'
  },
  {
    id: 3,
    img:'javascript.svg',
    title:'javaScript',
    desc:'Interaction'
  },
  {
    id: 4,
    img:'react.svg',
    title:'react',
    desc:'Library'
  },
  {
    id: 5,
    img:'nextjs.svg',
    title:'nextjs',
    desc:'Framework'
  },
  {
    id: 6,
    img:'tailwindcss.svg',
    title:'tailwindCss',
    desc:'User Interface'
  },
    {
    id: 7,
    img:'bootstrap.svg',
    title:'bootstrap',
    desc:'User Interface'
  },
  {
    id: 8,
    img:'figma.svg',
    title:'figma',
    desc:'Design tool'
  },
]

function SkillsPage() {
  return (
    <section className='skills' id='skills'>
      <TopSection desc='What Skills I Have' title='My Expreience' />
      <div className="wrapper flex justify-between items-center flex-wrap">
        {
          skillsData.map((s) => 
            (<Skill key={s.id}
                img={s.img}
                title={s.title}
                desc={s.desc}
            />))
        }
      </div>
    </section>
  )
}

export default SkillsPage