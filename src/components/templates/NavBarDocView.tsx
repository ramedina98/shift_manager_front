import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useShift } from "../../contexts/ShiftContext";
import { IfinishConsultationData } from "../../interfaces/IShift";
import NavListDocView from "../organisms/NavListDocView";
import NavListControlsDoc from "../organisms/NavListControlsDoc";

interface INavBarDocView {
    settings: boolean;
    setSettings: React.Dispatch<React.SetStateAction<boolean>>;
    office: boolean;
    setOffice: React.Dispatch<React.SetStateAction<boolean>>;
    startConsul: boolean;
    setStartConsul: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBarDocView: React.FC<INavBarDocView> = ({settings, setSettings, office, setOffice, startConsul, setStartConsul}) => {

    const { logout, consultorio, status } = useAuth();
    const { nextShift, finishShift, currentShift, setCurrentShift, setShiftsMessageError, consultationDate, isSubmitting } = useShift();

    // This function handle the process of finish the currentShift...
    const finishTheCurrentShift = async (): Promise<void> => {
        if(!currentShift){
            setShiftsMessageError("Algo salio mal.");
        }

        // obtain the office id...
        const id_asignacion: string | null= localStorage.getItem("office");

        if(id_asignacion === null){
            setShiftsMessageError("No existe el id de asignación en el localStorage.");
        }

        const data: IfinishConsultationData = {
            id_consulta: currentShift?.id_consulta,
            id_asignacion: `${currentShift?.id_asignacion}`,
            dataReport: {
                consultorio: consultorio,
                turno: currentShift?.turno,
                nombre_paciente: `${currentShift?.nombre_paciente} ${currentShift?.apellido_paciente}`,
                visita: startConsul ? currentShift?.visita : "cancelado",
                fecha_hora: consultationDate,
            }
        }

        // call the function...
        await finishShift(data);
    }

    const handleTheclickedLi = async (type: string) => {
        switch(type){
            // this case handle the process of go to the login form...
            case "office":
                setOffice(!office);
            break;
            // this case handle the process of go to the new user form...
            case "setting":
                setSettings(!settings);
            break;
            // this case handle the process of go to the visualizer tample...
            case "logout":
                await logout();
            break;
            case "next":
                await nextShift();
                if(startConsul && !currentShift){
                    console.log("Hola")
                    setStartConsul(false);
                }
            break;
            // this case handle the process of go to the visualizer tample...
            case "finish":
                if(!startConsul && currentShift){
                    const isEnded = confirm("¿Esta seguro de cancelar el turno?");
                    if(!isEnded){
                        return;
                    }
                }
                await finishTheCurrentShift();
                setCurrentShift(null);
            break;
            // default case...
            default:
                console.log('Caso invalido.');
            break;
        }
    }

    return (
        <div
            className="bg-Grayish_Blue flex flex-col justify-start items-center"
            style={{ width: '215px', minHeight: '90vh'}}
        >
            <div
                className="w-full py-8 my-8 text-center text-3xl tracking-wider font-semibold text-White"
            >
                <span

                >
                    {status ? 'Activo' : 'Adios'}
                </span>
            </div>
            <NavListDocView clickHandler={handleTheclickedLi} />
            <NavListControlsDoc clickHandler={handleTheclickedLi} activeProccess={isSubmitting} />
        </div>
    );
}

export default NavBarDocView;