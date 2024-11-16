import React, { useState } from 'react';
import './EditarUsuario.css';

const EditarUsuario = () => {
    const [selectedRole, setSelectedRole] = useState(''); // Estado para manejar el rol seleccionado

    return (
        <div id="editar-usuario-body">
            <div id="editar-usuario-container">
                <div id='titulo'>
                    <h2>Editar Usuario</h2>
                </div>
                <div id="usuario-info">
                    <input
                        type="text"
                        defaultValue="Usuario 1"
                        id="usuario-nombre"
                        readOnly
                    />
                </div>
                <div id="nuevo-rol">
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        id="rol-select"
                    >
                        <option value="">Nuevo Rol</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Investigador">Investigador</option>
                        <option value="Colaborador">Colaborador</option>
                    </select>
                </div>
                <div id="botones">
                    <button id="back-button">
                        Atrás
                    </button>
                    <button id="save-button">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditarUsuario;
