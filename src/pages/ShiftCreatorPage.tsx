import React, { useState, useEffect } from "react";
// import TicketsPrinter from "../components/molecules/TicketsPrinter";
import { useShift } from "../contexts/ShiftContext";
import { useAuth } from "../contexts/AuthContext";
import { faWarning, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Notification from "../components/molecules/Notification";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import UpdateUserInfo from "../components/templates/UpdateUserInfo";
import NewShiftForm from "../components/templates/NewShiftForm";
import useWebSocket from "../hooks/useWebSocket";
import SelectorPrinter from "../components/organisms/SelectorPrinter";

const wsUrl: string = import.meta.env.VITE_WS_URL;

const ShiftCreatorPage: React.FC = () => {
    const { logout } = useAuth();

    const [settings, setSettings] = useState<boolean>(false);
    const [namePrinter, setNamePrinter] = useState<string | null>(null);

    const { shiftMessageError, shiftMessageSuccess, increasesTheNewShift, fetchLastShift} = useShift();
    const { errorMessage, successMessage } = useAuth();
    const { messages } = useWebSocket(wsUrl);

    // style btn...
    const buttonStyle = 'text-white tracking-wider font-medium text-lg py-2 rounded-md';

    // close notification handler...
    const closeHandlerNotification = (): void => {}

    useEffect(() => {

        if(messages.length > 0){
            increasesTheNewShift(messages[messages.length - 1].turno);
        } else{
            setTimeout(() => {
                fetchLastShift();
            }, 1000);
        }
    }, [messages]);

    return (
        <div>
            {/**settings form */}
            {(settings) && (
                <UpdateUserInfo
                    settings={settings}
                    setSettings={setSettings}
                />
            )}
            <Header />
            <main
                className="w-full bg-Light_Grayish_Blue flex justify-center items-center pt-28"
                style={{ minHeight: '80vh' }}
            >
                {/**This component is a notification... */}
                {(errorMessage || successMessage) && (
                    <Notification
                        icon={errorMessage ? faWarning : faCheckCircle}
                        size="280px"
                        color={errorMessage ? "bg-red-500" : "bg-green-500"}
                        title={errorMessage ? "¡Error!" : "¡Éxito!"}
                        text={errorMessage || successMessage}
                        onClose={closeHandlerNotification}
                    />
                )}
                {(shiftMessageError || shiftMessageSuccess) && (
                    <Notification
                        icon={shiftMessageError ? faWarning : faCheckCircle}
                        size="280px"
                        color={shiftMessageError ? "bg-red-500" : "bg-green-500"}
                        title={shiftMessageError ? "¡Error!" : "¡Éxito!"}
                        text={shiftMessageError || shiftMessageSuccess}
                        onClose={closeHandlerNotification}
                    />
                )}
                <div
                    className="bg-Muted_Blue rounded-md flex flex-wrap gap-6 justify-between items-center p-3"
                    style={{ width: '600px', position: 'absolute', top: '160px', left: '70px'}}
                >
                    <button
                        onClick={logout}
                        className={`bg-Grayish_Blue ${buttonStyle} hover:bg-Light_Grayish_Blue transition-colors`}
                        style={{width: '160px'}}
                    >
                        Cerrar Sesión
                    </button>
                    <button
                        onClick={() => setSettings(!settings)}
                        className={`bg-Dark_Blue ${buttonStyle} hover:bg-Dark_Grayish_Blue transition-colors`}
                        style={{width: '160px'}}
                    >
                        Ajustes
                    </button>
                    <SelectorPrinter
                        setNamePrinter={setNamePrinter}
                    />
                </div>
                <NewShiftForm
                    namePrinter={namePrinter}
                />
            </main>
            <Footer />
        </div>
    );
}

export default ShiftCreatorPage;