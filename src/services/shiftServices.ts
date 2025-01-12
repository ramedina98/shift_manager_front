/**
 * @module ShiftContext
 *
 * In this file containt all the services needed to handle the process of ShiftContext
 * module...
 */
import { IAsignados, IfinishConsultationData, IPacienteCitado, IPacienteNoId, IShiftData, IShifts } from "../interfaces/IShift";
import axios from "axios";
import { IDoctosList } from "../interfaces/IUser";

const api_url =  import.meta.env.VITE_API_URL_SHIFT;
const api_url_user =  import.meta.env.VITE_API_URL_USER;

// shift all the registers (consultation, quoted and assigned)...
const fetchingShifts = async (): Promise<{ status: number, message?: string, data?: IShifts }> => {
    try {
        const data = await axios.get(`${api_url}/`);

        return {
            status: 200,
            data: data.data
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        return { status, message: error.response.data.message };
    }
}

// this services fetch the needed data...
const fetchLastShiftService = async (token: string | null): Promise<{ status: number, message?: string, data?: string }> => {
    if(token === null){
        return {
            status: 400,
            message: 'Token no proporcionado.'
        }
    }

    try {
        const response = await axios.get(`${api_url}/last-shift/`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return {
            status: 200,
            message: response.data.message,
            data: response.data.data
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        return { status, message: error.response.data.message };
    }
}

// services to obtain the current patient...
const currentPatient = async (token: string | null): Promise<{ status: number, message?: string, data?: IAsignados }> => {
    // check if the token was provided...
    if(token === null){
        return {
            status: 400,
            message: 'Token no proporcionado.'
        }
    }

    try {
        // fetch data...
        const response = await axios.get(`${api_url}/current-shift/`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const data: IAsignados = response.data.shift;
        return {
            status: 200,
            message: `El turno actual es ${data.turno}, con ${data.nombre_paciente} ${data.apellido_paciente}`,
            data: data
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        return { status, message: error.response.data.message };
    }
}

// This services is for create a new shift in the data base...
const newPatient = async (patientData: IPacienteNoId | IPacienteCitado): Promise<{ status: number, message?: string, data?: IShiftData }> => {
    try {
        // fetch data...
        const response = await axios.post(`${api_url}/newShift/`, {patien_data: patientData});

        return {
            status: 201,
            message: response.data.response.message,
            data: response.data.response.shiftData
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        return { status, message: error.response.data.error };
    }
}

// This service is for assign a new schedule patient clciking a button...
const schedulePatient = async (token: string | null): Promise<{status: number, message?: string, data?: IAsignados}> => {
    // check of the token was provieded...
    if(token === null){
        return {
            status: 400,
            message: 'Token no proporcionado.'
        }
    }

    try {
        // fetch data...
        const response = await axios.post(`${api_url}/schedule-patient/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        const data: IAsignados = response.data.shift;
        return {
            status: 200,
            message: `Turno asignado ${data.turno}, con ${data.nombre_paciente} ${data.apellido_paciente}`,
            data: data
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        return { status, message: error.response.data.message };
    }
}

// this services is for assigne a new patient clicking a button...
const nextPatient = async (token: string | null): Promise<{ status: number, message?: string, data?: IAsignados }> => {
    // check if the token was provided...
    if(token === null){
        return {
            status: 400,
            message: 'Token no proporcionado.'
        }
    }

    try {
        // fetch data...
        const response = await axios.post(`${api_url}/next-shifts/`,
            {},
            {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const data: IAsignados = response.data.shift;
        return {
            status: 200,
            message: `Turno asignado ${data.turno}, con ${data.nombre_paciente} ${data.apellido_paciente}`,
            data: data
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        return { status, message: error.response.data.message };
    }
}

// This services helps in the process of finish a consultaion, calling the api (route), finish-sift...
const finishConsultation = async (token: string | null, finishConsultationData: IfinishConsultationData): Promise<{ status: number, message?: string, data?: IAsignados }> => {
    // check if the token was provided...
    if(token === null){
        return {
            status: 400,
            message: 'Token no proporcionado.'
        }
    }

    if(!finishConsultationData){
        return {
            status: 404,
            message: 'Datos para el reporte no proporcionados'
        }
    }

    try {
        const response = await axios.delete(`${api_url}/finish-shift/`, {
            data: {
                id_consulta: finishConsultationData.id_consulta,
                id_asignacion: finishConsultationData.id_asignacion,
                dataReport: finishConsultationData.dataReport,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            status: 200,
            message: response.data.message
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        return { status, message: error.response.data.error };
    }
}

const updateNumOffice = async (token: string | null , id_asign_consu: string | null, num: number): Promise<{ status: number, message?: string, data?: any[] }> => {
    try {
        const response = await axios.put(
            `${api_url_user}/update-office/`,
            {
                id_asign_consu,
                num_consultorio: num,
            },
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
        }

        return {
            status: 200,
            message: response.data.message
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        return { status, message: 'Error en el fetching.' };
    }
}

const listOfDoctors = async (token: string | null): Promise<{ status: number, message?: string, data?: IDoctosList[] }> => {
    if(token === null){
        return {
            status: 400,
            message: 'Token no proporcionado.'
        }
    }

    try {
        const response = await axios.get(`${api_url_user}/doctors/`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if(response.status === 404){
            return {
                status: 404,
                message: response.data.error
            }
        }

        return {
            status: 200,
            message: response.data.message,
            data: response.data.data
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        return { status, message: error.response.data.error };
    }
}
export {
    fetchingShifts,
    currentPatient,
    schedulePatient,
    nextPatient,
    finishConsultation,
    newPatient,
    updateNumOffice,
    listOfDoctors,
    fetchLastShiftService
};