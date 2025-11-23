import React from 'react'

const Buttom = ({ children, backgroundColor = '#2269E1', ...atributes }) => {
  return (
    <div
      {...atributes}
      style={{ backgroundColor }}
      className='rounded-[3em] border cursor-pointer relative flex items-center justify-center px-[60px] py-[15px] '>
      {children}
      <div className='h-[150%] w-[100%] absolute top-[100%] '></div>
    </div>
  )
}

export default Buttom
