import React from "react";
import { useNavigate } from "react-router-dom";
import NavList from "../organisms/NavList";

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const handleTheclickedLi = (type: string) => {
        switch(type){
            // this case handle the process of go to the login form...
            case "sesion":
                navigate("/inicio");
            break;
            // this case handle the process of go to the new user form...
            case "nuevo":
                navigate("/inicio/nuevo");
            break;
            // this case handle the process of go to the visualizer tample...
            case "visualizar":
                navigate("/shift-display");
            break;
            // default case...
            default:
                console.log('Caso invalido.');
            break;
        }
    }

    return (
        <div
            className="bg-Light_Grayish_Blue flex flex-col justify-center items-center"
            style={{ width: '215px', minHeight: '90vh'}}
        >
            <NavList clickHandler={handleTheclickedLi}/>
        </div>
    );
}

export default NavBar;