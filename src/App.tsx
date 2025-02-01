import React, { useEffect } from "react"
import { Routes, Route, Navigate} from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext";
import { ShiftProvider } from "./contexts/ShiftContext";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDataFields } from "./interfaces/IUser";
import extractUserInfo from "./utils/authUtils";
import HomePage from "./pages/homePages";
import DoctorPage from "./pages/DoctorPage";
import LoginForm from "./components/templates/LoginForm";
import RegisterForm from "./components/templates/RegisterForm";
import RecoverPassForm from "./components/templates/RecoverPassForm";
import ResetPassForm from "./components/templates/ResetPassForm";
import ShiftCreatorPage from "./pages/ShiftCreatorPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import ShiftsDisplay from "./pages/ShiftsDisplay";


const App: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicRoutes = [
      "/inicio",
      "/inicio/nuevo",
      "/inicio/recover-password",
      "/inicio/resetpassword",
      "/shift-display",
    ];

    // TODO: ELIMITAR CUANDO YA NO SE NECESITE...
    console.log("Ruta actual: ", location.pathname);
    const navigateToPage = async (token: string): Promise<void> => {
      try {
        const rol: string | null = await extractUserInfo(token, UserDataFields.ROL);

        if (!rol) {
          console.log("Error al obtener el rol del usuario.");
          navigate("/inicio");
          return;
        }

        switch (rol.toLowerCase()) {
          case "medico":
            navigate("/medico", { replace: true });
            break;
          case "cajero":
            navigate("/crear-turnos", { replace: true });
            break;
          default:
            console.log("Rol no reconocido, redirigiendo a inicio.");
            navigate("/inicio", { replace: true });
            break;
        }
      } catch (error) {
        console.error("Error al verificar el token:", error);
        navigate("/inicio", { replace: true });
      }
    };

    if (token) {
      navigateToPage(token);
    } else {
      // Permitir acceso a las rutas públicas
      if (!publicRoutes.includes(location.pathname)) {
        navigate("/inicio", { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return(
    <AuthProvider>
      <ShiftProvider>
        <Routes>
          <Route path="/inicio" element={<HomePage />} >
            <Route index element={<LoginForm />} />
            <Route path="nuevo" element={<RegisterForm />} />
            <Route path="recover-password" element={<RecoverPassForm />} />
            <Route path="resetpassword" element={<ResetPassForm />} />
          </Route>
          <Route path="/medico" element={<ProtectedRoute><DoctorPage /></ProtectedRoute>} />
          <Route path="/crear-turnos" element={<ProtectedRoute><ShiftCreatorPage /></ProtectedRoute>} />
          <Route path="/shift-display" element={<ShiftsDisplay />} />
          <Route path="*" element={<Navigate to="/inicio" />} />
        </Routes>
      </ShiftProvider>
    </AuthProvider>
  );
};

export default App;
