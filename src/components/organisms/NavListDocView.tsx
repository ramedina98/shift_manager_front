import React from "react";
import NavItem from "../molecules/NavItem";
import { faRightFromBracket, faStethoscope, faGear } from "@fortawesome/free-solid-svg-icons";

interface NavBarProps {
    clickHandler(btn: string): void;
}

const NavListDocView: React.FC<NavBarProps> = ({ clickHandler }) => {

    // style settings...
    const classSetting: string = "text-Dark_Bl cursor-pointer hover:shadow-sm rounded-md transition-all hover:bg-Muted_Blue hover:text-White w-full h-20 flex flex-col justify-center items-center";
    const iconClassSetting: string = "text-2xl py-1"
    const textClassSetting: string = "text-md tracking-wider py-1";



    return (
        <ul
            className="border-t-2 border-b-2 border-Dark_Grayish_Blue text-Light_Grayish_Blue w-full px-3 py-4 flex flex-col justify-between items-cente"
            style={{ minHeight: '220px'}}
        >
            <NavItem
                icon={faStethoscope}
                label="Consultorio"
                className={classSetting}
                iconClassName={iconClassSetting}
                textClassName={textClassSetting}
                onClick={() => clickHandler('office')}
            />
            <NavItem
                icon={faGear}
                label="Ajustes"
                className={classSetting}
                iconClassName={iconClassSetting}
                textClassName={textClassSetting}
                onClick={() => clickHandler('setting')}
            />
            <NavItem
                icon={faRightFromBracket}
                label="Cerrar Sesión"
                className={classSetting}
                iconClassName={iconClassSetting}
                textClassName={textClassSetting}
                onClick={() => clickHandler('logout')}
            />
        </ul>
    );
};

export default NavListDocView;