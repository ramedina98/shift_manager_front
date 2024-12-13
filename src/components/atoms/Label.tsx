import React from "react";

interface LabelProps {
    children: string;
    classname?: string;
    htmlFor?: string,
}

const Text: React.FC<LabelProps> = ({ children, classname, htmlFor }) => {
    return <label className={`${classname}`} htmlFor={htmlFor}>{children}</label>;
}

export default Text;