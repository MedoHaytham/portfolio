import React from 'react'

function Skill({img, title, desc}) {
  return (
    <article className='skill w-[49%] md:w-[48%] lg:w-[24%] flex gap-[10px] items-center border border-bgVariant p-4 rounded-xl mb-5'>
      <div className="icon w-[50px] h-[50px] p-1 lg:w-[65px] lg:h-[65px] lg:p-2 bg-bgVariant rounded-[10px]">
        <img src={`/assets/${img}`} alt={title} />
      </div>
      <div className="contet">
        <h4 className='capitalize text-[13px] lg:text-[16px]'>{title}</h4>
        <p className='text-light text-[10px] lg:text-[14px]'>{desc}</p>
      </div>
    </article>
  )
}

export default Skill