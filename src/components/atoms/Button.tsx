import React from "react";

interface ButtonProps {
    children?: string;
    classname?: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC <ButtonProps> = ({ children, classname, onClick }) => {
    return <button className={`${classname}`}  onClick={onClick}>{children}</button>
}

export default Button;