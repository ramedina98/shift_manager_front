import React, { useState } from "react";
import { faUserAlt, faCircleUser, faLock, faStethoscope} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LabelInput from "../molecules/LabelInput";
import IconHolder from "../molecules/IconHolder";
import Button from "../atoms/Button";

const LoginForm: React.FC = () => {
    const [verPass, setVerPass] = useState<boolean>(false);
    const [loginInfo, setLoginInfo] = useState({    username: '', password: '', consultorio: 0});
    const [userLabel, setUserLabel] = useState('Nombre de usuario');
    const [passwordLabel, setPasswordLabel] = useState('Contraseña');
    const [consultorioLabel, _setConsultorioLabel] = useState('Medicos: Ingresar Num. consultorio');

    const { login } = useAuth();

    const navigate = useNavigate();

    // classnames variables...
    const inputsStyles = { // input, label and icons...
        iconStyle: 'text-Dark_Grayish_Blue text-2xl ml-2 mr-2 mt-4',
        labelStyle: 'text-Dark_Grayish_Blue text-md tracking-wider mr-3 mt-4',
        inputStyle: 'w-96 m-2 py-3 px-4 rounded-md outline-none text-Dark_Grayish_Blue font-medium tracking-wider',
    }
    // buttons styles...
    const loginButton = 'py-3 w-96 m-3 rounded-md text-md tracking-wider';

    // function to handle the inputs value...
    const inputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        switch(name){
            case 'username':
                if(value.trim() === ""){
                    setUserLabel("No espacios en blanco");
                } else{
                    setUserLabel("Nombre de usuario");
                    setLoginInfo((prev) => ({
                        ...prev,
                        username: value.trim()
                    }));
                }
            break;

            case 'password':
                if(value.trim() === ""){
                    setPasswordLabel("No espacios en blanco");
                } else{
                    setPasswordLabel("Contraseña");
                    setLoginInfo((prev) => ({
                        ...prev,
                        password: value.trim()
                    }));
                }
            break;

            case 'consultorio':
                setLoginInfo((prev) => ({
                    ...prev,
                    consultorio: Number(value)
                }));
        }
    }

    // function to handle the buttons...
    const buttonsHandler = async (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
        e.preventDefault();
        switch(type){
            case 'login':
                await login(loginInfo.username.trim(), loginInfo.password.trim(), loginInfo.consultorio);
            break;

            case 'nuevo':
                // redirect to the register new user form...
                navigate("nuevo");
            break;
            case 'forgot':
                navigate("recover-password");
            break;
            case 'pass':
                setVerPass(!verPass);
            break;
        }
    }

    return (
        <form
            className="bg-Grayish_Blue shadow-md rounded-md flex flex-col justify-start items-center p-8 my-11"
            style={{ width: "clamp(230px, 90%, 670px)", height: "auto", minHeight: "400px" }}
        >
            <IconHolder icon={faUserAlt} iconClassname={'text-Light_Grayish_Blue text-5xl'} holderColor="#1d3245" holderSize="98px"/>
            <div
                className="my-5 py-4 px-3 bg-Light_Grayish_Blue h-auto flex flex-col justify-start items-center rounded-md"
                style={{ width: '90%' }}
            >
                {/** Username*/}
                <LabelInput
                    icon={faCircleUser}
                    iconClassName={inputsStyles.iconStyle}
                    labelText={userLabel}
                    labelClassname={inputsStyles.labelStyle}
                    inputClassname={inputsStyles.inputStyle}
                    inputId={'userName'}
                    inputName={'username'}
                    inputMax={50}
                    inputType={'text'}
                    placeholder={'Ingrese su username: eje(sanJose98)'}
                    inputHanler={inputsHandler}
                />
                {/**Password*/}
                <LabelInput
                    icon={faLock}
                    iconClassName={inputsStyles.iconStyle}
                    labelText={passwordLabel}
                    labelClassname={inputsStyles.labelStyle}
                    inputClassname={inputsStyles.inputStyle}
                    inputId={'Password'}
                    inputName={'password'}
                    inputMax={50}
                    inputType={verPass ? 'text' : 'password'}
                    placeholder={'Ingrese su contraseña: eje(******)'}
                    inputHanler={inputsHandler}
                />
                {/**Consultorio */}
                <LabelInput
                    icon={faStethoscope}
                    iconClassName={inputsStyles.iconStyle}
                    labelText={consultorioLabel}
                    labelClassname={inputsStyles.labelStyle}
                    inputClassname={inputsStyles.inputStyle}
                    inputId={'Consultorio'}
                    inputName={'consultorio'}
                    inputMax={50}
                    min={1}
                    inputType={'number'}
                    placeholder={'Numero de consultorio'}
                    inputHanler={inputsHandler}
                />
                <div
                    className="mt-5 w-96 flex justify-between items-center py-2"
                >
                    <Button classname="text-sm font-extralight tracking-wider py-1 px-3 rounded-md hover:bg-Grayish_Blue hover:text-White transition-colors" onClick={(e) => buttonsHandler(e, 'pass')}>{'Ver contraseña'}</Button>
                    <Button classname="text-sm font-extralight tracking-wider py-1 px-3 rounded-md hover:bg-Grayish_Blue hover:text-White transition-colors" onClick={(e) => buttonsHandler(e, 'forgot')}>{'Olvide mi contraseña'}</Button>
                </div>
                {/**Btns */}
                <Button classname={`${loginButton} bg-Dark_Blue text-White mt-10 hover:bg-Dark_Grayish_Blue transition-colors`} onClick={(e) => buttonsHandler(e, 'login')}>{'Iniciar Sesión'}</Button>
            </div>
        </form>
    );
}

export default LoginForm;