import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/HomePage'
import Offers from './pages/Offers'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
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
        <Route path="/offers" element={<Offers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<div>Página no encontrada</div>} />
        <Route path="/proyecto/:projectId" element={<WorkDetail />} />
      </Routes>
    </Suspense>
  )

}

export default App
