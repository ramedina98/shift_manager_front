import { IDoctosList } from "./IUser";
export interface IShiftContext {
    fetchedShifts: IShifts;
    setFetchedShifts: React.Dispatch<React.SetStateAction<IShifts>>;
    createNewShift: (data: any, namePrinter: string | null) => Promise<void>;
    nextSchedulePatient: () => Promise<void>;
    nextShift: () => Promise<void>;
    finishShift: (finishConsultationData: IfinishConsultationData) => Promise<void>;
    updateOfficeInfo: (num: number) => Promise<void>;
    doctors: () => Promise<IDoctosList[] | undefined>
    increasesTheNewShift: (turno: string | null) => void;
    fetchLastShift: () => Promise<void>;
    numPatients: () => Promise<void>;
    // state variables...
    turno: string;
    shiftMessageError: string | null;
    setShiftsMessageError: React.Dispatch<React.SetStateAction<string | null>>;
    shiftMessageSuccess: string | null;
    setShiftsMessageSuccess: React.Dispatch<React.SetStateAction<string | null>>
    consultationDate: Date | null;
    currentShift: IAsignados | null;
    setCurrentShift: React.Dispatch<React.SetStateAction<IAsignados | null>>;
    newShiftMessage: {title: string, message: string, code: number} | null;
    isSubmitting: boolean;
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    schedulePatientProcess: boolean;
    setSchedulePatientProcess: React.Dispatch<React.SetStateAction<boolean>>;
    finishingShift: boolean;
    setFinishingShift: React.Dispatch<React.SetStateAction<boolean>>;
    numPatientsSch: string | null;
    setNumPatientsSch: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ICitas {
    nombre_doc: string;
    apellido_doc: string; // paterno...
    nombre_paciente: string;
    apellido_paciente: string;
    turno: string;
    hora_cita: Date;
}

export interface IConsultas {
    nombre_paciente: string;
    apellido_paciente: string;
    turno: string;
}

export interface IConsulta {
    id_consulta: number;
    nombre_paciente: string;
    apellido_paciente: string;
    tipo_paciente: string;
    turno: string;
    citado: boolean;
    activo: boolean;
    create_at: Date;
}

export interface IAsignados {
    id_consulta?: number;
    nombre_doc: string;
    apellido_doc: string; // paterno...
    nombre_paciente: string;
    apellido_paciente: string;
    hora_cita?: Date;
    turno: string;
    consultorio: number;
    visita?: string;
    create_at?: Date;
    id_asignacion: string;
}

export interface IShifts {
    citas: ICitas[]; // campo para mostrar citas
    consultas: IConsultas[]; // campos para mostrar los demás turnos en espera
    asignados: IAsignados[]; // campos para mostrar los turnos que estan siendo atendidos...
}

export interface IfinishConsultationData {
    id_consulta?: number;
    id_asignacion: string | null;
    dataReport: {
        consultorio?: number;
        turno?: string;
        nombre_paciente?: string;
        visita?: string;
        fecha_hora: Date | null;
    }
}

export interface IPaciente {
    id_consulta: number;
    nombre_paciente: string;
    apellido_paciente: string;
    tipo_paciente: string;
    turno: string;
    citado: boolean;
    activo: boolean;
}
export interface IPacienteNoId extends Omit<IPaciente, 'id_consulta'>{};
export interface IPacienteCitado extends Omit<IPaciente, 'id_consulta'>{
    id_doc: string;
    nombre_doc: string;
    apellido_doc: string;
    hora_cita: Date;
};

export interface IShiftData {
    paciente_nombre: string;
    turno: string;
    datatime: string;
}