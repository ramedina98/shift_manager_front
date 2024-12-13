import React from "react"
import { Routes, Route, Navigate} from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext";
import { ShiftProvider } from "./contexts/ShiftContext";
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
