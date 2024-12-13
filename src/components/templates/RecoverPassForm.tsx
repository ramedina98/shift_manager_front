import React, { useState } from "react";
import { faKey, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import IconHolder from "../molecules/IconHolder";
import LabelInput from "../molecules/LabelInput";
import Button from "../atoms/Button";


const RecoverPassForm: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const { recoverPassword } = useAuth();

    // classnames variables...
    const inputsStyles = { // input, label and icons...
        iconStyle: 'text-Dark_Grayish_Blue text-2xl ml-2 mr-2 mt-4',
        labelStyle: 'text-Dark_Grayish_Blue text-md tracking-wider mr-3 mt-4',
        inputStyle: 'w-96 m-2 py-3 px-4 rounded-md outline-none text-Dark_Grayish_Blue font-medium tracking-wider',
    }
    // buttons styles...
    const loginButton = 'py-3 w-96 m-3 rounded-md text-md tracking-wider';
    //const nuevoUserButton = `${loginButton} `;

    const inputHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }

    // function to handle the buttons...
    const buttonsHandler = async (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
        e.preventDefault();
        if(type === 'forgot'){
            try {
                await recoverPassword(userName.trim());
            } catch (error: any) {
                console.log("Algo salio mal, intente de nuevo: " + error.message);
            }
        }
    }

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-Grayish_Blue shadow-md rounded-md flex flex-col justify-start items-center p-8 my-11"
            style={{ width: "clamp(230px, 90%, 670px)", height: "auto", minHeight: "400px" }}
        >
            <IconHolder icon={faKey} iconClassname={'text-Light_Grayish_Blue text-5xl'} holderColor="#1d3245" holderSize="98px"/>
            <div
                className="my-5 py-4 px-3 bg-Light_Grayish_Blue h-auto flex flex-col justify-start items-center rounded-md"
                style={{ width: '90%' }}
            >
                {/** Username*/}
                <LabelInput
                    icon={faCircleUser}
                    iconClassName={inputsStyles.iconStyle}
                    labelText={"Nombre de usuario"}
                    labelClassname={inputsStyles.labelStyle}
                    inputClassname={inputsStyles.inputStyle}
                    inputId={'userName'}
                    inputName={'username'}
                    inputMax={50}
                    inputType={'text'}
                    placeholder={'Ingrese su username: eje(sanJose98)'}
                    inputHanler={inputHanler}
                />
                {/**Btns */}
                <Button classname={`${loginButton} bg-Dark_Blue text-White mt-10 hover:bg-Dark_Grayish_Blue transition-colors`} onClick={(e) => buttonsHandler(e, 'forgot')}>{'Solicitar Código'}</Button>
            </div>
        </form>
    );
}

export default RecoverPassForm;