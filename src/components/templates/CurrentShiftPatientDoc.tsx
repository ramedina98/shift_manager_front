import React from "react";
import { useShift } from "../../contexts/ShiftContext";
import { useAuth } from "../../contexts/AuthContext";
import DisplayShiftInfo from "../organisms/DisplayShiftInfo";
import { IAsignados } from "../../interfaces/IShift";

const CurrentShiftPatientDoc: React.FC = () => {
    const { currentShift } = useShift();
    const { consultorio } = useAuth();
    const patientData: IAsignados  | null = {
        id_consulta: 1,
        nombre_doc: `${currentShift?.nombre_doc}`,
        apellido_doc: `${currentShift?.apellido_doc}`, // paterno...
        nombre_paciente: `${currentShift?.nombre_paciente}`,
        apellido_paciente: `${currentShift?.apellido_paciente}`,
        hora_cita: new Date(`${currentShift?.hora_cita}`),
        turno: `${currentShift?.turno}`,
        consultorio: consultorio,
        visita: `${currentShift?.visita}`,
        create_at: new Date(`${currentShift?.create_at}`),
        id_asignacion: `${currentShift?.id_asignacion}`
    }

    return (
        <div
            className="w-full flex justify-center items-center"
            style={{ height: '80vh'}}
        >
            <div
                className="bg-Dark_Grayish_Blue p-6 rounded-md flex flex-col justify-start items-center"
                style={{width: 'clamp(201px, 90%, 650px)', height: 'auto'}}
            >
                <div
                    className="w-full h-auto py-2 mb-4 text-center font-medium text-xl tracking-wider text-Light_Grayish_Blue"
                >
                    <h2>
                        {currentShift !== null ? 'Información del turno actual' : 'No hay turno asignado'}
                    </h2>
                </div>
                {/**Aqui mostramos la información del paciente... */}
                {/**TODO: cambiar esto y agregar la otra vista que se mostrara cuando no haya turnos... */}
                {(currentShift !== null) && (
                    <DisplayShiftInfo
                        data={patientData}
                    />
                )}
            </div>
        </div>
    );
}

export default CurrentShiftPatientDoc;