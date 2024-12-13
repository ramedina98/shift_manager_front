import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faTicketSimple } from "@fortawesome/free-solid-svg-icons";

interface TurnosItemDisplayProps {
    nombre_paciente: string;
    turno: string;
}

const TurnosItemDisplay: React.FC<TurnosItemDisplayProps> = ({nombre_paciente, turno}) => {

    const divsStyle = " w-1/2 font-medium tracking-wider text-xl";
    const iconsStyle = "mr-2 text-2xl"

    return (
        <div
            className="w-full bg-Light_Grayish_Blue my-3 flex justify-between items-center py-4 px-8 rounded-sm"
        >
            <div
                className={`${divsStyle}`}
            >
                <FontAwesomeIcon icon={faUserCircle} className={`${iconsStyle}`} />
                <span>
                    {nombre_paciente}
                </span>
            </div>
            <div
                className={`${divsStyle}`}
            >
                <FontAwesomeIcon icon={faTicketSimple} className={`${iconsStyle}`} />
                <span>
                    {turno}
                </span>
            </div>
        </div>
    );
}

export default TurnosItemDisplay;