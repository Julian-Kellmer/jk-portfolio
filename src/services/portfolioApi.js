// src/services/portfolioApi.js
const API_BASE = 'http://localhost/agencia-multimedial'; // ← Cambia esta URL

class PortfolioApiService {
    async getPublicaciones() {
        const response = await fetch(`${API_BASE}/publicaciones.php`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    }

    async getPublicacion(id) {
        const response = await fetch(`${API_BASE}/publicacion.php?id=${id}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    }
}

export const portfolioApiService = new PortfolioApiService();