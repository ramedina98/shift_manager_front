import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconHolderProps {
    icon:IconDefinition;
    iconClassname?: string;
    holderSize?: string;
    holderColor?: string;
}

const IconHolder: React.FC<IconHolderProps> = ({ icon, iconClassname, holderSize, holderColor }) => {
    return(
        <div
            className='rounded-full flex justify-center items-center'
            style={{width: `${holderSize}`, height: `${holderSize}`, backgroundColor: `${holderColor}`}}
        >
            <FontAwesomeIcon icon={icon} className={`${iconClassname}`}/>
        </div>
    );
}

export default IconHolder;