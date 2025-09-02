import Main from '../components/template/Main';
import * as yup from "yup";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const Usuarios = () => {
const [usuarios, setUsuarios] = useState<Usuario[]>([]);

 interface Usuario {
  id: number;
  name: string;
  email: string;
}

  const fetchUsuarios = async () => {
    try {
      const response = await Axios.get(`${API_URL}/usuarios/pendentes`);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários pendentes:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios(); 
  }, []);  

return (
    <Main icon="user" title="Usuários Pendentes">
      <div className="p-3">
        
        <div className="d-flex justify-content-between pb-3">
        </div>

        <table className="table table-bordered mt-4">
      <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>          
          </tr>
      </thead>

      <tbody>
         {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.name}</td>
            <td>{usuario.email}</td>
            <th>Ações</th>
          </tr>
   ))}
          </tbody>

        </table>
        
        </div>
    </Main>
  );
};
export default Usuarios;