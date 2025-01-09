import React from "react";
import NavItem from "../molecules/NavItem";
import { faForward, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface NavBarProps {
    activeProccess?: boolean;
    clickHandler(btn: string): void;
}

const NavListControlsDoc: React.FC<NavBarProps> = ({ activeProccess, clickHandler }) => {

    // style settings...
    const classSetting: string = "text-Dark_Bl cursor-pointer hover:shadow-sm rounded-md transition-all hover:bg-Muted_Blue hover:text-White w-full h-20 flex flex-col justify-center items-center";
    const iconClassSetting: string = "text-2xl py-1"
    const textClassSetting: string = "text-md tracking-wider py-1";



    return (
        <ul
            className="border-b-2 border-Dark_Grayish_Blue text-Light_Grayish_Blue w-full h-80 px-3 py-4 flex flex-col justify-between items-cente"
        >
            <div
                className="w-full py-4 text-center font-semibold tracking-wider text-3xl text-Dark_Blue"
            >
                <span>
                    Controles
                </span>
            </div>
            <NavItem
                icon={faForward}
                label={activeProccess ? "En proceso" : "Tomar Turno"}
                className={classSetting}
                iconClassName={iconClassSetting}
                textClassName={textClassSetting}
                onClick={activeProccess ? () => console.log("Espere proceso") : () => clickHandler('next')}
            />
            <NavItem
                icon={faCircleCheck}
                label={"Finalizar Turno"}
                className={classSetting}
                iconClassName={iconClassSetting}
                textClassName={textClassSetting}
                onClick={activeProccess ? () => console.log("En proceso") : () => clickHandler('finish')}
            />
        </ul>
    );
};

export default NavListControlsDoc;