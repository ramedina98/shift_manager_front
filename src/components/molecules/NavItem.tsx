import React from "react";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface NavItemProps {
    icon: IconDefinition;
    label: string;
    className?: string;
    iconClassName?: string;
    textClassName?: string;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, className, iconClassName, textClassName, onClick }) => {
    return (
        <li
            onClick={onClick}
            className={`${className}`}
        >
            <Icon icon={icon} classname={`${iconClassName}`}/>
            <Text classname={`${textClassName}`}>{label}</Text>
        </li>
    );
}

export default NavItem;