import React, { useMemo, useState } from "react";
import { faClose, faUserAlt, faUserPlus, faLock, faUserTag, faUserEdit, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { INoUserIdandPasswordRequired, INoUserIdPasswordandFotoRequired } from "../../interfaces/IUser";
import { IUserPasswords } from "../../interfaces/IUser";
import '../../styles/index.css';
import LabelInput from "../molecules/LabelInput";
import IconHolder from "../molecules/IconHolder";
import Button from "../atoms/Button";

interface IUpdateUserInfo {
    settings: boolean;
    setSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateUserInfo: React.FC<IUpdateUserInfo> = ({settings, setSettings}) => {
    const [userLabel, _setUserLabel] = useState('Nombre de usuario');
    const [verPass, setVerPass] = useState<boolean>(false);
    const [passwordLabel, _setPasswordLabel] = useState('Nueva contraseña');
    const [confirPassword, _setConfirPassword] = useState<string>("Vieja contraseña");
    const [reLoadFlag, setReLoadFlag] = useState<number>(0);
    const [colorIconLabelStatus, setIconColorLabelStatus] = useState<{confirPassword: boolean, user_name: boolean, email: boolean}>({
        confirPassword: false,
        user_name: false,
        email: false
    });

    const [loginInfo, setLoginInfo] = useState<INoUserIdandPasswordRequired>({
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        email: '',
        user_name: '',
        foto: '',
        type: ''
    });

    const [passwordData, setPasswordData] = useState<IUserPasswords>({ newPass: '', oldPass: ''});

    const { usernameEmails, setErrorMessage, userData, updateUserData, updatePassword } = useAuth();

    useMemo(() => {
        const fetchUserData = async () => {
            const data: INoUserIdandPasswordRequired | undefined = await userData();

            if(!data){
                console.log("Algo salio mal.");
            } else{
                setLoginInfo(data);
            }
        }

        fetchUserData();
    }, [reLoadFlag, setReLoadFlag]);

    // classnames variables...
    const inputsStyles = { // input, label and icons...
        iconStyle: 'text-Dark_Grayish_Blue text-2xl ml-2 mr-2 mt-4',
        labelStyle: 'text-Dark_Grayish_Blue text-md tracking-wider mr-3 mt-4',
        inputStyle: 'w-64 m-2 py-3 px-4 rounded-md outline-none text-Dark_Grayish_Blue font-medium tracking-wider',
        inputStyleImg: 'w-80 m-2 py-3 px-4 rounded-md outline-none text-Dark_Grayish_Blue font-medium tracking-wider',
    }
    // buttons styles...
    const personalInfobtn = 'py-3 w-96 m-3 rounded-md text-md tracking-wider';

    // function to handle the inputs value...
    // function to handle the inputs value...
    const inputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(name === 'nombre1'
            || name === 'nombre2'
            || name === 'apellido1'
            || name === 'apellido2'){
                setLoginInfo((prev) => ({
                    ...prev,
                    [name]: value,
                }));
        } else if(name === 'newPass' || name === 'oldPass'){
            setPasswordData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }else{
            setLoginInfo((prev) => ({
                ...prev,
                [name]: value.trim(),
            }));
        }
    }


    // function to handle the close button in the form...
    const closerHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSettings(!settings);
    }

    // function to check that the user dont repeat username or email...
    const usernameEmailHandler = (name: string, value: string): void => {
        if ('user_name' in usernameEmails && 'email' in usernameEmails) {
            if(value !== ""){
                const data = usernameEmails[name];  // Accede solo si user_names existe

                const result = data.filter((item: string) =>
                    item.toLowerCase().includes(value.toLowerCase())
                );

                if(result.length > 0){
                    // change the color of the icon and the label to alert...
                    setIconColorLabelStatus((prev) => ({
                        ...prev,
                        [name]: true
                    }));
                    // drop a notification...
                    setErrorMessage(name + " ya existente, ingrese uno diferente");

                    // set a timer to clean the input...
                    const timer = setTimeout(() => {
                        // clean the input...
                        setLoginInfo((prev) => ({
                            ...prev,
                            [name]: ""
                        }));
                    }, 2000);

                    () => clearTimeout(timer);

                } else{
                    setIconColorLabelStatus((prev) => ({
                        ...prev,
                        [name]: false
                    }));
                }
            }
        }
    }

    // function to handle the buttons...
    const buttonsHandler = async (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
        e.preventDefault();

        switch(type){
            case 'personalInfo':
                const data: INoUserIdPasswordandFotoRequired = {
                    nombre1: loginInfo.nombre1,
                    nombre2: loginInfo.nombre2,
                    apellido1: loginInfo.apellido1,
                    apellido2: loginInfo.apellido2,
                    email: loginInfo.email,
                    user_name: loginInfo.user_name,
                    type: loginInfo.type
                }

                await updateUserData(data);

                setReLoadFlag(prev => prev + 1);
                setTimeout(() => {setSettings(!settings);}, 1000);
            break;

            case 'passwords':
                await updatePassword(passwordData);
                setPasswordData((prev) => ({
                    ...prev,
                    newPass: '',
                    oldPass: ''
                }));
            break;

            case 'pass':
                setVerPass(!verPass);
            break;
        }
    }

    return (
        <div
            className="glass_efect w-full h-screen fixed flex justify-center items-center z-50"
        >
            <form
                className="bg-Grayish_Blue shadow-md rounded-md flex flex-col justify-start items-center p-8 my-11"
                style={{ width: "clamp(230px, 90%, 670px)", maxHeight: "80vh", overflowY: 'scroll'}}
            >
                {/**Closer btn */}
                <button
                    className="bg-Dark_Blue rounded-full text-Light_Grayish_Blue"
                    style={{ width: '50px', height: '50px', position: 'relative', left: '250px', top: '10px'}}
                    onClick={(e) => closerHandler(e)}
                >
                    <FontAwesomeIcon icon={faClose} />
                </button>
                {/**::::::::::::::::::::::::::::: */}
                <IconHolder icon={faUserAlt} iconClassname={'text-Light_Grayish_Blue text-5xl'} holderColor="#1d3245" holderSize="98px"/>
                <div
                    className="my-5 py-4 px-3 bg-Light_Grayish_Blue h-auto flex flex-col justify-start items-center rounded-md"
                    style={{ width: '95%' }}
                >
                    {/** Username*/}
                    <div
                        className="flex justify-between items-center"
                    >
                        <LabelInput
                            icon={faUserPlus}
                            iconClassName={inputsStyles.iconStyle}
                            labelText={"Primer nombre"}
                            labelClassname={inputsStyles.labelStyle}
                            inputClassname={inputsStyles.inputStyle}
                            inputId={'Nombre1'}
                            inputName={'nombre1'}
                            inputMax={50}
                            inputType={'text'}
                            placeholder={'Primer nombre: (eje: Ricardo)'}
                            value={loginInfo.nombre1}
                            inputHanler={inputsHandler}
                        />
                        <LabelInput
                            icon={faUserPlus}
                            iconClassName={inputsStyles.iconStyle}
                            labelText={"Segundo nombre"}
                            labelClassname={inputsStyles.labelStyle}
                            inputClassname={inputsStyles.inputStyle}
                            inputId={'Nombre2'}
                            inputName={'nombre2'}
                            inputMax={50}
                            inputType={'text'}
                            placeholder={'Segundo nombre (opcional)'}
                            value={loginInfo.nombre2}
                            inputHanler={inputsHandler}
                        />
                    </div>
                    <div
                        className="flex justify-between items-center"
                    >
                        <LabelInput
                            icon={faUserEdit}
                            iconClassName={inputsStyles.iconStyle}
                            labelText={"Apellido paterno"}
                            labelClassname={inputsStyles.labelStyle}
                            inputClassname={inputsStyles.inputStyle}
                            inputId={'Apellido1'}
                            inputName={'apellido1'}
                            inputMax={100}
                            inputType={'text'}
                            placeholder={'Ingrese Apellido Paterno'}
                            value={loginInfo.apellido1}
                            inputHanler={inputsHandler}
                        />
                        {/**Password*/}
                        <LabelInput
                            icon={faUserEdit}
                            iconClassName={inputsStyles.iconStyle}
                            labelText={"Apellido materno"}
                            labelClassname={inputsStyles.labelStyle}
                            inputClassname={inputsStyles.inputStyle}
                            inputId={'Apellido2'}
                            inputName={'apellido2'}
                            inputMax={100}
                            inputType={'text'}
                            placeholder={'Ingrese Apellido Materno'}
                            value={loginInfo.apellido2}
                            inputHanler={inputsHandler}
                        />
                    </div>
                    <div
                        className="flex justify-between items-center"
                    >
                        <LabelInput
                            icon={faEnvelope}
                            iconClassName={`${inputsStyles.iconStyle} ${colorIconLabelStatus.email ? 'text-red-500' : ''}`}
                            labelText={"Correo electronico"}
                            labelClassname={`${inputsStyles.labelStyle} ${colorIconLabelStatus.email ? 'text-red-500' : ''}`}
                            inputClassname={inputsStyles.inputStyle}
                            inputId={'Email'}
                            inputName={'email'}
                            inputMax={100}
                            inputType={'email'}
                            placeholder={'Ingrese su correo: (richard@gm.com)'}
                            value={loginInfo.email}
                            inputHanler={inputsHandler}
                            onBluerHandler={(e) => usernameEmailHandler(e.target.name, e.target.value)}
                        />
                        {/**Password*/}
                        <LabelInput
                            icon={faUserTag}
                            iconClassName={`${inputsStyles.iconStyle} ${colorIconLabelStatus.user_name ? 'text-red-500' : ''}`}
                            labelText={userLabel}
                            labelClassname={`${inputsStyles.labelStyle} ${colorIconLabelStatus.user_name ? 'text-red-500' : '' }`}
                            inputClassname={inputsStyles.inputStyle}
                            inputId={'UserName'}
                            inputName={'user_name'}
                            inputMax={100}
                            inputType={'text'}
                            placeholder={'Ingrese un username'}
                            value={loginInfo.user_name}
                            inputHanler={inputsHandler}
                            onBluerHandler={(e) => usernameEmailHandler(e.target.name, e.target.value)}
                        />
                    </div>
                    <Button classname={`${personalInfobtn} bg-Dark_Blue text-White mt-10 hover:bg-Dark_Grayish_Blue transition-colors`} onClick={(e) => buttonsHandler(e, 'personalInfo')}>{'Actualizar'}</Button>
                </div>
                <div
                    className="my-5 py-4 px-3 bg-Light_Grayish_Blue h-auto flex flex-col justify-start items-center rounded-md"
                    style={{ width: '95%' }}
                >
                    {/** Username*/}
                    <div
                        className="flex justify-between items-center"
                    >
                        <LabelInput
                            icon={faLock}
                            iconClassName={inputsStyles.iconStyle}
                            labelText={passwordLabel}
                            labelClassname={inputsStyles.labelStyle}
                            inputClassname={inputsStyles.inputStyle}
                            inputId={'Password'}
                            inputName={'newPass'}
                            inputMax={150}
                            inputType={verPass ? 'text' : 'password'}
                            placeholder={'Ingrese nueva contraseña'}
                            value={passwordData.newPass}
                            inputHanler={inputsHandler}
                        />
                        {/**Password*/}
                        <LabelInput
                            icon={faLock}
                            iconClassName={`${inputsStyles.iconStyle} ${colorIconLabelStatus.confirPassword ? 'text-red-500' : '' }`}
                            labelText={confirPassword}
                            labelClassname={`${inputsStyles.labelStyle} ${colorIconLabelStatus.confirPassword ? 'text-red-500' : '' }`}
                            inputClassname={inputsStyles.inputStyle}
                            inputId={'ConfirPassword'}
                            inputName={'oldPass'}
                            inputMax={150}
                            inputType={verPass ? 'text' : 'password'}
                            placeholder={'Ingrese la vieja contraseña'}
                            value={passwordData.oldPass}
                            inputHanler={inputsHandler}
                        />
                    </div>
                    <div
                        className="mt-5 w-full flex justify-start items-center py-2"
                    >
                        <Button classname="text-sm ml-2 font-extralight tracking-wider py-1 px-3 rounded-md hover:bg-Grayish_Blue hover:text-White transition-colors" onClick={(e) => buttonsHandler(e, 'pass')}>{'Ver contraseñas'}</Button>
                    </div>
                    <Button classname={`${personalInfobtn} bg-Dark_Blue text-White mt-10 hover:bg-Dark_Grayish_Blue transition-colors`} onClick={(e) => buttonsHandler(e, 'passwords')}>{'Actualizar'}</Button>
                </div>
            </form>
        </div>
    );
}

export default UpdateUserInfo;