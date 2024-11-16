import React from 'react';
import './GestionUsuarios.css';

const GestionUsuarios = () => {
    const usuarios = [
        { id: 1, nombre: 'Usuario 1' },
        { id: 2, nombre: 'Usuario 2' },
    ];

    return (
        <div id="gestion-usuarios-body">
            <div id="gestion-usuarios-container">
                <div id='titulo'>
                    <h2>Gestión de Usuarios</h2>
                </div>
                <div id="crear-usuario">
                    <button id="crear-button">
                        Crear Usuario
                    </button>
                </div>
                <div id='tabla'>
                    <table id="usuarios-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.nombre}</td>
                                    <td>
                                        <button className="edit-button">
                                            Editar
                                        </button>
                                        <button className="delete-button">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button id="back-button">
                    Atrás
                </button>
            </div>
        </div>
    );
};

export default GestionUsuarios;
