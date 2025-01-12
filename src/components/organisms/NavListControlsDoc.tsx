import React, { useState } from "react";
import NavItem from "../molecules/NavItem";
import { faForward, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface NavBarProps {
    activeProccess?: boolean;
    schActiveProcess?: boolean;
    fnActiveProcess?: boolean;
    clickHandler(btn: string): void;
}

const NavListControlsDoc: React.FC<NavBarProps> = ({ schActiveProcess, activeProccess, fnActiveProcess, clickHandler }) => {
    const [isSpecialist, setIsSpecialist] = useState<boolean>(false);

    // style settings...
    const classSetting: string = "text-Dark_Bl cursor-pointer hover:shadow-sm rounded-md transition-all hover:bg-Muted_Blue hover:text-White w-full h-16 flex flex-col justify-center items-center";
    const iconClassSetting: string = "text-2xl py-1"
    const textClassSetting: string = "text-md tracking-wider";



    return (
        <ul
            className="border-b-2 border-Dark_Grayish_Blue text-Light_Grayish_Blue w-full px-3 py-4 pb-6 flex flex-col justify-between items-cente"
            style={{ height: isSpecialist ? '360px' : '450px'}}
        >
            <div
                className="w-full py-2 text-center font-semibold tracking-wider text-3xl text-Dark_Blue"
            >
                <span>
                    Controles
                </span>
            </div>
            <div
                className="flex justify-center items-center"
            >
                <button
                    className="border-b-2 px-2 mb-6 font-light text-sm tracking-wider transition-all duration-300 hover:border-b-Dark_Blue hover:text-White"
                    onClick={() => setIsSpecialist(!isSpecialist)}
                >
                    {isSpecialist ? "General" : "Especialista"}
                </button>
            </div>
            {(!isSpecialist) && (
                <NavItem
                    icon={faForward}
                    label={activeProccess ? "En proceso" : "Turno General"}
                    className={classSetting}
                    iconClassName={iconClassSetting}
                    textClassName={textClassSetting}
                    onClick={activeProccess ? () => console.log("Espere proceso") : () => clickHandler('next')}
                />
            )}
            <NavItem
                icon={faForward}
                label={schActiveProcess ? "En proceso" : "Turno Citado"}
                className={classSetting}
                iconClassName={iconClassSetting}
                textClassName={textClassSetting}
                onClick={schActiveProcess ? () => console.log("Espere proceso") : () => clickHandler('citado')}
            />
            <NavItem
                icon={faCircleCheck}
                label={fnActiveProcess ? "En proceso" : "Finalizar Turno"}
                className={classSetting}
                iconClassName={iconClassSetting}
                textClassName={textClassSetting}
                onClick={fnActiveProcess ? () => console.log("En proceso") : () => clickHandler('finish')}
            />
        </ul>
    );
};

export default NavListControlsDoc;