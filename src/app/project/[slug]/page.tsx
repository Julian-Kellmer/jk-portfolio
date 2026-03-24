import { getProjects, getProjectBySlug } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import BackToGallery from './BackToGallery'
import RevealContainer from '@/src/components/RevealContainer'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resolvedSlug = decodeURIComponent(slug)
  const project = await getProjectBySlug(resolvedSlug)

  if (!project) notFound()

  return (
    <RevealContainer className='layout-wrap z-150 bg-bg flex flex-col p-8 overflow-y-auto w-full min-h-screen'>
      <div className='flex justify-end sticky top-0 right-4 md:top-12 md:right-4 z-50'>
        <BackToGallery />
      </div>
      <div className='layout-grid w-full mt-4 md:mt-24'>
        {/* Table-like layout */}
        <div className='w-full mb-12 col-span-full md:col-span-12'>
          <div className='grid grid-cols-[2fr_2fr_1fr_auto] border-b border-white/20 pb-4 mb-4 text-xs md:text-sm text-white/60'>
            <div>Project</div>
            <div>Category</div>
            <div>Client</div>
            <div className='text-right'>Year</div>
          </div>
          <div className='grid grid-cols-[2fr_2fr_1fr_auto] items-center border-b border-white/20 pb-6 mb-6 text-lg md:text-2xl font-light'>
            <div>{project.title}</div>
            <div className='text-sm md:text-lg'>{project.tags.join(', ')}</div>
            <div>{project.client}</div>
            <div className='text-right'>{project.year}</div>
          </div>
        </div>

        {/* Details section */}
        <div className='col-span-full md:col-span-12'>
          <div className='pr-0 md:pr-12 layout-grid'>
            <div className='col-span-full layout-grid'>
              {project.description && (
                <p className=' text-h4  col-span-full md:col-span-6 '>
                  {project.description}
                </p>
              )}
            </div>
            <Link 
              href={project.url}
              className='px-6 py-2 bg-secondary text-body rounded-full text-black self-start mt-4'
            >
              Go live
            </Link>

            <ul className='col-span-full md:col-span-full mb-10 mt-10 text-body md:text-sm text-white/60 font-light list-none p-0'>
              {project.tags.map((tag, index) => (
                <li
                  key={index}
                  className='flex items-center gap-3'>
                  <span className='w-1.5 h-1.5 rounded-full bg-secondary'></span>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='col-span-full md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 pb-24'>
          {(Array.isArray(project.image) ? project.image : [project.image]).slice(0, 3).map(
            (image, index) => (
              <div
                key={index}
                className='w-full aspect-[16/9] overflow-hidden'>
                <img
                  src={image}
                  alt={project.title}
                  className='w-full h-full object-cover'
                />
              </div>
            ),
          )}
        </div>
      </div>
    </RevealContainer>
  )
}
