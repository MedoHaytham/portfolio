import SkillCard from './../components/skill';
import TopSection from '../components/topSection';
import connectDB from '@/lib/connectDB';
import skill from '@/app/models/Skills';


async function SkillsPage() {

  await connectDB();
  const skillsData = await skill.find({}).sort({_id: 1}).lean(); 

  return (
    <section className='skills' id='skills'>
      <TopSection desc='What Skills I Have' title='My Expreience' />
      <div className="wrapper grid grid-cols-2 lg:grid-cols-4 gap-x-1.75 md:gap-x-3 xl:gap-x-5">
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