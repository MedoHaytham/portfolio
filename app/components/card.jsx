import React from 'react'

function Card({icon, title, subTitle}) {
  return (
    <div className="card">
      {icon}
      <h5 className='text-[0.9rem]'>{title}</h5>
      <small className='text-light text-[0.7rem]'>{subTitle}</small>
    </div>
  )
}

export default Card