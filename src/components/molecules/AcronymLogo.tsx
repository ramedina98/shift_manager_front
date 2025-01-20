import React from "react";

const AcronymLogo: React.FC = () => {
    return (
        <div
            className="flex flex-row justify-between text-blue-950"
            style={{ width: '400px', height: 'auto'}}
        >
            <span
                className="flex justify-center items-center font-extrabold tracking-wider w-1/3 border-black"
                style={{ fontSize: '2.6em' }}
            >
                HSJ
            </span>
            <span className="py-4 border-r-2 border-Dark_Blue mr-3"></span>
            <span
                className="text-center font-bold tracking-wider w-1/2"
                style={{ fontSize: '1em' }}
            >
                Hospital San Jose Para
                <br/>
                Enfermos de la Vista
                <br/>
                <span
                    className="font-normal italic"
                >
                    Una luz en tu mirada
                </span>
            </span>
        </div>
    )
}

export default AcronymLogo;