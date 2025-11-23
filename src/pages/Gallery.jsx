import GalleryCard from '../components/GalleryCard'
import { Link } from 'react-router-dom'
import Projects from '../data/mockData'

const Gallery = () => {
  return (
    <div className='max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8'>
        {Projects.map((project) => (
          <Link
            to={`/proyecto/${project.id}`}
            key={project.id}
            className='col-span-1 md:col-span-1 lg:col-span-4'>
            <GalleryCard
              name={project.name}
              type={project.type}
              img={project.img}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Gallery
