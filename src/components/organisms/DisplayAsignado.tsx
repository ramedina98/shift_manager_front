import React, { useEffect, useState } from "react";
import { IAsignados } from "../../interfaces/IShift";
import AsignadosItemDisplay from "../molecules/AsignadosItemDisplay";

interface DisplayAsignadosProps {
    data: IAsignados[];
}

const DisplayAsignados: React.FC<DisplayAsignadosProps> = ({data}) => {
    const [info, setInfo] = useState<IAsignados[]>([]);

    useEffect(() => {
        if (!data || data.length === 0) {
            setInfo([]);
            return;
        }

        const cleanDataArray = (): void => {
            const cleanedData: IAsignados[] | any = data.filter(item => Array.isArray(item) ? item.length > 0 : true).map((item: IAsignados) => ({
                id_consulta: item.id_consulta,
                nombre_doc: item.nombre_doc,
                apellido_doc: item.apellido_doc,
                nombre_paciente: item.nombre_paciente,
                apellido_paciente: item.apellido_paciente,
                hora_cita: item.hora_cita,
                turno: item.turno,
                consultorio: item.consultorio,
                visita: item.visita,
                create_at: item.create_at,
                id_asignacion: item.id_asignacion
            }));

            setInfo(cleanedData);
        }

        cleanDataArray();
    }, [data]);

    return (
        <div
            className="flex flex-col justify-center items-center"
            style={{ width: '100%'}}
        >
            <div
                className="bg-Muted_Blue w-full mb-2 rounded-t-md py-2 text-center"
            >
                <h2
                    className="font-bold tracking-wide text-3xl"
                >
                    Turnos en consulta
                </h2>
            </div>
            <div
                className="bg-Grayish_Blue p-3 flex flex-wrap gap-x-20 gap-y-4 justify-start items-start pl-9"
                style={{ width: '100%'}}
            >
                {info.map((item, index: number) => (
                    <AsignadosItemDisplay
                    key={index}
                    turno={item?.turno}
                    num_consultorio={item?.consultorio}
                />
                ))}
            </div>
        </div>
    );
}

export default DisplayAsignados;