import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faHouseMedical } from "@fortawesome/free-solid-svg-icons";

interface AsignadosItemDisplayProps {
    turno: string;
    num_consultorio: number
}

const AsignadosItemDisplay: React.FC<AsignadosItemDisplayProps> = ({turno, num_consultorio}) => {

    const divsStyle = " w-1/2 font-medium tracking-wider text-xl";
    const iconsStyle = "mr-2 text-2xl"

    return (
        <div
            className="w-full bg-Light_Grayish_Blue my-3 flex justify-between items-center py-4 px-8 rounded-sm"
            style={{ width: "540px"}}
        >
            <div
                className={`${divsStyle}`}
            >
                <FontAwesomeIcon icon={faCalendarCheck} className={`${iconsStyle}`} />
                <span>
                    Turno: {turno}
                </span>
            </div>
            <div
                className={`${divsStyle}`}
            >
                <FontAwesomeIcon icon={faHouseMedical} className={`${iconsStyle}`} />
                <span>
                    Consultorio: {num_consultorio}
                </span>
            </div>
        </div>
    );
}

export default AsignadosItemDisplay;