import React, { useEffect, useState } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import bell from "/assets/bell-172780.mp3";
import "../../styles/index.css";

interface PopUpProps {
    title: string;
    message: string;
    code: number;
    color: string;
    icon_title: IconDefinition | null;
}

const PopUpNotificationShift: React.FC<PopUpProps> = ({title, message, code, color, icon_title}) => {
    const [icon, setIcon] = useState<IconDefinition>(faXmark);

    useEffect(() => {
        const playAudioOnMount = (): void => {
            const audio = new Audio(bell);
            audio.play().catch((error) => {
                console.error("Error al reproducir el audio: ", error);
            });
        }

        if(code === 1){
            playAudioOnMount();
        }

        if(icon_title !== null){
            setIcon(icon_title);
        }
    }, []);

    return (
        <div
            className="glass_efect z-50 flex justify-center items-center"
            style={{width: '100%', height: '100vh', position: 'fixed' }}
        >
            <div
                className={`${color} rounded-md shadow-md flex flex-col justify-start items-center`}
                style={{width: 'clamp(210px, 90%, 550px)', minHeight: '150px', maxHeight: '450px' }}
            >
                <div
                    className="border-b-2 border-b-Light_Grayish_Blue w-full px-4 py-3 shadow-md text-Dark_Blue flex justify-start items-end"
                >
                    <FontAwesomeIcon
                        icon={icon}
                        className="text-4xl mr-4"
                    />
                    <h2
                        className="font-bold text-2xl tracking-wider"
                    >
                        {title}
                    </h2>
                </div>
                <div
                    className="w-full h-auto px-4 py-6 text-Dark_Blue text-center font-semibold text-2xl"
                >
                    {message}
                </div>
            </div>
        </div>
    );
}

export default PopUpNotificationShift;