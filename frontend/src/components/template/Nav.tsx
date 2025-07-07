import { useState } from "react";
import './Nav.css';
import { Link, useNavigate  } from "react-router-dom";
import  { useAuth } from "../../contexts/AuthContext";

const Nav = ({
}: any) => {
  const { user,logout } = useAuth();

const [sinistrosAberto, setSinistrosAberto] = useState(false);
const [usuariosAberto, setUsuariosAberto] = useState(false);
const navigate = useNavigate();

const handleSinistrosClick = () => {
    setSinistrosAberto(!sinistrosAberto);
};

const handleUsuariosClick = () => {
    setUsuariosAberto(!usuariosAberto);
}

    return (
        <aside className="menu-area">
            <nav className="menu">

                <Link to="/home">
                    <i className="fa fa-home"></i> Início
                </Link>
                
                {(user?.role === "ADMIN") && (
               <div className="menu-item">
                 <button
                   className="menu-link sinistros-button"
                   onClick={handleUsuariosClick}
               >
                  <i className="fa fa-bars" aria-hidden="true"></i> Usuários
               </button>
                    {usuariosAberto && (
                   <div className="submenu">
                   <Link to="/usuarios" className="submenu-link">
                     <i className="fa fa-user-o" aria-hidden="true"></i>Usuários Pendentes
                   </Link>
                 
                   <Link to="/" className="submenu-link">
                     <i className="fa fa-users" aria-hidden="true"></i>Usuários Ativos
                   </Link>
                 </div>
                   )}
               </div>
                )}
                
                   {(user?.role === "ADMIN" || user?.role === "REGULADOR" || user?.role === "OFICINA") && (
               <div className="menu-item">
               <button
                   className="menu-link sinistros-button"
                    onClick={handleSinistrosClick}
               >
                  <i className="fa fa-paperclip" aria-hidden="true"></i> Sinistros
               </button>
                 {sinistrosAberto && (
                   <div className="submenu">
                   <Link to="/sinistros" className="submenu-link">
                     <i className="fa fa-car" aria-hidden="true"></i>Sinistros
                   </Link>
                 
                   <Link to="/cobrancas" className="submenu-link">
                     <i className="fa fa-calendar" aria-hidden="true"></i>Cobranças
                   </Link>
                 </div>
                   )}
           </div>
            )}

                    <Link to="/conta">
                        <i className="fa fa-users"></i> Minha Conta
                    </Link>

                <button className="btn btn-link deslogar" onClick={logout}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i> Deslogar
                </button>
            </nav>
        </aside>
    );
};

export default Nav;