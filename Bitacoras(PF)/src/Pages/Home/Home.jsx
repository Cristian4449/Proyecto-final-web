import React from "react";
import "./Home.css";
import Paper from "@mui/material/Paper";

const Home = () => {
    let id = 1;

    const bitacoras = [
        { id: 1, nombre: 'Bitácora 1', fecha: '2024-01-01' },
        { id: 2, nombre: 'Bitácora 2', fecha: '2024-02-01' },
        // Agrega más registros aquí según necesites
    ];

    const handleView = () => {
        console.log("Navegando a la nueva vista");
    };

    if (id === 0) {
        return (
            <div id="body">
                <Paper id="home-container">
                    <header id="home-header">
                        <span onClick="" id="logout-button">Cerrar sesión</span>
                        <span>Investigadores</span>
                    </header>
                    <h1 id= "titulo">Home</h1>
                    <div id="button-group">
                        <button>Crear Bitácora</button>
                    </div>
                    <div id="log-list">
                        <p>Lista de Bitácoras</p>
                        <div id="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bitacoras.map((bitacora) => (
                                        <tr key={bitacora.id}>
                                            <td>{bitacora.id}</td>
                                            <td>{bitacora.nombre}</td>
                                            <td>{bitacora.fecha}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                            <button id="view-button" onClick={handleView}>
                            Ir a la lista de bitácoras
                            </button>
                    </div>
                </Paper>
            </div>
        );
    }
    return (
        <div id="body">
            <Paper id="home-container">
                <header id="home-header">
                    <span onClick="" id="logout-button">Cerrar sesión</span>
                    <span>Admin</span>
                </header>
                <h1 id="titulo">Home</h1>
                <div id="button-group">
                    <button>Crear Bitácora</button>
                    <button>Gestionar usuarios</button>
                </div>
                <div id="log-list">
                    <p>Lista de Bitácoras</p>
                    <div id="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bitacoras.map((bitacora) => (
                                    <tr key={bitacora.id}>
                                        <td>{bitacora.id}</td>
                                        <td>{bitacora.nombre}</td>
                                        <td>{bitacora.fecha}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                        <button id="view-button" onClick={handleView}>
                            Ir a la lista de bitácoras
                        </button>
                </div>
            </Paper>
        </div>
    );
};

export default Home;
