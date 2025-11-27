import { Link } from 'react-router-dom'
const CategoryCard = ({ title, img, name, desc }) => {
  return (
    <div className='category-panel p-4 lg:p-24 shrink-0 w-screen h-full flex  items-center justify-center pt-24'>
      <div className='w-full h-full gap-4 relative flex flex-col lg:flex-row justify-center'>
        <div className=' relative lg:absolute lg:top-[12%] flex flex-col gap-4 lg:left-[12%] w-full lg:w-1/3 z-10'>
          <h2
            id='title'
            className='text-4xl lg:text-[96px] font-primary tracking-tighter leading-none text-white capitalize'>
            {title}
          </h2>
         
        </div>
        <div className='hidden lg:block lg:flex-[2]'></div>
        <div
          id='image-cont'
          className='flex-1 lg:flex-[3] flex outline min-h-0'>
          <div className='w-full h-full lg:h-3/4 self-center bg-[#2269E1] overflow-hidden'>
            <img
              src={img}
              className='w-full h-full object-cover'
              alt={name}
            />
          </div>
        </div>
        <div className='flex-1 lg:flex-[2] flex flex-col justify-start lg:justify-end min-h-0'>
          <div
            id='info'
            className='pb-4 lg:pb-24 tracking-tighter font-primary text-white w-full flex flex-col justify-start lg:justify-end'>
            <h4 className='text-xl lg:text-2xl capitalize'>{name}</h4>
            
            <p className='text-sm  lg:text-xl leading-none w-full lg:w-2/3'>
              {desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CategoryCard
