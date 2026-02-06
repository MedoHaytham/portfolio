import Image from 'next/image'

function SkillCard({img, title, desc}) {
  return (
    <article className='skill flex gap-2.5 items-center border border-bgVariant p-4 rounded-xl mb-5'>
      <div className="icon w-12.5 h-12.5 p-1 lg:w-16.25 lg:h-16.25 lg:p-2 bg-bgVariant rounded-[10px] flex justify-center items-center">
        <Image src={`/assets/${img}`} alt={title} width={1000} height={1000} className='w-9 lg:w-max'/>
      </div>
      <div className="contet">
        <h4 className='capitalize text-[13px] lg:text-[16px]'>{title}</h4>
        <p className='text-light text-[10px] lg:text-[14px]'>{desc}</p>
      </div>
    </article>
  )
}

export default SkillCard;