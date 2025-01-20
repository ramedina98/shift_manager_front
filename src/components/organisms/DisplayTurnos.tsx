import React, { useEffect, useState } from "react";
import { IConsultas } from "../../interfaces/IShift";
import TurnosItemDisplay from "../molecules/TurnosItemDisplay";

interface DisplayTurnosProps {
    data: IConsultas[];
}

const DisplayTurnos: React.FC<DisplayTurnosProps> = ({data}) => {
    const [info, setInfo] = useState<IConsultas[]>([]);

    useEffect(() => {
        if (!data || data.length === 0) {
            setInfo([]);
            return;
        }

        const cleanDataArray = (): void => {
            if(data.length > 10){
                let twoItems: IConsultas[] = [];
                twoItems.push(data[0]);
                twoItems.push(data[1]);
                twoItems.push(data[2]);
                twoItems.push(data[3]);
                twoItems.push(data[4]);
                twoItems.push(data[5]);
                twoItems.push(data[6]);
                twoItems.push(data[7]);
                twoItems.push(data[8]);
                twoItems.push(data[9]);

                setInfo(twoItems);
                return;
            }

            setInfo(data);
        }

        cleanDataArray();
    }, [data]);

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
                    Turnos en espera
                </h2>
            </div>
            <div
                className="bg-Muted_Blue p-3 px-2 flex flex-col justify-center items-center"
                style={{ width: '580px', maxHeight: '100vh', overflowY: 'hidden'}}
            >
                {info.map((turno: IConsultas, index: number) => (
                    <TurnosItemDisplay
                        key={index}
                        nombre_paciente={`${turno.nombre_paciente} ${turno.apellido_paciente}`}
                        turno={`${turno.turno}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default DisplayTurnos;