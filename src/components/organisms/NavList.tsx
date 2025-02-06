import React from "react";
import NavItem from "../molecules/NavItem";
import { faKey, faEye } from "@fortawesome/free-solid-svg-icons";

interface NavBarProps {
    clickHandler(btn: string): void;
}

const NavList: React.FC<NavBarProps> = ({ clickHandler }) => {

    // style settings...
    const classSetting: string = "text-Dark_Bl cursor-pointer hover:shadow-sm rounded-md transition-all hover:bg-Muted_Blue hover:text-White w-full h-20 flex flex-col justify-center items-center";
    const iconClassSetting: string = "text-2xl py-1"
    const textClassSetting: string = "text-md tracking-wider py-1";



    return (
        <ul
            className="w-full px-3 flex flex-col justify-around items-cente"
            style={{ minHeight: '520px'}}
        >
            <NavItem
                icon={faKey}
                label="Inicio de Sesión"
                className={classSetting}
                iconClassName={iconClassSetting}
                textClassName={textClassSetting}
                onClick={() => clickHandler('sesion')}
            />
            <NavItem
                icon={faEye}
                label="Visualizar Turnos"
                className={classSetting}
                iconClassName={iconClassSetting}
                textClassName={textClassSetting}
                onClick={() => clickHandler('visualizar')}
            />
        </ul>
    );
};

export default NavList;