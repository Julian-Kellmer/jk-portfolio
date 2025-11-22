import { useParams, useNavigate } from 'react-router-dom';
import { usePublicacion } from '../hooks/usePublicacion';

const WorkDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { publicacion, loading, error } = usePublicacion(projectId);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-xl">Cargando proyecto...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-400 text-xl mb-4">Error: {error}</div>
                    <button
                        onClick={() => navigate('/proyectos')}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                    >
                        Volver a proyectos
                    </button>
                </div>
            </div>
        );
    }

    if (!publicacion) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-xl mb-4">Proyecto no encontrado</div>
                    <button
                        onClick={() => navigate('/proyectos')}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                    >
                        Volver a proyectos
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header con imagen */}
            <div className=" mt-16">
                <div className="max-w-6xl mx-auto flex flex-col justify-center items-center tracking-tighter leading-none">
                    <h1 className="text-[196px] font-title leading-35 mb-2 text-center">{publicacion.nombre}</h1>
                    <div className='flex flex-col items-center gap-2'>

                        <p className="text-xl text-black font-primary tracking-tighter leading-none">{publicacion.tipo_proyecto}</p>
                        {publicacion.url && publicacion.url.startsWith('http') && (


                            <a
                                href={publicacion.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl text-black font-primary tracking-tighter leading-none"
                            >
                                 Ver proyecto online↗️
                            </a>


                        )}
                    </div>
                </div>
            </div>
            <div className="relative w-[80vw] mx-auto mt-8 ">
                <img
                    src={publicacion.portada}
                    alt={publicacion.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1200x400/1f2937/ffffff?text=Imagen+No+Disponible';
                    }}
                />

            </div>


            {/* Contenido */}
            <div className="max-w-6xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Información principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* URL del proyecto */}

                    </div>


                    {/* <div className="space-y-6">
                    
                        <section className="bg-gray-900 rounded-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-red-300">Información del Proyecto</h3>
                            <div className="space-y-3">
                                <p>
                                    <strong className="text-white">Cliente:</strong>
                                    <br />
                                    <span className="text-gray-300">{publicacion.cliente}</span>
                                </p>
                                <p>
                                    <strong className="text-white">Tipo de proyecto:</strong>
                                    <br />
                                    <span className="text-gray-300">{publicacion.tipo_proyecto}</span>
                                </p>
                                <p>
                                    <strong className="text-white">Realizado por:</strong>
                                    <br />
                                    <span className="text-gray-300">
                                        {publicacion.autor_nombre} {publicacion.autor_apellido}
                                    </span>
                                </p>
                            </div>
                        </section>

                        
                        {publicacion.herramientas && publicacion.herramientas.length > 0 && (
                            <section className="bg-gray-900 rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-4 text-red-300">Herramientas Utilizadas</h3>
                                <div className="flex flex-wrap gap-2">
                                    {publicacion.herramientas.map(herramienta => (
                                        <span
                                            key={herramienta.id_herramienta}
                                            className="bg-red-900 text-red-200 px-3 py-2 rounded-lg text-sm font-medium"
                                        >
                                            {herramienta.detalle}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default WorkDetail