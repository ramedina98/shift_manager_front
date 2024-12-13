import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IconProps{
    icon: IconDefinition;
    classname?: string;
}

const Icon: React.FC<IconProps> = ({ icon, classname}) => {
    return <FontAwesomeIcon icon={icon} className={`${classname}`}/>
}

export default Icon;