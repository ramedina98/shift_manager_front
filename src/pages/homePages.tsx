import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { faWarning, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/organisms/Header";
import NavBar from "../components/templates/NavBar";
import Footer from "../components/organisms/Footer";
import Notification from "../components/molecules/Notification";
import PopUpNotification from "../components/molecules/PopUpNotification";

export default function HomePage(){
    const { errorMessage, setErrorMessage, successMessage, setSuccessMessage, popUpNoti } = useAuth();

    // close notification handler...
    const closeHandlerNotification = (): void => {
        setErrorMessage(null);
        setSuccessMessage(null);
    }

    return (
        <div>
            <Header />
            <main
                className="flex"
            >
                {/**This component is a pop up notification... */}
                {popUpNoti !== null && (
                    <PopUpNotification text={popUpNoti} title="El código de recuperación fue enviado" icon={faCheckCircle} />
                )}
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
                <NavBar />
                <div
                    className="border-2 w-full flex justify-center items-center"
                    style={{ minHeight: '90vh' }}
                >
                    < Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}