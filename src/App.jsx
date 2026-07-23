import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import AppPage from "./pages/AppPage";
import Contacto from "./pages/Contacto";
import Galeria from "./pages/Galeria";
import Recompensas from "./pages/Recompensas";

import ProtectedRoute from "./Auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/nosotros" element={<AboutUs />} />
      <Route path="/app" element={<AppPage />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/recompensas" element={<Recompensas />} />
    </Routes>
  );
}

export default App;