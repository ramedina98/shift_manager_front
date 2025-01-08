import React, { useEffect, useState } from "react";
import { useShift } from "../../contexts/ShiftContext";
import { IAsignados, ICitas, IConsultas } from "../../interfaces/IShift";
import DisplayTurnos from "../organisms/DisplayTurnos";
import DisplayCitados from "../organisms/DisplayCitados";
import DisplayAsignados from "../organisms/DisplayAsignado";

interface ViewerProps {
    changeDisplay: boolean;
}

const Viewer: React.FC<ViewerProps> = ({ changeDisplay }) => {
    const { fetchedShifts, newShiftMessage } = useShift();

    const [listaCitados, setListaCitados] = useState<ICitas[]>(fetchedShifts.citas);
    const [listaTurnos, setListaTurnos] = useState<IConsultas[]>(fetchedShifts.consultas);
    const [listaAsignados, setListaAsignados] = useState<IAsignados[]>(fetchedShifts.asignados);

    // each time a message is recieved from the web socket, the data lists are updated...
    useEffect(() => {
        const updateListsData = () => {
            setListaCitados(fetchedShifts.citas);
            setListaTurnos(fetchedShifts.consultas);
            setListaAsignados(fetchedShifts.asignados);
        }

        updateListsData();

    }, [newShiftMessage, fetchedShifts]);

    return (
        <div
            className="p-6 bg-Dark_Blue rounded-md shadow-md mt-2 mb-4 flex flex-wrap justify-between items-start gap-4"
            style={{ width: 'clamp(210px, 90%, 1350px)', minHeight: '77vh' }}
        >
            {changeDisplay ?
            (
                <DisplayAsignados data={listaAsignados} />
            ) :
            (
                <>
                    <DisplayTurnos data={listaTurnos} />
                    <DisplayCitados data={listaCitados} />
                </>
            )}
        </div>
    )
}

export default Viewer;