import TopSection from '../components/topSection'
import ProjectCard from './../components/project';
import connectDB from '@/lib/connectDB';
import Project from "@/app/models/Project";

async function ProjectsPage() {
  await connectDB();
  const projectsData = await Project.find({}).sort({ createdAt: -1 }).lean();

  return (
    <section className='projects' id='projects'>
      <TopSection title={'Portfolio'} desc={'My Recent Work'}/>
      <div className="wrapper flex justify-between flex-wrap">
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