import React, { useState } from "react";
import { faStethoscope, faClose, faEye } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import { useShift } from "../../contexts/ShiftContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../styles/index.css';
import LabelInput from "../molecules/LabelInput";
import IconHolder from "../molecules/IconHolder";
import Button from "../atoms/Button";

interface IUpdateUserInfo {
    office: boolean;
    setOffice: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateOfficeInfo: React.FC<IUpdateUserInfo> = ({office, setOffice}) => {
    const { consultorio } = useAuth();
    const [numConsultorio, setNumConsultorio] = useState<number>(consultorio);
    const { updateOfficeInfo } = useShift();

    // classnames variables...
    const inputsStyles = { // input, label and icons...
        iconStyle: 'text-Dark_Grayish_Blue text-2xl ml-2 mr-2 mt-4',
        labelStyle: 'text-Dark_Grayish_Blue text-md tracking-wider mr-3 mt-4',
        inputStyle: 'w-64 m-2 py-3 px-4 rounded-md outline-none text-Dark_Grayish_Blue font-medium tracking-wider text-center',
    }
    // buttons styles...
    const personalInfobtn = 'py-3 w-96 m-3 rounded-md text-md tracking-wider';

    // function to handle the inputs value...
    // function to handle the inputs value...
    const inputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNumConsultorio(Number(value));
    }


    // function to handle the close button in the form...
    const closerHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setOffice(!office);
    }

    // function to handle the buttons...
    const buttonsHandler = async (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
        e.preventDefault();

        switch(type){
            case 'office':
                await updateOfficeInfo(numConsultorio);
            break;
        }
    }

    return (
        <div
            className="glass_efect w-full h-screen fixed flex justify-center items-center"
        >
            <form
                className="bg-Grayish_Blue shadow-md rounded-md flex flex-col justify-start items-center p-8 my-11"
                style={{ width: "clamp(230px, 90%, 670px)", maxHeight: "80vh"}}
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
                <IconHolder icon={faEye} iconClassname={'text-Light_Grayish_Blue text-5xl'} holderColor="#1d3245" holderSize="98px"/>
                <div
                    className="my-5 py-4 px-3 bg-Light_Grayish_Blue h-auto flex flex-col justify-start items-center rounded-md"
                    style={{ width: '95%' }}
                >
                    {/** Username*/}
                    <div
                        className="flex justify-between items-center"
                    >
                        <LabelInput
                            icon={faStethoscope}
                            iconClassName={inputsStyles.iconStyle}
                            labelText={"Numero de Consultorio"}
                            labelClassname={inputsStyles.labelStyle}
                            inputClassname={inputsStyles.inputStyle}
                            inputId={'Office'}
                            inputName={'office'}
                            inputMax={150}
                            inputType={'number'}
                            placeholder={'Ingrese nueva contraseña'}
                            value={String(numConsultorio)}
                            inputHanler={inputsHandler}
                        />
                    </div>
                    <Button classname={`${personalInfobtn} bg-Dark_Blue text-White mt-10 hover:bg-Dark_Grayish_Blue transition-colors`} onClick={(e) => buttonsHandler(e, 'office')}>{'Actualizar'}</Button>
                </div>
            </form>
        </div>
    );
}

export default UpdateOfficeInfo;