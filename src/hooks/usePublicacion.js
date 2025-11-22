// src/hooks/usePublicacion.js
import { useState, useEffect } from 'react';
import { portfolioApiService } from '../services/portfolioApi';

export const usePublicacion = (id) => {
    const [publicacion, setPublicacion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPublicacion = async (publicacionId) => {
        if (!publicacionId) return;
        
        try {
            setLoading(true);
            setError(null);
            const response = await portfolioApiService.getPublicacion(publicacionId);
            
            if (response.success) {
                setPublicacion(response.data || null);
            } else {
                throw new Error(response.error || 'Error al cargar la publicación');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching publicación:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchPublicacion(id);
        }
    }, [id]);

    return {
        publicacion,
        loading,
        error,
        refetch: () => fetchPublicacion(id),
    };
};