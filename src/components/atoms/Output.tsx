import React from "react";

interface OutputProps {
    children?: string;
}

const Output: React.FC<OutputProps> = ({children}) => {

    return (
        <output
            className="p-2 bg-Dark_Blue mt-2 rounded-b-md text-White"
        >
            {children}
        </output>
    );
}

export default Output;