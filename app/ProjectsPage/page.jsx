import TopSection from '../components/topSection'
import ProjectCard from './../components/project';
import connectDB from '@/lib/connectDB';
import Project from "@/app/models/Projects";

async function ProjectsPage() {
  await connectDB();
  const projectsData = await Project.find({}).sort({_id: 1}).lean();

  return (
    <section className='projects' id='projects'>
      <TopSection title={'Portfolio'} desc={'My Recent Work'}/>
      <div className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-7 xl:gap-x-13">
        {
          projectsData.map((p) => (
            <ProjectCard
              key={p._id.toString()}
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