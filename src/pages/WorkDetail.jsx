
import { useParams, useNavigate } from 'react-router-dom';
import Projects  from '../data/mockData';
import { useEffect } from 'react';

const WorkDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    
    const project = Projects.find(p => p.id === projectId);

    useEffect(() => {
        if (!project) {
            navigate('/'); // Redirect to home if project not found
        }
    }, [project, navigate]);

    if (!project) return null;

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header con imagen */}
            <div className=" mt-16">
                <div className="max-w-6xl mx-auto flex flex-col justify-center items-center tracking-tighter leading-none">
                    <h1 className="text-[80px] md:text-[120px] lg:text-[196px] font-title leading-none mb-2 text-center">{project.name}</h1>
                    <div className='flex flex-col items-center gap-2'>
                         <p className="text-xl text-black font-primary tracking-tighter leading-none">{project.type} - {project.year}</p>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl text-black font-primary tracking-tighter leading-none hover:underline"
                            >
                                 Ver proyecto online ↗️
                            </a>
                    </div>
                </div>
            </div>
            <div className="relative w-[90vw] lg:w-[80vw] mx-auto mt-8 h-[40vh] lg:h-[80vh]">
                <img
                    src={project.img}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1200x400/1f2937/ffffff?text=Imagen+No+Disponible';
                    }}
                />
            </div>


            {/* Contenido */}
            <div className="max-w-4xl mx-auto p-6 mt-12">
                <div className="grid grid-cols-1 gap-8">
                    {/* Información principal */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tighter">About the project</h2>
                        <p className="text-xl leading-relaxed text-gray-800 font-primary">
                            {project.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkDetail

