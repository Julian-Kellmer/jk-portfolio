# Julian Kellmer - Portfolio Web 🚀

Este proyecto es un portfolio web interactivo e inmersivo para Julian Kellmer, construido con tecnologías modernas como **Next.js 15**, **React 19**, **GSAP** y **Three.js**. Está diseñado para ofrecer una experiencia altamente visual, destacando los proyectos a través de animaciones fluidas y soporte para gráficos 3D mediante WebGL.

---

## 🛠 Tecnologías Principales

- **Framework:** Next.js 15 (App Router)
- **Frontend:** React 19, Tailwind CSS 4, CSS Modules
- **Animaciones:** GSAP (GreenSock) para transiciones fluidas e interacciones avanzadas.
- **Gráficos 3D:** Three.js para la renderización inmersiva y experiencias WebGL personalizadas.

---

## 📂 Estructura del Proyecto

La organización del proyecto sigue una arquitectura moderna apoyada en el *App Router* de Next.js. Las carpetas más relevantes son:

```text
julian_kellmer/
│
├── app/                      # Rutas y páginas (Next.js App Router)
│   ├── AboutMe/              # Sección "Sobre Mí" con sus propios hooks y componentes
│   ├── gallery/              # Página principal de la galería
│   ├── project/[slug]/       # Ruta dinámica para visualizar los detalles de cada proyecto
│   ├── globals.css           # Estilos globales y capas de Tailwind
│   ├── layout.tsx            # Layout principal de la aplicación
│   └── page.tsx              # Landing page o entry point
│
├── src/                      # Código fuente principal, componentes y lógica
│   ├── components/           # Componentes reutilizables de UI
│   │   ├── Header.tsx        # Cabecera interactiva y menú de navegación
│   │   └── InfinityGallery/  # Galería principal (Contiene la lógica de scroll infinito y lista)
│   ├── lib/                  # Librerías y utilidades (ej. data cruda de los proyectos)
│   │   └── gallery-data.js   # Base de datos local con la información de los proyectos
│   └── webgl/                # Lógica de renderizado 3D y simulaciones (Three.js)
│       ├── core/             # Base del motor 3D
│       ├── interaction/      # Interacciones del usuario con elementos 3D del canvas
│       ├── math/             # Utilidades matemáticas para WebGL
│       ├── shaders/          # Shaders personalizados (GLSL)
│       └── world/            # Escenas, entornos y elementos visuales 3D
│
└── public/                   # Archivos estáticos, texturas, íconos (ej. logo)
```

---

## ✨ Secciones y Funcionamiento Interactivo

El portfolio se ha pensado como una "experiencia" web, destacando los siguientes módulos iteractivos:

### 1. Cabecera (Header) Global
- Actúa como la barra de navegación principal de toda la aplicación.
- Construido para integrarse sin interrumpir las animaciones globales del sitio (menú modal/desplegable controlado mediante estados).

### 2. Galería Infinita (Infinity Gallery)
- **Ubicación:** `src/components/InfinityGallery`
- **Funcionamiento:** Es el núcleo visual del sitio. Utiliza un estilo de lista o carrusel infinito aprovechando **GSAP** para crear movimientos de cámara/scroll limpios y profesionales.
- Se nutre dinámicamente de los datos estáticos proporcionados en `src/lib/gallery-data.js`.

### 3. Visualización de Proyectos (`/project/[slug]`)
- Rutas dinámicas manejadas de forma nativa por Next.js App Router.
- Al hacer clic en un proyecto desde la galería, se produce una transición hacia la vista de detalle del proyecto en particular (por ejemplo, mostrando imágenes de alta resolución, descripciones, cliente y tecnologías utilizadas).

### 4. Entorno 3D y WebGL
- **Ubicación:** `src/webgl/`
- **Funcionamiento:** Toda la magia del fondo, efectos granulares, deformaciones o modelos tridimensionales del portfolio es orquestada por este módulo. La interacción del mouse (`interaction/`), el comportamiento visual (a través de los `shaders/`), y la estructura del mundo visual (`world/`) dotan de vida orgánica al sitio, interactuando en tiempo real con la posición del cursor o el desplazamiento del menú.

### 5. Sección "Sobre mí" (About Me)
- Ruta principal en `/AboutMe`.
- Contiene su propia lógica interna, enfocándose en la narrativa personal, con componentes dedicados a la biografía y a la experiencia del autor.

---



