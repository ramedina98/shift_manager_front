import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Label from "../atoms/Label";
import Output from "../atoms/Output";
import Icon from "../atoms/Icon";

interface LabelInputProps {
    icon: IconDefinition;
    iconClassName: string;
    labelText: string;
    labelClassname: string;
    inputId: string;
    value?: string;
}

const LabelOutput: React.FC<LabelInputProps> = ({ icon, iconClassName, labelText, labelClassname, value, inputId }) => {
    return (
        <div
            className="bg-Grayish_Blue rounded-md flex flex-col justify-start shadow-md"
            style={{ width: '250px'}}
        >
            <div>
                <Icon icon={icon} classname={iconClassName} />
                <Label classname={labelClassname} htmlFor={inputId}>
                    {labelText}
                </Label>
            </div>
            <Output>
                {value}
            </Output>
        </div>
    );
}

export default LabelOutput;