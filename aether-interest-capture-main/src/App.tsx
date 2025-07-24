// src/App.tsx
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SpecialistForm from './pages/SpecialistForm'
import NotFound from './pages/NotFound'

function App() {
  return (
    // A tag <Routes> deve envolver todas as suas rotas.
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fale-com-especialista" element={<SpecialistForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App