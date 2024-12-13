import React, { useState } from "react";
import { faRotateRight, faLock, faKeyboard} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import IconHolder from "../molecules/IconHolder";
import LabelInput from "../molecules/LabelInput";
import Button from "../atoms/Button";
import Timer from "../molecules/Timer";


const ResetPassForm: React.FC = () => {
    const navigate = useNavigate();
    const [tokenInput, setTokenInput] = useState<string>("");
    const [newPass, setNewPass] = useState<string>("");

    const { resetPassword } = useAuth();

    // classnames variables...
    const inputsStyles = { // input, label and icons...
        iconStyle: 'text-Dark_Grayish_Blue text-2xl ml-2 mr-2 mt-4',
        labelStyle: 'text-Dark_Grayish_Blue text-md tracking-wider mr-3 mt-4',
        inputStyle: 'w-96 m-2 py-3 px-4 rounded-md outline-none text-Dark_Grayish_Blue font-medium tracking-wider',
    }
    // buttons styles...
    const loginButton = 'py-3 w-96 m-3 rounded-md text-md tracking-wider';
    //const nuevoUserButton = `${loginButton} `;

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch(name){
            case "token":
                setTokenInput(value);
                break;
            case "newpassword":
                setNewPass(value);
                break;
        }
    }

    // function to handle the buttons...
    const buttonsHandler = async (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
        e.preventDefault();
        if(type === 'reset'){
            try {
                await resetPassword(tokenInput.trim(), newPass.trim());
            } catch (error: any) {
                console.log("Algo salio mal, intente de nuevo: " + error.message);
            }
        }
    }

    const sendTokenAgain = async () => {
        navigate("/inicio/recover-password");
    }

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-Grayish_Blue shadow-md rounded-md flex flex-col justify-start items-center p-8 my-11"
            style={{ width: "clamp(230px, 90%, 670px)", height: "auto", minHeight: "400px" }}
        >
            <IconHolder icon={faRotateRight} iconClassname={'text-Light_Grayish_Blue text-5xl'} holderColor="#1d3245" holderSize="98px"/>
            <Timer time={120} classname="w-64 bg-Light_Grayish_Blue p-2 mt-4 text-Dark_Blue font-medium tracking-wider text-2xl" onTimeEnd={sendTokenAgain}/>
            <div
                className="my-5 py-4 px-3 bg-Light_Grayish_Blue h-auto flex flex-col justify-start items-center rounded-md"
                style={{ width: '90%' }}
            >
                {/** Username*/}
                <LabelInput
                    icon={faKeyboard}
                    iconClassName={inputsStyles.iconStyle}
                    labelText={"Token"}
                    labelClassname={inputsStyles.labelStyle}
                    inputClassname={inputsStyles.inputStyle}
                    inputId={'Token'}
                    inputName={'token'}
                    inputType={'text'}
                    placeholder={'Ingrese el token recivido'}
                    inputHanler={inputHandler}
                />
                <LabelInput
                    icon={faLock}
                    iconClassName={inputsStyles.iconStyle}
                    labelText={"Nueva contraseña"}
                    labelClassname={inputsStyles.labelStyle}
                    inputClassname={inputsStyles.inputStyle}
                    inputId={'NewPassword'}
                    inputName={'newpassword'}
                    inputMax={100}
                    inputType={'password'}
                    placeholder={'Ingrese la nueva contraseña'}
                    inputHanler={inputHandler}
                />
                {/**Btns */}
                <Button classname={`${loginButton} bg-Dark_Blue text-White mt-10 hover:bg-Dark_Grayish_Blue transition-colors`} onClick={(e) => buttonsHandler(e, 'reset')}>{'Cambiar contraseña'}</Button>
            </div>
        </form>
    );
}

export default ResetPassForm;