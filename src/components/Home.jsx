import Button from './Buttom'
const Home = () => {
  return (
    <section className='h-screen w-full'>
      <div className='h-full w-full flex flex-col justify-between text-start px-8 pt-24 pb-8'>
        <div
          id='text'
          className='capitalize flex  flex-col tracking-tighter leading-none '>
          <h1 className='font-primary text-[64px] md:text-[200px]'>
            Julian kellmer <br /> portfolio
          </h1>
          <h2 className='font-primary text-[64px] text-primary'>Product Dev</h2>
        </div>
        <div className='flex flex-col items-center'>
          <p className='font-primary text-[24px]'>Enjoy my Works</p>
          <p className='font-primary text-[16px] text-black/50'>Scroll Down</p>
          <img
            src='/mouse.svg'
            className='w-12 h-12'
            alt='mouse'
          />
        </div>
        
      </div>
    </section>
  )
}

export default Home
