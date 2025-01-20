import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faCalendarCheck} from "@fortawesome/free-solid-svg-icons";
import { useShift } from "../contexts/ShiftContext";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import Viewer from "../components/templates/Viewer";
import PopUpNotificationShift from "../components/molecules/PopUpNotificationShifts";

const ShiftsDisplay: React.FC = () => {
    const { newShiftMessage } = useShift();

    const [changeDisplay, setChangeDisplay] = useState<boolean>(false);

    // style btn...
    const buttonStyle = 'text-white tracking-wider font-medium text-lg py-2 rounded-md';

    return (
        <div>
            {(newShiftMessage !== null) && (
                <PopUpNotificationShift
                    title={newShiftMessage.title}
                    message={newShiftMessage.message}
                    color='bg-Muted_Blue'
                    icon_title={faCalendarCheck}
                    code={newShiftMessage.code}
                />
            )}
            <Header />
            <main
                className="w-full flex justify-center items-center pt-28"
            >
                <div
                    className="bg-Muted_Blue rounded-md flex flex-wrap gap-6 justify-between items-center p-3"
                    style={{ width: '560px', position: 'absolute', top: '160px', left: '70px'}}
                >
                    <Link
                        to="/inicio"
                        className={`bg-Grayish_Blue ${buttonStyle} hover:bg-Light_Grayish_Blue hover:text-Dark_Grayish_Blue transition-colors flex justify-between items-center px-5`}
                        style={{width: '220px'}}
                    >
                        <FontAwesomeIcon icon={faArrowCircleLeft}/>
                        Regresar al inicio
                    </Link>
                    <button
                        className={`bg-Dark_Grayish_Blue ${buttonStyle} hover:bg-Light_Grayish_Blue hover:text-Dark_Grayish_Blue transition-colors flex justify-center items-center px-5`}
                        style={{width: '220px'}}
                        onClick={() => setChangeDisplay(!changeDisplay)}
                    >
                        {changeDisplay ? "Turnos & Citados" : "En Consulta"}
                    </button>
                </div>
                <Viewer changeDisplay={changeDisplay}/>
            </main>
            <Footer />
        </div>
    );
}

export default ShiftsDisplay;