/**
 * Auth context taht maintains the global state of the user and the session token. This context
 * will allow us to verify if the user is athenticated and redirect the user accordingly...
 */
import React, {createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { IAuthContextType } from "../interfaces/IAuthInterfaces";
import { IEmailUsername, IUserNoId, UserDataFields, INoUserIdandPasswordRequired, INoUserIdPasswordandFotoRequired, IUserPasswords } from "../interfaces/IUser";
import extractUserInfo from "../utils/authUtils";
import authService from '../services/authService';

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [consultorio, setConsultorio] = useState<number>(0);
    const [status, setStatus] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string| null>(null);
    const [usernameEmails, setUsernameEmails] = useState<IEmailUsername | any[]>([]);
    const [popUpNoti, setPopUpNoti] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // protected routes...
    const protectedRoutes = ["/medico", "/visualizador"];

    useEffect(() => {
        // check if there is a token in the localStorage...
        const savedToken: string | null = localStorage.getItem('token');

        if(protectedRoutes.includes(location.pathname)){
            if(savedToken){
                setToken(savedToken);
                setIsAuthenticated(true);
            } else{
                navigate("/inicio");
            }
        }
    }, [location.pathname]);

    /**Fetch the username and emails data, then validate it in the form and make sure that the
    new user does not repeat these fields that someone else already has...*/
    useEffect(() => {
        const fetchUsernamesEmails = async () => {
            try {
                const response = await authService.usernamesEmails();

                if(response !== null){
                    if(response?.status === 400){
                        setUsernameEmails([]);
                    } else{
                        setUsernameEmails(response.data)
                    }
                }
            } catch (error: any) {
                console.error("Registro fallido:" + error.message);
            }
        }

        if(location.pathname === '/inicio/nuevo'){
            fetchUsernamesEmails();
        }

    }, [location.pathname]);

    const userData = async (): Promise<INoUserIdandPasswordRequired | undefined> => {
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const { status, message, data}: { status: number; message?: string, data?: INoUserIdandPasswordRequired } = await authService.user(token);
            if(status === 404){
                if(message){
                    setErrorMessage(message);
                }
            }

            return data;
        } catch (error: any) {
            console.error("Proceso fallido:", error.message);
            setErrorMessage(`Proceso fallido: ${error.message}`);
        }
    }

    const updateUserData = async (userData: INoUserIdPasswordandFotoRequired): Promise<void> => {
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            const { status, message }: { status: number; message?: string, data?: any[] } = await authService.updateAUser(token, userData);

            if(status === 404 || status === 404){
                if(message){
                    setErrorMessage(message);
                }
            } else if(status === 200){
                if(message){
                    setSuccessMessage(message);
                }
            }
        } catch (error: any) {
            console.error("Proceso fallido:", error.message);
            setErrorMessage(`Proceso fallido: ${error.message}`);
        }
    }

    const updatePassword = async (passData: IUserPasswords): Promise<void> => {
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            const { status, message }: { status: number; message?: string, data?: any[] } = await authService.passwordsUpdated(token, passData);

            if(status === 400 || status === 401 || status === 404){
                if(message){
                    setErrorMessage(message);
                }
            } else if(status === 200){
                if(message){
                    setSuccessMessage(message);
                }
            }
        } catch (error: any) {
            console.error("Proceso fallido:", error.message);
            setErrorMessage(`Proceso fallido: ${error.message}`);
        }
    }

    const newUserRegister = async (newUser_data: IUserNoId): Promise<void> => {
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            const { status, message } = await authService.register(newUser_data);

            switch (status) {
                case 422:
                    setErrorMessage("Los datos proporcionados no son válidos. Por favor, verifica la información.");
                    break;
                case 406:
                    setErrorMessage("El usuario ya tiene una cuenta activa. Usa tus credenciales para iniciar sesión.");
                    break;
                case 201:
                    setSuccessMessage(message);
                    navigate("/inicio");
                    break;
                default:
                    setErrorMessage("Ocurrió un error inesperado. Por favor, intenta más tarde.");
            }

        } catch (error: any) {
            console.error("Registro fallido:", error.message);
            setErrorMessage(`Registro fallido: ${error.message}`);
        }
    }

    const login = async (user_name: string, password: string, num_consultorio: number): Promise<void> => {
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            // call authService to auth the user...
            const data = await authService.login(user_name, password, num_consultorio);

            //save this...
            setConsultorio(num_consultorio);

            // if the login was sucessful, set the state of the session...
            setToken(data.accessToken);
            setIsAuthenticated(true);

            // storage the token into the localStorage to future access...
            localStorage.setItem("token", data.accessToken);
            // storage the office num...
            localStorage.setItem("office", data.id_asig_consul);

            setErrorMessage("");
            setSuccessMessage(`${user_name} iniciaste sesión con exito`);

            // decoded token to retrived the rol of the user...
            const rol: string | null = await extractUserInfo(data.accessToken, UserDataFields.ROL);

            if(rol === null){
                setErrorMessage("Ocurrio un error, intente nuevamente.");
            }

            switch(rol?.toLocaleLowerCase()){
                case "medico":
                    setStatus(true);
                    // redirect the user to the main view...
                    navigate("/medico");
                    break;
                case "cajero":
                    navigate("/crear-turnos");
            }
        } catch (error: any) {
            console.error("Inicio de sesión fallido:", error.message);
            setErrorMessage(error.message);
        }
    };

    const logout = async (): Promise<void> => {
        setErrorMessage(null);
        setSuccessMessage(null);

        if(!token){
            setErrorMessage('No token available for logout.');
            return;
        }

        try {
            await authService.logout(token);

            setStatus(false);
            setSuccessMessage("Sesión cerrada exitosamente.");
            setTimeout(() => {
                // clean the state variables...
                setToken(null);
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }, 1500);
        } catch (error: any) {
            console.error("Error al intentar cerrar sesión:", error.message);

            // Mensaje de error para mostrar al usuario
            const userMessage =
                error.message === "Token expirado o incorrecto."
                    ? "El token ha expirado o no es válido. Por favor, inicia sesión nuevamente."
                    : error.message === "Refresh token no encontrado."
                    ? "No se pudo encontrar el token de refresco. Intenta nuevamente."
                    : "Hubo un error inesperado al intentar cerrar sesión.";

            setErrorMessage(userMessage);
        }
    }

    const recoverPassword = async (user_name: string): Promise<void> => {
        setErrorMessage(null);
        setSuccessMessage(null);
        // check if username has been reciving...s
        if(!user_name){
            setErrorMessage("Proporcione nombre de usuario");
            return;
        }

        try {
            const {status, message} = await authService.recoverPassword(user_name);

            switch(status){
                case 422:
                    setErrorMessage(message);
                    break;
                case 200:
                    setPopUpNoti(message);
                    navigate("/inicio/resetpassword");
                    break;
                default:
                    setErrorMessage("Ocurrió un error inesperado. Por favor, intenta más tarde.");
            }
        } catch (error: any) {
            console.error("Proceso fallido:", error.message);
            setErrorMessage(`Proceso fallido: ${error.message}`);
        }
    }

    const resetPassword = async (token: string, newPass: string): Promise<void> => {
        setErrorMessage(null);
        setSuccessMessage(null);
        // check if the user provideds the token and the new password...
        if(!token || !newPass){
            setErrorMessage("Token o nueva contraseña faltantes, ¡ingrese los datos!");
            return;
        }

        try {
            const { status, message } = await authService.resetPassword(token, newPass);

            if(status === 400){
                setErrorMessage(message);
                return;
            }

            setSuccessMessage(message);
            navigate("/inicio");
            return;
        } catch (error: any) {
            console.error("Reset fallido:", error.message);
            setErrorMessage(`Reset fallido: ${error.message}`);
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            token,
            consultorio,
            setConsultorio,
            status,
            errorMessage,
            setErrorMessage,
            successMessage,
            setSuccessMessage,
            usernameEmails,
            popUpNoti,
            setPopUpNoti,
            updatePassword,
            newUserRegister,
            login,
            logout,
            recoverPassword,
            resetPassword,
            userData,
            updateUserData
        }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = (): IAuthContextType => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider.');
    }
    return context;
}