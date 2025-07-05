
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import { useState, useEffect } from "react";
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from '../routes/PrivateRoute';

import { useAuth } from "../contexts/AuthContext";
import type { Role } from "../contexts/AuthContext";

// Páginas do projeto
import Home from '../pages/Home';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Sinistros from '../pages/Sinistros';
import Usuarios from '../pages/Usuarios';

//Template do projeto
import Footer from "../components/template/Footer";
import Nav from "../components/template/Nav";
import Logo from '../components/template/Logo';

const App = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isCadastroPage = location.pathname === "/cadastro";

  // Mostra loading enquanto verifica a autenticação
  if (isLoading) {
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f8f9fa',
        color: '#495057'
      }}>
        <div className="spinner" style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e9ecef',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <div style={{ fontSize: '16px', fontWeight: '500' }}>Carregando...</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route element={<PrivateRoute roles={["ADMIN", "OFICINA" as Role]} />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route element={<PrivateRoute roles={["ADMIN" as Role]} />}>
        <Route path="/usuarios" element={<Usuarios />} />
      </Route>

      <Route element={<PrivateRoute roles={["OFICINA", "ADMIN" as Role]} />}>
        <Route path="/sinistros" element={<Sinistros />} />
      </Route>

      <Route path="/" element={
        user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  if (isLoginPage || isCadastroPage) {
    return (
      <div className="login-layout">
        <div className="content">
          {routes}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Logo />
      <Nav />
      {routes}
      <Footer />
    </div>
  );
};

export default App;