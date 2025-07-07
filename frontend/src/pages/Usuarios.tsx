import Main from '../components/template/Main';
import * as yup from "yup";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const Usuarios = () => {


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
          </tr>
      </thead>

      <tbody>
          <tr>
            <th>Teste</th>
            <th>Teste@gmail.com</th>
          </tr>
          </tbody>

        </table>
        
        </div>
    </Main>
  );
};
export default Usuarios;