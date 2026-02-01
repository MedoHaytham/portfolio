import Image from 'next/image'

function ProjectCard({img, title, github, site}) {
  return (
    <article className='w-full md:w-[48%] lg:w-[31%] bg-bgVariant rounded-[20px] p-5 mb-12.5 border border-solid border-transparent hover:border-bgVariant hover:bg-transparent transition-main-all'>
      <div className="image rounded-2xl overflow-hidden">
        <Image src={`/assets/${img}`} alt={title} width={1200} height={800} />
      </div>
      <h3 className='mt-5.5 mb-8.75 capitalize'>{title}</h3>
      <div className="btns flex gap-5 mb-4">
        <a href={github} target='_blank' className='btn'>Github</a>
        <a href={site} target='_blank' className='btn btn-primary'>Visit Site</a>
      </div>
    </article>
  )
}

export default ProjectCard