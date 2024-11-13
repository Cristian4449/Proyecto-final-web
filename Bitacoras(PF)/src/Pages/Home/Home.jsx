import React from 'react';
import './Home.css';

const Home = () => {
    let id = 1;

    if (id === 0) {
        return (
            <div className="home-container">
                <header className="home-header">
                    <span>Cerrar sesión</span>
                    <span>Investigadores</span>
                </header>
                <h1>Home</h1>
                <div className="button-group">
                    <button>Crear Bitácora</button>
                </div>
                <div className="log-list">
                    <p>Lista de Bitácoras</p>
                </div>
            </div>
        );
    }

    return (
        <div className="home-container">
            <header className="home-header">
                <span>Cerrar sesión</span>
                <span>Admin</span>
            </header>
            <h1>Home</h1>
            <div className="button-group">
                <button>Crear Bitácora</button>
                <button>Gestionar usuarios</button>
            </div>
            <div className="log-list">
                <p>Lista de Bitácoras</p>
            </div>
        </div>
    );
};

export default Home;
