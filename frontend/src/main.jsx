import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import NotAuthPage from './pages/NotAuthPage.jsx'
import PokemonAdminFormPage from './pages/PokemonAdminFormPage.jsx'
import ItemAdminFormPage from './pages/ItemAdminFormPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/notauth' element={<NotAuthPage />} />
        <Route path='/admin/pokemon/:pokemonId' element={<PokemonAdminFormPage />} />
        <Route path='/admin/pokemon' element={<PokemonAdminFormPage />} />
        <Route path='/admin/item/:itemId' element={<ItemAdminFormPage />} />
        <Route path='/admin/item' element={<ItemAdminFormPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
