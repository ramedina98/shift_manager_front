import React, { useEffect, useState } from "react";
import { ICitas } from "../../interfaces/IShift";
import CitasItemsDisplay from "../molecules/CitasItemsDisplay";


interface DisplayCitasProps {
    data: ICitas[];
}

const DisplayCitados: React.FC<DisplayCitasProps> = ({data}) => {
    const [info, setInfo] = useState<ICitas[]>([]);

    useEffect(() => {
        if (!data || data.length === 0) {
            setInfo([]);
            return;
        }

        const cleanDataArray = (): void => {

            const cleanedData: ICitas[] = data
                .map((item: ICitas) => ({
                    nombre_doc: item.nombre_doc,
                    apellido_doc: item.apellido_doc,
                    nombre_paciente: item.nombre_paciente,
                    apellido_paciente: item.apellido_paciente,
                    turno: item.turno,
                    hora_cita: item.hora_cita
                }))
                .filter(item => {
                    const hasInvalidValues = Object.values(item).some(
                        value =>
                            (Array.isArray(value) && value.length === 0) ||
                            value === null ||
                            value === undefined
                    );

                    return !hasInvalidValues;
                });

            if (cleanedData.length > 1) {
                const twoItems = cleanedData.slice(0, 4);
                setInfo(twoItems);
                return;
            }
            setInfo(cleanedData);
        };

        cleanDataArray();
    }, [data]);

    const formatTime = (date: Date): string => {
        if (!(date instanceof Date)) {
            throw new Error("El parámetro debe ser un objeto Date válido.");
        }

        const hours = date.getHours().toString().padStart(2, '0'); // Horas (0-23) en formato 2 dígitos
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Minutos en formato 2 dígitos

        return `${hours}:${minutes} H`;
    };

    return (
        <div
            className="flex flex-col justify-center items-center"
        >
            <div
                className="bg-Muted_Blue w-full mb-2 rounded-t-md py-2 text-center"
            >
                <h2
                    className="font-bold tracking-wide text-3xl"
                >
                    Citas
                </h2>
            </div>
            <div
                className="bg-Grayish_Blue p-3 flex flex-col justify-center items-center"
                style={{ width: '590px', maxHeight: '100vh', overflowY: 'hidden'}}
            >
                {info.map((cita: ICitas, index: number) => (
                    <CitasItemsDisplay
                        key={index}
                        nom_doc={cita.nombre_doc}
                        ape_doc={cita.apellido_doc}
                        nom_patient={cita.nombre_paciente}
                        ape_patient={cita.apellido_paciente}
                        turno={cita.turno}
                        hora={formatTime(new Date(cita.hora_cita))}
                    />
                ))}
            </div>
        </div>
    );
}

export default DisplayCitados;