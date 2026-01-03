import React from 'react'
import Skill from './../components/skill';
import TopSection from '../components/topSection';

const skillsData = [
  {
    id: 1, 
    img:'css3.svg',
    title: 'CSS',
    desc:'User Interface'
  },
  {
    id: 2,
    img:'javascript.svg',
    title:'javaScript',
    desc:'Interaction'
  },
  {
    id: 3,
    img:'react.svg',
    title:'react',
    desc:'Framework'
  },
  {
    id: 4,
    img:'tailwindcss.svg',
    title:'tailwindCss',
    desc:'User Interface'
  },
  {
    id: 5,
    img:'nodejs.svg',
    title:'nodeJS',
    desc:'Web Server'
  },
  {
    id: 6,
    img:'figma.svg',
    title:'figma',
    desc:'Design tool'
  },
  {
    id: 7,
    img:'expressjs.svg',
    title:'expressJS',
    desc:'Node Framework'
  },
  {
    id: 8,
    img:'mongodb.svg',
    title:'mongodb',
    desc:'Database'
  },
]

function SkillsPage() {
  return (
    <section className='skills' id='skills'>
      <TopSection desc='What Skills I Have' title='My Expreience' />
      <div className="container flex justify-between items-center flex-wrap">
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