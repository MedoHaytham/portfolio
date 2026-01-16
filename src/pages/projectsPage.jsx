import React from 'react'
import TopSection from '../components/topSection'
import Project from './../components/project';

const projectsData = [
  {
    id: 1,
    image:'project 1.png',
    title: 'Hypertech Ecommerce',
    github: 'https://github.com/MedoHaytham/e-commerce',
    site: 'https://medohaytham.github.io/e-commerce/'
  },
  {
    id: 2,
    image:'project 2.png',
    title: 'Muslim 360',
    github: 'https://github.com/MedoHaytham/prayer-times',
    site: 'https://medohaytham.github.io/prayer-times/'
  },
  {
    id: 3,
    image:'project 3.jpg',
    title: 'admin Page',
    github: 'https://github.com/MedoHaytham/admin-dashboard',
    site: 'https://admin-dashboard-black-nine-79.vercel.app'
  },
  {
    id: 4,
    image:'project 4.jpg',
    title: 'Weather App',
    github: 'https://github.com/MedoHaytham/weather-app',
    site: 'https://weather-app-theta-nine-f575urx091.vercel.app'
  },
  {
    id: 5,
    image:'project 5.jpg',
    title: 'Wordle Game',
    github: 'https://github.com/MedoHaytham/wordle-game',
    site: 'https://medohaytham.github.io/wordle-game/'
  },
  {
    id: 6,
    image:'project 6.jpg',
    title: 'Hangman Game',
    github: 'https://github.com/MedoHaytham/Hangman-Game',
    site: 'https://medohaytham.github.io/Hangman-Game/'
  },
]

function ProjectsPage() {
  return (
    <section className='projects' id='projects'>
      <TopSection title={'Portfolio'} desc={'My Recent Work'}/>
      <div className="container flex justify-between flex-wrap">
        {
          projectsData.map((p) => (
            <Project
              key={p.id}
              img={p.image}
              title={p.title}
              github={p.github}
              site={p.site}
            />
          ))
        }
      </div>
    </section>
  )
}

export default ProjectsPage