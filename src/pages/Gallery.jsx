// pages/Gallery.jsx
import GalleryCard from "../components/GalleryCard"
import { usePublicaciones } from "../hooks/usePublicaciones"
import { Link } from "react-router-dom"

const Gallery = () => {
    const { publicaciones, loading, error, category } = usePublicaciones()

    // DEBUG: Verificar el estado
    console.log('Gallery state:', { 
        publicaciones, 
        loading, 
        error, 
        isArray: Array.isArray(publicaciones),
        length: publicaciones?.length 
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Cargando proyectos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-red-400 text-xl text-center">
                    Error: {error}
                    <br />
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    // Validación EXTRA para asegurar que publicaciones es un array
    if (!publicaciones || !Array.isArray(publicaciones) || publicaciones.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-xl text-center">
                    {category ? `No hay proyectos en la categoría "${category}"` : "No hay proyectos disponibles"}
                    <br />
                    <Link 
                        to="/gallery" 
                        className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Ver todos los proyectos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cnt-wrp p-4 mt-16">
            {/* Mostrar categoría activa */}
            {category && (
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Proyectos de {category}
                    </h1>
                    <p className="text-gray-400">
                        Mostrando {publicaciones.length} proyecto{publicaciones.length !== 1 ? 's' : ''}
                    </p>
                    <Link 
                        to="/gallery" 
                        className="text-blue-400 hover:text-blue-300 underline mt-2 inline-block"
                    >
                        ← Ver todos los proyectos
                    </Link>
                </div>
            )}
            
            <div className="grid grid-cols-12 gap-x-[10px] gap-y-[10px]">
                {/* Validación adicional antes del map */}
                {Array.isArray(publicaciones) && publicaciones.map((publicacion, index) => {
                    return (
                        <Link 
                            className="col-span-6 xl:col-span-4 4xl:col-span-3" 
                            key={publicacion.id_publicacion || index}
                            to={`/proyecto/${publicacion.id_publicacion}`}
                        >
                            <GalleryCard 
                                name={publicacion.nombre} 
                                type={publicacion.tipo_proyecto} 
                                img={publicacion.portada} 
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Gallery;