import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Icon from "../atoms/Icon";

interface LabelInputProps {
    icon: IconDefinition;
    iconClassName: string;
    labelText: string;
    labelClassname: string;
    inputClassname: string;
    inputId: string;
    inputName: string;
    inputMax?: number;
    inputType: string;
    placeholder?: string;
    value?: string;
    inputHanler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBluerHandler?: (e: React.FocusEvent<HTMLInputElement>) => void;
    accept?: string;
}

const LabelInput: React.FC<LabelInputProps> = ({ icon, iconClassName, labelText, labelClassname, inputClassname, inputId, inputName, inputMax, inputType, placeholder, value, inputHanler, onBluerHandler, accept }) => {
    return (
        <div
            className="w-auto h-auto"
        >
            <div>
                <Icon icon={icon} classname={iconClassName} />
                <Label classname={labelClassname} htmlFor={inputId}>
                    {labelText}
                </Label>
            </div>
            <Input classname={inputClassname} name={inputName} id={inputId} type={inputType} max={inputMax} placeholder={placeholder} value={value} onChange={inputHanler} onBlur={onBluerHandler} accept={accept}/>
        </div>
    );
}

export default LabelInput;