import React, { useEffect }from "react"
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/homePages";
import RegisterForm from "./components/templates/RegisterForm";


const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/inicio");
  }, [navigate]);

  return(
    <AuthProvider>
      <Routes>
        <Route path="/inicio" element={<HomePage />} >
          <Route index element={<RegisterForm />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
