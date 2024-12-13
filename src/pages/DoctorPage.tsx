import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useShift } from "../contexts/ShiftContext";
import { faWarning, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Notification from "../components/molecules/Notification";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import NavBarDocView from "../components/templates/NavBarDocView";
import UpdateUserInfo from "../components/templates/UpdateUserInfo";
import UpdateOfficeInfo from "../components/templates/UpdateOfficeInfo";
import CurrentShiftPatientDoc from "../components/templates/CurrentShiftPatientDoc";

const DoctorPage: React.FC = () => {
    const [settings, setSettings] = useState<boolean>(false);
    const [office, setOffice] = useState<boolean>(false);

    const { shiftMessageError, shiftMessageSuccess } = useShift();
    const { errorMessage, successMessage } = useAuth();

    // close notification handler...
    const closeHandlerNotification = (): void => {}
    return (
        <div
            className=""
        >
            {/**settings form */}
            {(settings) && (
                <UpdateUserInfo
                    settings={settings}
                    setSettings={setSettings}
                />
            )}
            {/**office form */}
            {(office) && (
                <UpdateOfficeInfo
                    office={office}
                    setOffice={setOffice}
                />
            )}
            <Header />
            <main
                className="w-full bg-Light_Grayish_Blue flex justify-start items-center"
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
                <NavBarDocView
                    settings={settings}
                    setSettings={setSettings}
                    office={office}
                    setOffice={setOffice}
                />
                <CurrentShiftPatientDoc />
            </main>
            <Footer />
        </div>
    );
}

export default DoctorPage;