import React from "react";

interface InputProps {
    classname?: string;
    name?: string;
    id?: string;
    type?: string;
    max?: number;
    placeholder?: string;
    value?: string;
    accept?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC <InputProps> = ({ classname, name, id, type, max, placeholder, value, onChange, onBlur, accept}) => {

    return <input className={`${classname}`} name={name} id={id} type={type} maxLength={max} placeholder={placeholder} onChange={onChange} onBlur={onBlur} value={value} required accept={accept} />
}

export default Input;