import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "/assets/sanjoseLogo.png";
import AcronymLogo from "../molecules/AcronymLogo";

const Header: React.FC = () => {
    const location = useLocation();
    const [isHome, setIsHome] = useState<boolean>(false);

    useEffect(() => {
        if(location.pathname === "/shift-display"){
            setIsHome(true);
        } else {
            setIsHome(false);
        }
    }, [location.pathname]);

    return(
        <header
            className="w-full bg-white shadow-md flex justify-center items-center"
        >
            <div
                className="py-4 flex justify-between items-center"
                style={{ width: "82%" }}
            >
                <figure
                    className="w-Wlogo h-Hlogo shadow- flex justify-center items-center rounded-full"
                >
                    <img
                        className={`${isHome ? "w-2/3 h-2/3" : "w-Wlogo h-Hlogo "}object-cover rounded-full`}
                        src={isHome ? "https://static.thenounproject.com/png/3574480-200.png" : logo}
                        alt=""
                    />
                </figure>
                <AcronymLogo />
            </div>
        </header>
    );
};

export default Header;