import React from "react";
import logo from "/assets/sanjoseLogo.png";

const Header: React.FC = () => {
    return(
        <header
            className="w-full bg-Dark_Blue shadow-sm flex justify-center items-center"
        >
            <div
                className="py-3 flex justify-between items-center"
                style={{ width: "78%" }}
            >
                <figure
                    className="w-Wlogo h-Hlogo shadow- flex justify-center items-center rounded-full"
                >
                    <img
                        className="w-Wlogo h-Hlogo object-cover rounded-full"
                        src={logo}
                        alt="" />
                </figure>
                <div
                    className="flex flex-col"
                    style={{ width: '320px', height: 'auto'}}
                >
                    <span
                        className="text-left text-Light_Grayish_Blue font-semibold tracking-wider"
                        style={{ fontSize: '1.6em' }}
                    >
                        Bienvenidos
                    </span>
                    <span
                        className="text-center text-Light_Grayish_Blue font-semibold tracking-wider my-1"
                        style={{ fontSize: '1.3em' }}
                    >
                        Hospital San Jose
                    </span>
                    <span
                        className="text-right text-Light_Grayish_Blue font-semibold tracking-wider"
                        style={{ fontSize: '1.1em' }}
                    >
                        De los Ojos
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;