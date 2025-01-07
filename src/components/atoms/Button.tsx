import React from "react";

interface ButtonProps {
    children?: string;
    classname?: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

const Button: React.FC <ButtonProps> = ({ children, classname, onClick, disabled}) => {
    return <button className={`${classname}`}  onClick={onClick} disabled={disabled}>{children}</button>
}

export default Button;