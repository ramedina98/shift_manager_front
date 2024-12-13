import React from "react";

const Footer: React.FC = () => {
    const liStyle = 'font-extralight tracking-wider text-Dark-Blue';
    return (
        <div
            className="bg-Muted_Blue w-full py-11 flex justify-center items-center"
        >
            <ul
                className="flex justify-between items-center"
                style={{ width: '85%'}}
            >
                <li className={`${liStyle}`}>© 2024 HOSPITAL SAN JOSÉ DE LOS OJOS</li>
                <li className={`${liStyle}`}>Versión 1.0.0.0</li>
            </ul>
        </div>
    );
}

export default Footer;