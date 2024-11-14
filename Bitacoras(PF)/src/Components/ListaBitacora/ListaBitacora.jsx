import React, { useState } from 'react';
import './ListaBitacora.css';

const ListaBitacoras = () => {
    const [filterCriteria, setFilterCriteria] = useState('');

    const bitacoras = [
        { id: 1, nombre: 'Bitácora 1', fecha: '2024-01-01' },
        { id: 2, nombre: 'Bitácora 2', fecha: '2024-02-01' },
        { id: 3, nombre: 'Bitácora 3', fecha: '2024-03-01' },
    ];

    // Filtrar las bitacoras según el criterio seleccionado
    const filteredBitacoras = bitacoras.filter(bitacora => {
        if (filterCriteria === 'fecha') {
            return bitacora.fecha; // Filtrar solo por fecha
        } else if (filterCriteria === 'titulo') {
            return bitacora.nombre; // Filtrar solo por título
        }
        return true; // Si no hay filtro, muestra todas las bitácoras
    });

    return (
        <div id="lista-bitacoras-body">
            <div id="lista-bitacoras-container">
                <div id='titulo'>
                    <h1>Lista de Bitácoras</h1>
                </div>
                <div id="filter-sort-buttons">
                    {/* Select para elegir el criterio de filtrado */}
                    <select
                        onChange={(e) => setFilterCriteria(e.target.value)}
                        id="filter-select"
                    >
                        <option value="">Seleccionar Filtro</option>
                        <option value="fecha">Fecha</option>
                        <option value="titulo">Título</option>
                    </select>

                    {/* Botón para ordenar */}
                    <button id="sort-button">Ordenar por Fecha</button>
                </div>
                <div id="bitacoras-list">
                    {filteredBitacoras.map((bitacora) => (
                        <div key={bitacora.id} className="bitacora-item">
                            <span>{bitacora.nombre}</span>
                            <div className="action-buttons">
                                <button className="edit-button">Editar</button>
                                <button className="delete-button">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListaBitacoras;
