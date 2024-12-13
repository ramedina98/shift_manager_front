import React from "react";

interface TextProps {
    children: string;
    classname?: string;
}

const Text: React.FC<TextProps> = ({ children, classname}) => {
    return <span className={`${classname}`}>{children}</span>;
}

export default Text;