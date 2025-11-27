const AboutUs = () => {
  return (
    <div className='overflow-hidden h-screen flex px-4 py-8 flex-col justify-between bg-black pt-24'>
      <div className='flex  flex-col md:flex-row justify-between bg-black pt-24 md:gap-16 gap-16'>
        <div className=' font-title flex-wrap flex gap-6'>
          <h1 className='text-white text-[40px] font-black font-title md:text-[80px] tracking-none md:tracking-tighter leading-none font-primary break-all md:break-words'>
            Kellmer002@gmail.com
          </h1>
          <h2 className='text-white/25 text-[24px] font-title  md:text-[36px] tracking-none md:tracking-tighter leading-none font-primary capitalize  break-words'>
            Actualemnte en Buenos Aires, Capital Federal, Argentina
          </h2>
        </div>
        <div className=' gap-4 w-full'>
          <ul className='flex justify-start flex-col text-white font-title tracking-none leading-tight font-primary capitalize md:text-[48px]'>
            <li>
              <a href='https://www.instagram.com/juli_kellmer/'>Instagram</a>
            </li>
            <li>
              <a href='https://www.linkedin.com/in/juli%C3%A1n-kellmer-344875288/'>
                Linkedin
              </a>
            </li>
            <li>
              <a href='https://github.com/Julian-Kellmer'>Github</a>
            </li>
          </ul>
        </div>
        <div className='w-full '>
          <ul className='flex flex-col justify-end text-end text-white font-title md:text-[48px]'>
            <li>React</li>
            <li>Next.js</li>
            <li>Supabase</li>
            <li>Three.js</li>
            <li>Gsap</li>
            <li>Figma</li>
            <li>Blender</li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className='font-title mx-auto text-center  text-[40px] font-black text-[#2269E1] md:text-[200px] tracking-none md:tracking-tighter leading-none capitalize font-primary '>
          Contact me{' '}
        </h3>
      </div>
    </div>
  )
}
export default AboutUs
