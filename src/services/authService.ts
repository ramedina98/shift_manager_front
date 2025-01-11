import { ISissionData, IUserNoId, INoUserIdandPasswordRequired, INoUserIdPasswordandFotoRequired, IUserPasswords } from "../interfaces/IUser";
import axios from "axios";

const api_url =  import.meta.env.VITE_API_URL_AUTH;
const api_url_user =  import.meta.env.VITE_API_URL_USER;

// fetch usernames and emails...
const usernamesEmails = async (): Promise<{status: number, message: string, data: any[]} | null> => {
    if (!api_url) {
        console.error("API URL is not defined in environment variables.");
        return null;
    }

    try {
        const response: any = await axios.get(`${api_url}/users-emails/`);

        // handle the cases...
        if(response.status === 400){
            return { status: 400, message: 'Data not found.', data: []}
        } else{
            return {status: 200, message: 'Data found.', data: response.data.usersAndEmails }
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Error en el fetching";
        return { status, message, data: []};
    }
}

const user = async (token: string | null): Promise<{ status: number; message?: string, data?: INoUserIdandPasswordRequired }> => {
    if(token === null){
        return {
            status: 400,
            message: 'Token no proporcionado'
        }
    }

    try {
        const response = await axios.get(`${api_url_user}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if(response.status === 404){
            return {
                status: 404,
                message: 'Usuario no encontrado.'
            }
        }

        return {
            status: 200,
            data: response.data.result
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Error en el fetching";
        return { status, message };
    }
}

// this services helps me to update the info of a specific user...
const updateAUser = async (token: string | null, data: INoUserIdPasswordandFotoRequired): Promise<{ status: number; message?: string, data?: any[] }> => {
    try {
        const response = await axios.put(
            `${api_url_user}/update/`,
            {data},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if(response.status === 400){
            return {
                status: 400,
                message: response.data.error
            }
        } else if(response.status === 404){
            return {
                status: 404,
                message: response.data.message
            }
        }

        return {
            status: 200,
            message: response.data.message
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Error en el fetching";
        return { status, message };
    }
}

const passwordsUpdated = async (token: string | null, passData: IUserPasswords): Promise<{ status: number; message?: string, data?: any[]}> => {
    try {
        const response = await axios.patch(`${api_url_user}/update-password/`,
            {passwords: passData},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if(response.status === 400){
            return {
                status: 400,
                message: response.data.error
            }
        } else if(response.status === 401 || response.status === 404){
            return {
                status: response.status,
                message: response.data.message
            }
        }

        return {
            status: 200,
            message: response.data.message
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Error en el fetching";
        return { status, message };
    }
}

// to register a new user...
const register = async (data: IUserNoId): Promise<{ status: number; message: string }> => {
    // check if user data has been recived...
    if(!data){
        throw new Error('Datos no proporcionados');
    }

    try {
        const response = await axios.post(`${api_url}/new-user/`, {new_user: data});
        return { status: response.status, message: response.data.message };
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Error en el registro";
        return { status, message };
    }
}

// to login...
const login = async (user_name: string, password: string, num_consultorio: number): Promise<any | never> => {
    // check if username and password was provided...
    if(!user_name || !password){
        throw new Error("Por favor ingrese su nombre de usuario y contraseña.");
    }

    // create the ISIssionData object...
    const session_data: ISissionData = { user_name, password };

    try {
        // fetch the login andpoint...
        const response = await axios.post(`${api_url}/login/`, {session_data, num_consultorio}, { withCredentials: true });

        if(response.status === 200){
            return response.data;
        }

    } catch (error: any) {
        // handle specific HTTP status codes...
        if(error.response){
            const { status } = error.response;

            if(status === 404){
                throw new Error("Usuario no encontrado. Por favor verifique sus credenciales.")
            } else if(status === 402){
                throw new Error("Contraseña incorrecta. Intente de nuevo.");
            } else if(status === 401){
                throw new Error("Consultorio ocupado.");
            } else if(status === 400){
                throw new Error("Seleccione un consultorio valido.");
            }
        }

        throw new Error(error.response?.data?.message || "Ocurrió un error en el servicio de inicio de sesión.");
    }

}

// logout service
const logout = async (token: string): Promise<void> => {
    // check if the token has been reciving...
    if(!token){
        throw new Error('Token no proporcionado.');
    }
    const id_office: string | null = localStorage.getItem('office');

    try {
        const response = await axios.post(
            `${api_url}/logout/`,
            {id_asig_consul: id_office}, // empty body...
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true, // to send cookies like refreshToken...
            }
        );

        if (response.status === 201) {
            return; // success...
        } else if (response.status === 400) {
            throw new Error("Token expirado o incorrecto.");
        } else if (response.status === 404) {
            throw new Error("Refresh token no encontrado.");
        } else {
            throw new Error(`Error inesperado: ${response.status} - ${response.statusText}`);
        }
    } catch (error: any) {
        if (error.response) {
            const serverMessage = error.response.data?.message || "Error desconocido del servidor.";
            throw new Error(`Error al cerrar sesión: ${serverMessage}`);
        }
        throw new Error(`Error de red o inesperado: ${error.message}`);
    }
}

// this function handle the process of recoverd the password...
const recoverPassword = async (user_name: string): Promise<{status: number, message: string}> => {
    try {
        const response = await axios.post(`${api_url}/recover-password/`, {user_name});

        if(response.status === 422){
            return { status: 422, message: response.data.message };
        }

        return { status: 200, message: response.data.message };
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Error al generar código";
        return { status, message };
    }
}

// This function is to reset the password...
const resetPassword = async (token: string, newpassword: string): Promise<{status: number, message: string}> => {
    try {
        const response = await axios.put(`${api_url}/reset-forgoten-password/`, {token, newPass: newpassword});

        if(response.status === 400){
            return { status: 400, message: response.data.mesage }
        }

        return { status: 200, message: response.data.message }
    } catch (error: any){
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || "Error al cambiar la contraseña";
        return { status, message };
    }
}

export default { usernamesEmails, user, updateAUser, passwordsUpdated, register, login, logout, recoverPassword, resetPassword };