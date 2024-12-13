import React, { useEffect, useState } from "react";
import { faUser, faUserEdit, faFileMedical, faCalendarCheck, faStethoscope, faClock } from "@fortawesome/free-solid-svg-icons";
import { useShift } from "../../contexts/ShiftContext";
import { IPacienteCitado, IPacienteNoId } from "../../interfaces/IShift";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LabelInput from "../molecules/LabelInput";
import LabelOutput from "../molecules/LabelOutput";
import IconHolder from "../molecules/IconHolder";
import Button from "../atoms/Button";
import { IDoctosList } from "../../interfaces/IUser";

const NewShiftForm: React.FC = () => {
    const { createNewShift, doctors , increasesTheNewShift, turno } = useShift();

    const [citado, setCitado] = useState<boolean>(false);
    const [horaCita, setHoraCita] = useState<string>();
    const [selectDoctorsInfo, setSelectDoctorsInfo] = useState<IDoctosList[] | undefined>(undefined);
    const [newShifInfo, setNewShifInfo] = useState<IPacienteCitado>({
        nombre_paciente: '',
        apellido_paciente: '',
        tipo_paciente: 'primera',
        turno: turno,
        citado: citado,
        activo: true,
        id_doc: '',
        nombre_doc: '',
        apellido_doc: '',
        hora_cita: new Date()
    });

    useEffect(() => {
        const fetchsDoctors = async (): Promise<void> => {
            const data: IDoctosList[] | undefined = await doctors();

            setSelectDoctorsInfo(data);
        }

        fetchsDoctors();
    }, []);

    // classnames variables...
    const inputsStyles = { // input, label and icons...
        iconStyle: 'text-Dark_Grayish_Blue text-2xl ml-2 mr-2 mt-4',
        labelStyle: 'text-Dark_Grayish_Blue text-md tracking-wider mr-3 mt-4',
        inputStyle: 'w-64 m-2 py-3 px-4 rounded-md outline-none text-Dark_Grayish_Blue font-medium tracking-wider',
    }
    // buttons styles...
    const loginButton = 'py-3 w-96 m-3 rounded-md text-md tracking-wider';
    const nuevoUserButton = `${loginButton} `;

    // function to handle the inputs value...
    const inputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(name === 'nombre_paciente'
            || name === 'apellido_paciente'){
                setNewShifInfo((prev) => ({
                    ...prev,
                    [name]: value,
                }));
        } else if(name === 'Citado'){
            setCitado(!citado);
        } else if(name === 'hora_cita'){
            // Combina la fecha actual con la hora proporcionada
            const [hours, minutes] = value.split(':').map(Number); // Convierte "17:00" a [17, 0]
            const currentDate = new Date();
            const combinedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes);

            setHoraCita(value || '');
            setNewShifInfo((prev) => ({
                ...prev,
                hora_cita: combinedDate,
            }))
        } else{
            setNewShifInfo((prev) => ({
                ...prev,
                [name]: value.trim(),
            }));
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target;
        const selectedOption = event.target.options[event.target.selectedIndex];

        if(name === 'patient'){
            setNewShifInfo((prev) => ({
                ...prev,
                tipo_paciente: value
            }));
        } else if(name === 'doctor'){
            if(value !== 'first'){
                const nombre_doc = selectedOption.getAttribute('data-nombre-doc');
                const apellido_doc = selectedOption.getAttribute('data-apellido-doc');
                if(nombre_doc !== null && apellido_doc !== null){
                    setNewShifInfo((prev) => ({
                        ...prev,
                        id_doc: value,
                        nombre_doc: nombre_doc,
                        apellido_doc: apellido_doc
                    }));
                }
            }
        }
    };

    const cleanForm = (): void => {
        setNewShifInfo({
            nombre_paciente: '',
            apellido_paciente: '',
            tipo_paciente: 'primera',
            turno: '',
            citado: citado,
            activo: true,
            id_doc: '',
            nombre_doc: '',
            apellido_doc: '',
            hora_cita: new Date()
        });
        setHoraCita('');
        if(citado !== false){
            setCitado(!citado);
        }
    }

    // function to handle the buttons...
    const buttonsHandler = async (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
        e.preventDefault();

        switch(type){
            case 'nuevo':
                if(citado === true){
                    const data: IPacienteCitado = {
                        nombre_paciente: newShifInfo.nombre_paciente,
                        apellido_paciente: newShifInfo.apellido_paciente,
                        tipo_paciente: newShifInfo.tipo_paciente,
                        turno: turno,
                        citado: true,
                        activo: true,
                        id_doc: newShifInfo.id_doc,
                        nombre_doc: newShifInfo.nombre_doc,
                        apellido_doc: newShifInfo.apellido_doc,
                        hora_cita: newShifInfo.hora_cita
                    }
                    await createNewShift(data);
                    cleanForm();
                    increasesTheNewShift();
                    return;
                }

                const data: IPacienteNoId = {
                    nombre_paciente: newShifInfo.nombre_paciente,
                    apellido_paciente: newShifInfo.apellido_paciente,
                    tipo_paciente: newShifInfo.tipo_paciente,
                    turno: turno,
                    citado: citado,
                    activo: true,
                }

                await createNewShift(data);

                cleanForm();
                increasesTheNewShift();
            break;

            case 'clean':
                cleanForm();
            break;
        }
    }

    return (
        <form
            className="bg-Grayish_Blue shadow-md rounded-md flex flex-col justify-start items-center p-8 my-11"
            style={{ width: "clamp(230px, 90%, 670px)", height: "600px" }}
        >
            <IconHolder icon={faUser} iconClassname={'text-Light_Grayish_Blue text-5xl'} holderColor="#1d3245" holderSize="98px"/>
            <div
                className="my-5 py-4 px-3 bg-Light_Grayish_Blue flex flex-col justify-start items-center rounded-md overflow-y-auto overflow-x-hidden"
                style={{ width: '95%', height: '600px' }}
            >
                {/** Username*/}
                <div
                    className="flex justify-between items-center w-full"
                >
                    <LabelInput
                        icon={faUser}
                        iconClassName={inputsStyles.iconStyle}
                        labelText={"Nombre del paciente"}
                        labelClassname={inputsStyles.labelStyle}
                        inputClassname={inputsStyles.inputStyle}
                        inputId={'nombreP'}
                        inputName={'nombre_paciente'}
                        inputMax={50}
                        inputType={'text'}
                        placeholder={'Nombre del paciente'}
                        value={newShifInfo.nombre_paciente}
                        inputHanler={inputsHandler}
                    />
                    {/**Password*/}
                    <LabelInput
                        icon={faUserEdit}
                        iconClassName={inputsStyles.iconStyle}
                        labelText={"Apellido del paciente"}
                        labelClassname={inputsStyles.labelStyle}
                        inputClassname={inputsStyles.inputStyle}
                        inputId={'apellidoP'}
                        inputName={'apellido_paciente'}
                        inputMax={100}
                        inputType={'text'}
                        placeholder={'Ingrese el apellido dle paciente'}
                        value={newShifInfo.apellido_paciente}
                        inputHanler={inputsHandler}
                    />
                </div>
                <div
                    className="flex justify-between items-center w-full"
                >
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faFileMedical}  className= {`${inputsStyles.iconStyle}`}/>
                            <label htmlFor="select-type-patient" className={`${inputsStyles.labelStyle}`}>
                                Tipo de paciente
                            </label>
                        </div>
                        <select
                            name="patient"
                            className={`${inputsStyles.inputStyle}`}
                            value={newShifInfo.tipo_paciente}
                            onChange={handleChange}
                        >
                            <option value="primera">Primera Vez</option>
                            <option value="subsecuente">Subsecuente</option>
                        </select>
                    </div>
                    {/**Password*/}
                    <LabelOutput
                        icon={faCalendarCheck}
                        iconClassName={inputsStyles.iconStyle}
                        labelText={'Turno Asignado'}
                        labelClassname={inputsStyles.labelStyle}
                        inputId={'turno'}
                        value={turno}
                    />
                </div>
                <div
                    className="flex justify-start items-center w-full"
                >
                    <div className="flex flex-row justify-start items-end" style={{width: '200px'}}>
                        <FontAwesomeIcon icon={faCalendarCheck} className={`${inputsStyles.iconStyle}`} />
                        <label htmlFor="citado" className={`${inputsStyles.labelStyle}`} >Citado</label>
                        <input type="checkbox" id="citado" name="Citado" checked={citado} style={{width: '20px', height: '20px'}} onChange={inputsHandler}/>
                    </div>
                </div>
                {(citado) && (
                    <div
                        className="flex justify-between items-center w-full mt-8 border-t-2 border-t-Dark_Grayish_Blue"
                    >
                        <div>
                            <div>
                                <FontAwesomeIcon icon={faStethoscope}  className= {`${inputsStyles.iconStyle}`}/>
                                <label htmlFor="select-doctor" className={`${inputsStyles.labelStyle}`}>
                                    Doctor(a)
                                </label>
                            </div>
                            <select
                                name="doctor"
                                className={`${inputsStyles.inputStyle}`}
                                value={newShifInfo.id_doc}
                                onChange={handleChange}
                            >
                                <option value="first">Seleccione un doctor(a)</option>
                                {selectDoctorsInfo?.map((doc: IDoctosList, index: number) => (
                                    <option
                                        key={index}
                                        value={doc.id_doc}
                                        data-nombre-doc={doc.nombre_doc}
                                        data-apellido-doc={doc.apellido_doc}
                                    >
                                        {`${doc.nombre_doc} ${doc.apellido_doc}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/**Password*/}
                        <LabelInput
                            icon={faClock}
                            iconClassName={inputsStyles.iconStyle}
                            labelText={"Hora de la cita"}
                            labelClassname={inputsStyles.labelStyle}
                            inputClassname={inputsStyles.inputStyle}
                            inputId={'horaCita'}
                            inputName={'hora_cita'}
                            inputMax={100}
                            inputType={'time'}
                            value={horaCita || ''}
                            inputHanler={inputsHandler}
                        />
                    </div>
                )}
                {/**Btns */}
                <Button classname={`${loginButton} bg-Dark_Blue text-White mt-10 hover:bg-Dark_Grayish_Blue transition-colors`} onClick={(e) => buttonsHandler(e, 'nuevo')}>{'Nueva Consulta'}</Button>
                <Button classname={`${nuevoUserButton} bg-Muted_Blue text-White mb-4 hover:bg-Grayish_Blue transition-colors`} onClick={(e) => buttonsHandler(e, 'clean')}>{'Cancelar'}</Button>
            </div>
        </form>
    );
}

export default NewShiftForm;