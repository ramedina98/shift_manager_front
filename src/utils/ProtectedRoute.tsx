import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { IProtectedRouteProps } from "../interfaces/IAuthInterfaces";

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated){
        return <Navigate to="/inicio" />;
    }

    return <>{children}</>
}

export default ProtectedRoute;