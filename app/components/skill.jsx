import Image from 'next/image'
import React from 'react'

function Skill({img, title, desc}) {
  return (
    <article className='skill w-[49%] md:w-[48%] lg:w-[24%] flex gap-2.5 items-center border border-bgVariant p-4 rounded-xl mb-5'>
      <div className="icon w-12.5 h-12.5 p-1 lg:w-16.25 lg:h-16.25 lg:p-2 bg-bgVariant rounded-[10px]">
        <Image src={`/assets/${img}`} alt={title} width={1000} height={1000}/>
      </div>
      <div className="contet">
        <h4 className='capitalize text-[13px] lg:text-[16px]'>{title}</h4>
        <p className='text-light text-[10px] lg:text-[14px]'>{desc}</p>
      </div>
    </article>
  )
}

export default Skill