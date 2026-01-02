import React from 'react'

function TopSection({desc, title}) {
  return (
    <div className="top-section">
      <h5 className='text-light text-center text-[0.8rem]'>{desc}</h5>
      <h2 className='text-primary text-center mb-8 lg:mb-12 text-[1.3rem]'>{title}</h2>
    </div>
  )
}

export default TopSection