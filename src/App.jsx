import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Home from "./Pages/Home/Home";
import CrearBitacora from "./Components/CrearBitacora/CrearBitacora";
import DetalleEspecies from "./Components/DetallesEspecies/DetallesEspecies";
import Spinner from "./Components/Spinner";
import { useCheckBackend } from "./hooks/useCheckBackend";
import "./App.css";

function App() {
  const { backendReady, loading } = useCheckBackend();

  if (loading) {
    return <Spinner />;
  }

  if (!backendReady) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">
          El backend no está disponible, por favor intenta más tarde.
        </p>
      </div>
    );
  }
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crear-bitacora" element={<CrearBitacora />} />
            <Route path="/detalle-especies" element={<DetalleEspecies />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
