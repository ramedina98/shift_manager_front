import React, { useEffect } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

interface PopUpNotificationProps {
    text: string;
    title: string;
    icon: IconDefinition;
}

const PopUpNotification: React.FC<PopUpNotificationProps> = ({ text, title, icon }) => {
    const { setPopUpNoti } = useAuth();

    // after 4 seconds, the pop up notification has to be closed...
    useEffect(() => {
        const timer = setTimeout(() => {
            setPopUpNoti(null);
        }, 6000);

        () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="fixed w-full h-screen flex justify-center items-center glass_efect"
        >
            <div
                className="bg-White shadow-md rounded-md flex flex-col justify-start items-center"
                style={{ width: '550px', height: 'auto' }}
            >
                <div
                    className="w-full h-auto shadow-md flex justify-between items-center py-2 text-1xl text-Dark_Grayish_Blue font-semibold tracking-wider"
                >
                    <div
                        className="flex justify-start items-center"
                    >
                        <Icon icon={icon} classname="mx-3" /> <h3>{title}</h3>
                    </div>
                    <div>
                        <button
                            className="mx-3"
                            onClick={() => setPopUpNoti(null)}
                        >
                            <FontAwesomeIcon icon={faWindowClose} className="text-2xl hover:text-Muted_Blue" />
                        </button>
                    </div>
                </div>
                <div
                    className="w-full h-auto p-4"
                >
                    <Text classname="tracking-wider text-Dark_Grayish_Blue">{text}</Text>
                </div>
            </div>
        </div>
    );
}

export default PopUpNotification;