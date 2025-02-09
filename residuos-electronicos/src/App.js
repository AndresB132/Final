import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Usuarios from './components/Usuarios';
import Ubicaciones from './components/Ubicaciones';
import PuntosRecoleccion from './components/PuntosRecoleccion';
import Home from './components/Home';
import Eventos from './components/Eventos';
import Reciclaje from './components/Reciclaje';
import './App.css'; // Importamos los estilos

function App() {
  return (
    <Router>
      <div>
        {/* 🔹 Barra de Navegación */}
        <nav className="navbar">
          <NavLink to="/" className="nav-link">Inicio</NavLink>
          <NavLink to="/usuarios" className="nav-link">Usuarios</NavLink>
          <NavLink to="/ubicaciones" className="nav-link">Ubicaciones</NavLink>
          <NavLink to="/puntos-recoleccion" className="nav-link">Puntos de Recolección</NavLink>
          <NavLink to="/eventos" className="nav-link">Eventos</NavLink>
          <NavLink to="/reciclaje" className="nav-link">Reciclaje</NavLink>
        </nav>

        {/* 🔹 Rutas de la aplicación */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/ubicaciones" element={<Ubicaciones />} />
          <Route path="/puntos-recoleccion" element={<PuntosRecoleccion />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/reciclaje" element={<Reciclaje />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
