import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Home from "./Pages/Home/Home";
import CrearBitacora from "./Components/CrearBitacora/CrearBitacora";
import DetalleEspecies from "./Components/DetallesEspecies/DetallesEspecies";
import Spinner from "./Components/Spinner";
import { useCheckBackend } from "./hooks/useCheckBackend";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import "./App.css";

function App() {
  const { backendReady, loading } = useCheckBackend();

  if (loading) {
    return <Spinner />;
  }

  if (!backendReady) {
    return (
      <div className="backend-error-container">
        <p className="backend-error-message">
          El backend no está disponible, por favor intenta más tarde o contacta con los administradores.
        </p>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/crear-bitacora" element={<CrearBitacora />} />
            <Route path="/detalle-especies" element={<DetalleEspecies />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
