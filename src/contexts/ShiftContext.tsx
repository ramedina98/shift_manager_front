import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchingShifts, currentPatient, schedulePatient, nextPatient, finishConsultation, newPatient, updateNumOffice, listOfDoctors, fetchLastShiftService } from "../services/shiftServices";
import { useAuth } from "./AuthContext";
import { IAsignados, IfinishConsultationData, IPacienteCitado, IPacienteNoId, IShiftContext, IShifts, IShiftData } from "../interfaces/IShift";
import useWebSocket from "../hooks/useWebSocket";
import { printShiftTicket } from "../services/printerService";
import { IDoctosList } from "../interfaces/IUser";

const wsUrl: string = import.meta.env.VITE_WS_URL;

const ShiftContext = createContext<IShiftContext | undefined>(undefined);

export const ShiftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { messages } = useWebSocket(wsUrl);

    const [fetchedShifts, setFetchedShifts] = useState<IShifts>({citas: [], consultas: [], asignados: []});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [schedulePatientProcess, setSchedulePatientProcess] = useState(false);
    const [finishingShift, setFinishingShift] = useState(false);
    const [currentShift, setCurrentShift] = useState<IAsignados | null>(null);
    const [shiftMessageError, setShiftsMessageError] = useState<string | null>(null);
    const [shiftMessageSuccess, setShiftsMessageSuccess] = useState<string | null>(null);
    const [consultationDate, setConsultationDate] = useState<Date | null>(null);
    const [turno, setTurno] = useState<string>("A0000");
    const [iterator, setItarator] = useState<number>(0);
    const [newShiftMessage, setNewShiftMessage] = useState<{title : string, message: string, code: number} | null>(null);
    //const [ws, setWs] = useState<WebSocket | null>(null);
    const { token, setErrorMessage, setSuccessMessage, setConsultorio } = useAuth();

    useEffect(() => {
        // fetch the consultations, quoted and assigned when loading the context...
        const fetchShifts = async(): Promise<void> => {
            try {
                // start the service and wait for the response...
                const {status, message, data}: {status: number, message?: string, data?: IShifts} = await fetchingShifts();

                // check the status...
                if(status === 404){
                    if(message){
                        console.log(message);
                    }
                } else if(status === 200){
                    if(data){
                        setFetchedShifts(data);
                    }
                }
            } catch (error: any) {
                console.error("fetching fallido:" + error.message);
            }
        }

        fetchShifts();
    }, []);

    useEffect(() => {
        const processWebSocketData = async (): Promise<void>=> {
            if(messages[messages.length - 1].code !== 3){
                setNewShiftMessage({
                    title: messages[messages.length - 1].title,
                    message: messages[messages.length - 1].message,
                    code: messages[messages.length - 1].code
                });
            }

            // create a new object...
            const shiftInfo: IShifts = {
                citas: messages[messages.length - 1].shiftsData.citas,
                asignados: messages[messages.length - 1].shiftsData.asignados,
                consultas: messages[messages.length - 1].shiftsData.consultas
            }

            setFetchedShifts({
                consultas: [],
                asignados: [],
                citas: []
            });
            setFetchedShifts(shiftInfo);

            const time = messages[messages.length - 1].code === 2 ? 2500 : 1500;

            setTimeout(() => {
                setNewShiftMessage(null);
            }, time);
        }

        if(messages.length > 0){
            processWebSocketData();
        }

    }, [messages]);

    const increasesTheNewShift = (turno: string | null): void => {
        const currentShift: string | null = turno;

        if(currentShift === null){
            return;
        }

        // Extraemos la letra y el número
        const letter = currentShift.charAt(0);  // La letra
        const number = currentShift.slice(1);   // La parte numérica

        // Convertimos la parte numérica a número, sumamos 1 y aseguramos que sea de 4 dígitos
        const newNumber = (parseInt(number, 10) + 1).toString().padStart(4, '0');

        // Si el número llega a '9999', incrementamos la letra
        if (newNumber === "0000") {
        const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
        setTurno(`${nextLetter}0000`);  // Cambiamos la letra y reiniciamos el número a '0000'
        } else {
        setTurno(`${letter}${newNumber}`);  // Mantenemos la misma letra y cambiamos solo el número
        }
    }

    const fetchLastShift = async (): Promise<void> => {
        try {
            const {status, message, data}: {status: number, message?: string, data?: string} = await fetchLastShiftService(token);

            if(status === 400 || status === 404){
                console.log(message);
            } else if(status === 200){
                if(data) {
                    increasesTheNewShift(data);
                }
            }
        } catch (error: any) {
            console.error("fetching fallido:" + error.message);
        }
    }

    useEffect(() => {

        if(messages.length > 0){
            increasesTheNewShift(messages[messages.length - 1].turno);
        } else{
            setTimeout(() => {
                fetchLastShift();
            }, 1000);
        }
    }, [messages]);

    useEffect(() => {
        // This function helps me to obtain the current assigned patient of an specific doctor...
        const currentAssignedPatient = async (): Promise<void> => {
            setShiftsMessageError(null);
            setShiftsMessageSuccess(null);

            try {
                const {status, message, data}: {status: number, message?: string, data?: IAsignados} = await currentPatient(token);

                // handle the error status...
                if(status === 200){
                    if(data && message){
                        setCurrentShift(data);
                        setShiftsMessageSuccess(message);
                    }
                }
            } catch (error: any) {
                console.error("fetching fallido:" + error.message);
            }
        }

        const timeOut = setTimeout(async() => {
            currentAssignedPatient();
        }, 1000);

        () => clearTimeout(timeOut);
    }, []);

    // thi functio works together with the function below, it os responsible for making the call to the api...
    const sendingDataNewShift = async (patientData: IPacienteNoId | IPacienteCitado, namePrinter: string): Promise<void> => {

        setIsSubmitting(true);

        try {
            const {status, message, data}: {status: number, message?: string, data?: IShiftData} = await newPatient(patientData);

            // handle the errors status...
            if(status === 400 || status === 404){
                if(message){
                    setShiftsMessageError(message);
                }
            } else if(status === 201){
                if(data && message){
                    setShiftsMessageSuccess(message);
                    printShiftTicket(data, namePrinter);
                }
            }
        } catch (error: any) {
            console.error("fetching fallido:" + error.message);
        } finally {
            setIsSubmitting(false);
        }
    }
    // This function helps me with the process of create a new shift in the data base...
    const createNewShift = async (patientData: IPacienteNoId | IPacienteCitado, namePrinter: string | null): Promise<void> => {
        setShiftsMessageError(null);
        setShiftsMessageSuccess(null);

        if(namePrinter === null || namePrinter === '0'){
            setShiftsMessageError('No hay una impresora seleccionada.');
            if(iterator === 0){
                alert("No hay impresora seleccionada, para continuar de click aqui, y ingrese los datos de nuevo.");
                setItarator(prev => prev + 1);
                return;
            }

            // a name by default...
            await sendingDataNewShift(patientData, "0");
            return;
        }

        await sendingDataNewShift(patientData, namePrinter);
    }

    /**
     * This function helps me to handle the process of assign a new schedule patient...
     */
    const nextSchedulePatient = async (): Promise<void> => {
        setShiftsMessageError(null);
        setShiftsMessageSuccess(null);

        if(currentShift !== null){
            setShiftsMessageError('Ya hay un turno, primero terminelo.');
            return;
        }

        setSchedulePatientProcess(true);

        try {
            const {status, message, data}: {status: number, message?: string, data?: IAsignados} = await schedulePatient(token);

            // handle the error status...
            if(status !== 200){
                if(message){
                    setShiftsMessageError(message);
                }
            } else if(status === 200){
                if(data && message){
                    setCurrentShift(data);
                    setShiftsMessageSuccess(message);
                    setConsultationDate(new Date());
                }
            }
        } catch (error: any) {
            console.error("fetching fallido:" + error.message);
        } finally {
            setSchedulePatientProcess(false);
        }
    }

    /**
     * This function helps me to handle the process of assign a new shift.
     * This process works just when the client click a button...
     *
     * This is for patients that are not scheduled...
     */
    const nextShift = async (): Promise<void> => {
        setShiftsMessageError(null);
        setShiftsMessageSuccess(null);

        if(currentShift !== null){
            setShiftsMessageError('Ya hay un turno, primero terminelo.');
            return;
        }

        setIsSubmitting(true);

        try {
            const {status, message, data}: {status: number, message?: string, data?: IAsignados} = await nextPatient(token);

            // handle the error status...
            if(status !== 200){
                if(message){
                    setShiftsMessageError(message);
                }
            } else if(status === 200){
                if(data && message){
                    setCurrentShift(data);
                    setShiftsMessageSuccess(message);
                    setConsultationDate(new Date());
                }
            }
        } catch (error: any) {
            console.error("fetching fallido:" + error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    // This function handle the process of finish a consultation...
    const finishShift = async (finishConsultationData: IfinishConsultationData): Promise<void> => {
        setShiftsMessageError(null);
        setShiftsMessageSuccess(null);

        if(currentShift === null){
            setShiftsMessageError('No hay turno actual.');
            return;
        }

        setFinishingShift(true);

        try {
            const {status, message}: {status: number, message?: string, data?: any} = await finishConsultation(token, finishConsultationData);

            if(status !== 200){
                if(message){
                    setShiftsMessageError(message);
                }
            } else if(status === 200){
                if(message){
                    setShiftsMessageSuccess(message);
                    setCurrentShift(null);
                }
            }
        } catch (error: any) {
            console.error("fetching fallido:" + error.message);
        } finally {
            setFinishingShift(false);
        }
    }

    const updateOfficeInfo = async (num: number): Promise<void> => {
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const id_asig_consul: string | null = localStorage.getItem("office");
            const {status, message}: {status: number, message?: string, data?: any} = await updateNumOffice(token, id_asig_consul, num);

            if(status === 400){
                if(message){
                    setErrorMessage(message);
                }
            } else if(status === 200){
                if(message){
                    setSuccessMessage(message);
                    setConsultorio(num);
                }
            }
        } catch (error: any) {
            console.error("fetching fallido:" + error.message);
        }
    }

    const doctors = async (): Promise<IDoctosList[] | undefined> => {

        try {
            const {status, message, data}: {status: number, message?: string, data?: IDoctosList[]} = await listOfDoctors(token);

            if(status === 404){
                if(message){
                    console.log(message);
                }
            } else if(status === 200){
                if(data){
                    return data;
                }
            }
        } catch (error: any) {
            console.error("fetching fallido:" + error.message);
        }
    }

    return (
        <ShiftContext.Provider value={{
            fetchedShifts,
            setFetchedShifts,
            createNewShift,
            nextSchedulePatient,
            nextShift,
            finishShift,
            shiftMessageError,
            setShiftsMessageError,
            shiftMessageSuccess,
            setShiftsMessageSuccess,
            consultationDate,
            currentShift,
            setCurrentShift,
            updateOfficeInfo,
            doctors,
            increasesTheNewShift,
            turno,
            newShiftMessage,
            fetchLastShift,
            isSubmitting,
            setIsSubmitting,
            schedulePatientProcess,
            setSchedulePatientProcess,
            finishingShift,
            setFinishingShift
        }}>
            {children}
        </ShiftContext.Provider>
    );
};

export const useShift = (): IShiftContext => {
    const context = useContext(ShiftContext);
    if(!context){
        throw new Error('useShift must be used within a ShiftProvider.')
    }
    return context;
}