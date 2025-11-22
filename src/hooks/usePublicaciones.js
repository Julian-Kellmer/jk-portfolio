// hooks/usePublicaciones.js
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePublicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                setLoading(true);
                setError(null);
                
                let url = 'http://localhost/agencia-multimedial/publicaciones.php';
                if (category) {
                    url += `?category=${encodeURIComponent(category)}`;
                }
                
                console.log('Fetching from:', url);
                
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                
                const result = await response.json();
                console.log('Full API response:', result);
                
                // CORRECCIÓN: Extraer el array 'data' del objeto de respuesta
                let proyectosData = [];
                
                if (result && result.success && Array.isArray(result.data)) {
                    proyectosData = result.data;
                } else {
                    console.warn('Unexpected API response structure:', result);
                    proyectosData = [];
                }
                
                console.log('Proyectos data to use:', proyectosData);
                
                // Aplicar filtro por categoría si existe
                let filteredData = proyectosData;
                if (category && proyectosData.length > 0) {
                    filteredData = proyectosData.filter(publicacion => {
                        const tipoProyecto = publicacion.tipo_proyecto?.toLowerCase().trim();
                        const categoryLower = category.toLowerCase().trim();
                        return tipoProyecto === categoryLower;
                    });
                }
                
                console.log('Final filtered data:', filteredData);
                setPublicaciones(filteredData);
                
            } catch (err) {
                console.error('Error fetching publicaciones:', err);
                setError(err.message);
                setPublicaciones([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPublicaciones();
    }, [category]);

    return { publicaciones, loading, error, category };
};