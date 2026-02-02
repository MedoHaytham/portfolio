import SkillCard from './../components/skill';
import TopSection from '../components/topSection';
import connectDB from '@/lib/connectDB';
import skill from '@/app/models/Skills';


async function SkillsPage() {

  await connectDB();
  const skillsData = await skill.find({}).sort({ createdAt: -1 }).lean(); 

  return (
    <section className='skills' id='skills'>
      <TopSection desc='What Skills I Have' title='My Expreience' />
      <div className="wrapper flex justify-between items-center flex-wrap">
        {
          skillsData.map((s) => (
            <SkillCard key={s._id.toString()}
              img={s.img}
              title={s.title}
              desc={s.desc}
            />
          ))
        }
      </div>
    </section>
  )
}


export default SkillsPage