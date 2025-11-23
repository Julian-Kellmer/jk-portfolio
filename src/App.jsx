import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import AboutMe from './pages/AboutMe'
// import WorkDetail from './pages/WorkDetail'
import { Suspense, lazy } from 'react';

// Lazy loading de componentes
const WorkDetail = lazy(() => import('./pages/WorkDetail'));

function App() {


  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<div>Página no encontrada</div>} />
        <Route path="/proyecto/:projectId" element={<WorkDetail />} />
      </Routes>
    </Suspense>
  )

}

export default App
