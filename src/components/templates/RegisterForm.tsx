import React, { useEffect, useState } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faUserDoctor, faCashRegister, faUserTie, faUserPlus, faLock, faUserTag, faUserEdit, faEnvelope, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { validateInputs } from "../../utils/validateInputs";
import { IUserNoId } from "../../interfaces/IUser";
import LabelInput from "../molecules/LabelInput";
import UlDinamic from "../molecules/UlDinamic";
import IconHolder from "../molecules/IconHolder";
import Button from "../atoms/Button";

interface itemsList {
    item: string,
    icon: IconDefinition
};

const RegisterForm: React.FC = () => {
    const [loginInfo, setLoginInfo] = useState<IUserNoId>({
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        email: '',
        user_name: '',
        password: '',
        foto: '',
        type: ''
    });

    const [rolItems, setRolItems] = useState<itemsList[]>([]);
    const [clickedLi, setClickedLi] = useState<string>("");
    const [confirPassword, setConfirPassword] = useState<string>("Confirmar contraseña");
    const [typeDinamicGate, setTypeDinamicGate] = useState<boolean>(false);
    const [verPass, setVerPass] = useState<boolean>(false);

    const [colorIconLabelStatus, setIconColorLabelStatus] = useState<{confirPassword: boolean, user_name: boolean, email: boolean}>({
        confirPassword: false,
        user_name: false,
        email: false
    });

    const { usernameEmails, setErrorMessage, setSuccessMessage, newUserRegister } = useAuth();

    const navigate = useNavigate();

    // classnames variables...
    const inputsStyles = { // input, label and icons...
        iconStyle: 'text-Dark_Grayish_Blue text-2xl ml-2 mr-2 mt-4',
        labelStyle: 'text-Dark_Grayish_Blue text-md tracking-wider mr-3 mt-4',
        inputStyle: 'w-64 m-2 py-3 px-4 rounded-md outline-none text-Dark_Grayish_Blue font-medium tracking-wider',
    }
    // buttons styles...
    const loginButton = 'py-3 w-96 m-3 rounded-md text-md tracking-wider';
    const nuevoUserButton = `${loginButton} `;

    // object with the li itmes of rol field...
    const liItems: itemsList []= [
        {
            item: 'Medico',
            icon: faUserDoctor
        },
        {
            item: 'Cajero',
            icon: faCashRegister
        },
        {
            item: 'Administrador',
            icon: faUserTie
        }
    ]

    const dinamicSearchRolItems = (str: string): [] | itemsList[] => {
        if(!str.trim()) return [];

        return liItems.filter((item) =>
            item.item.toLowerCase().includes(str.toLowerCase())
        );
    }

    useEffect(() => {
        setLoginInfo((prev) => ({
            ...prev,
            type: clickedLi,
        }));
    }, [clickedLi]);

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

    // function to handle the inputs value...
    const inputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if(name !== 'confirPassword'){
            if(name === 'type'){
                setTypeDinamicGate(true);

                setClickedLi(value);

                const items: itemsList[] = dinamicSearchRolItems(value.trim());
                setRolItems(items);
            } else{

                if(name === 'nombre1'
                    || name === 'nombre2'
                    || name === 'apellido1'
                    || name === 'apellido2'){
                        setLoginInfo((prev) => ({
                            ...prev,
                            [name]: value,
                        }));
                } else{
                    setLoginInfo((prev) => ({
                        ...prev,
                        [name]: value.trim(),
                    }));
                }
            }
        } else {
            if(loginInfo.password !== value){
                setConfirPassword("No coincide");

                setIconColorLabelStatus((prev) => ({
                    ...prev,
                    confirPassword: true
                }));
            } else{
                setIconColorLabelStatus((prev) => ({
                    ...prev,
                    confirPassword: false
                }));

                setConfirPassword("Confirmación correcta");

                const timer = setTimeout(() => {
                    setConfirPassword("Confirmar contraseña");
                }, 2000);

                () => clearTimeout(timer);
            }
        }
    }

    // function to handle the buttons...
    const buttonsHandler = async (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
        e.preventDefault();

        switch(type){
            // handle the process of register a new user...
            case 'nuevo':
                const response = validateInputs(loginInfo);

                // if the object is not empty, there is an error...
                if(JSON.stringify(response) !== '{}'){
                    setSuccessMessage(null);

                    let message = '';
                    for(const [_key, value] of Object.entries(response)){
                        message = message + value + '\n';
                    }

                    message = message.trim();

                    setErrorMessage(message);
                    return;
                } else{
                    setErrorMessage(null);

                    if(!loginInfo){
                        setErrorMessage("Datos no proveidos.");
                    }

                    try {
                        // process the information...
                        await newUserRegister(loginInfo);

                        setLoginInfo({
                            nombre1: '',
                            nombre2: '',
                            apellido1: '',
                            apellido2: '',
                            email: '',
                            user_name: '',
                            password: '',
                            foto: '',
                            type: ''
                        });
                    } catch (error) {
                        console.log('error: ' + error)
                    }
                }

            break;

            case 'login':
                setLoginInfo({
                    nombre1: '',
                    nombre2: '',
                    apellido1: '',
                    apellido2: '',
                    email: '',
                    user_name: '',
                    password: '',
                    foto: '',
                    type: ''
                });
                navigate('/inicio');
            break;

            case 'pass':
                setVerPass(!verPass);
            break;
        }
    }

    return (
        <form
            className="bg-Grayish_Blue shadow-md rounded-md flex flex-col justify-start items-center p-8 my-11"
            style={{ width: "clamp(230px, 90%, 670px)", height: "600px" }}
        >
            <IconHolder icon={faUserPlus} iconClassname={'text-Light_Grayish_Blue text-5xl'} holderColor="#1d3245" holderSize="98px"/>
            <div
                className="my-5 py-4 px-3 bg-Light_Grayish_Blue flex flex-col justify-start items-center rounded-md overflow-y-auto overflow-x-hidden"
                style={{ width: '95%', height: '500px' }}
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
                    {/**Password*/}
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
                        labelText={"Nombre de usuario"}
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
                <div
                    className="flex justify-between items-center"
                >
                    <LabelInput
                        icon={faLock}
                        iconClassName={inputsStyles.iconStyle}
                        labelText={"Contraseña"}
                        labelClassname={inputsStyles.labelStyle}
                        inputClassname={inputsStyles.inputStyle}
                        inputId={'Password'}
                        inputName={'password'}
                        inputMax={150}
                        inputType={verPass ? 'text' : 'password'}
                        placeholder={'Ingrese una contraseña'}
                        value={loginInfo.password}
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
                        inputName={'confirPassword'}
                        inputMax={150}
                        inputType={verPass ? 'text' : 'password'}
                        placeholder={'Confirmación contraseña'}
                        inputHanler={inputsHandler}
                    />
                </div>
                <div
                    className="mt-5 w-full flex justify-start items-center py-2"
                >
                    <Button classname="text-sm ml-2 font-extralight tracking-wider py-1 px-3 rounded-md hover:bg-Grayish_Blue hover:text-White transition-colors" onClick={(e) => buttonsHandler(e, 'pass')}>{'Ver contraseñas'}</Button>
                </div>
                <div
                    className="flex justify-start items-center w-full pl-1"
                >
                    <LabelInput
                        icon={faUserCog}
                        iconClassName={inputsStyles.iconStyle}
                        labelText={"Rol de usuario"}
                        labelClassname={inputsStyles.labelStyle}
                        inputClassname={inputsStyles.inputStyle}
                        inputId={'Rol'}
                        inputName={'type'}
                        inputMax={100}
                        inputType={'text'}
                        placeholder={'Rol User: (eje: Medico)'}
                        value={clickedLi}
                        inputHanler={inputsHandler}
                    />
                </div>
                <UlDinamic
                    classname={`bg-white relative right-Rposition w-64 px-1 rounded-md py-3 shadow-sm ${typeDinamicGate ? 'flex' : 'hidden' } flex flex-col justify-between items-center`}
                    liClassName={`${inputsStyles.labelStyle} hover:bg-Light_Grayish_Blue transition-colors cursor-pointer w-full p-2 rounded-sm ml-3`}
                    itemsList={rolItems}
                    iconClassName={'text-Dark-Blue mr-2'}
                    textClassName={'text-Dark-Blue'}
                    setClikedLi={setClickedLi}
                    setTypeDinamicGate={setTypeDinamicGate}
                />
                {/**Btns */}
                <Button classname={`${loginButton} bg-Dark_Blue text-White mt-10 hover:bg-Dark_Grayish_Blue transition-colors`} onClick={(e) => buttonsHandler(e, 'nuevo')}>{'Registrar nuevo usuario'}</Button>
                <Button classname={`${nuevoUserButton} bg-Muted_Blue text-White mb-4 hover:bg-Grayish_Blue transition-colors`} onClick={(e) => buttonsHandler(e, 'login')}>{'Iniciar Sesión'}</Button>
            </div>
        </form>
    );
}

export default RegisterForm;