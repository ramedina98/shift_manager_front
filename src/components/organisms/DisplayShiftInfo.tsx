import React, { useEffect, useState, useRef } from "react";
import { faUser, faFileMedical, faCalendarCheck, faClock, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { IAsignados } from "../../interfaces/IShift";
import { useAuth } from "../../contexts/AuthContext";
import LabelOutput from "../molecules/LabelOutput";
import Button from "../atoms/Button";

interface DisplayShiftInfoProps {
    data: IAsignados;
    startConsul: boolean;
    setStartConsul: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisplayShiftInfo: React.FC<DisplayShiftInfoProps> = ({data, startConsul, setStartConsul}) => {
    const [time, setTime] = useState<number>(0);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    const { status } = useAuth();

    // object of LabelOutput styles...
    const labelOutputStyles = {
        iconClass: 'text-White text-2xl ml-2 mr-2 mt-4',
        labelClass: 'text-White text-md tracking-wider mr-3 mt-4',
    }
    // ButtonStyle...
    const loginButton = 'py-3 w-96 m-3 rounded-md text-md tracking-wider';

    // Functio to start the counter...

    const calculateWaitingTime = (startTime: Date | undefined): string | any => {
        const currentTime = new Date(); // current time...

        if (startTime === undefined) {
            console.log("Something went wrong with the creation time of the turn.");
            return;
        }

        const waitingTime = currentTime.getTime() - startTime.getTime();

        if (waitingTime < 0) {
            return "La hora de inicio es en el futuro.";
        }

        const totalMinutes = Math.floor(waitingTime / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        if (hours === 0 && minutes === 0) {
            return "Menos de un minuto.";
        } else if (hours === 0) {
            return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
        } else if (minutes === 0) {
            return `${hours} hora${hours > 1 ? 's' : ''}`;
        } else {
            return `${hours} hora${hours > 1 ? 's' : ''} y ${minutes} minuto${minutes > 1 ? 's' : ''}`;
        }
    };

    const formatTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return [
            String(hours).padStart(2, '0'),
            String(minutes).padStart(2, '0'),
            String(seconds).padStart(2, '0')
        ].join(':');
    };

    const startCounter = (setTime: React.Dispatch<React.SetStateAction<number>>) => {
        if (intervalIdRef.current) return; // Evita múltiples intervalos
        intervalIdRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1); // Incrementa el tiempo en segundos
        }, 1000);
    };

    const stopCounter = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current); // Detiene el intervalo
            intervalIdRef.current = null;
        }
    };

    const resetCounter = (setTime: React.Dispatch<React.SetStateAction<number>>) => {
        stopCounter(); // Detén el contador antes de reiniciar
        setTime(0);
    };

    // function to handle the buttons...
    const buttonsHandler = async (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
        e.preventDefault();

        switch(type){
            case 'iniciar':
                startCounter(setTime);
                setStartConsul(!startConsul);
            break;
        }
    }

    useEffect(() => {
        const stopCounterInlogout = (): void => {
            if(status === false){
                stopCounter();
                resetCounter(setTime);
            }
        }

        stopCounterInlogout();
    }, [status]);

    return (
        <div
            className="bg-Muted_Blue pl-2 pb-2 pt-8 rounded-sm flex justify-start items-center flex-wrap gap-7"
            style={{ width: '90%' }}
        >
            <LabelOutput
                icon={faUser}
                iconClassName={labelOutputStyles.iconClass}
                labelText= {'Paciente'}
                labelClassname={labelOutputStyles.labelClass}
                inputId={'paciente'}
                value={`${data?.nombre_paciente} ${data?.apellido_paciente}`}
            />
            <LabelOutput
                icon={faFileMedical}
                iconClassName={labelOutputStyles.iconClass}
                labelText= {'Tipo de paciente'}
                labelClassname={labelOutputStyles.labelClass}
                inputId={'tipoPaciente'}
                value={data?.visita}
            />
            <LabelOutput
                icon={faCalendarCheck}
                iconClassName={labelOutputStyles.iconClass}
                labelText= {'Turno'}
                labelClassname={labelOutputStyles.labelClass}
                inputId={'turno'}
                value={data?.turno}
            />
            <LabelOutput
                icon={faClock}
                iconClassName={labelOutputStyles.iconClass}
                labelText= {'Tiempo de espera'}
                labelClassname={labelOutputStyles.labelClass}
                inputId={'espera'}
                value={calculateWaitingTime(data.create_at)}
            />
            <LabelOutput
                icon={faStopwatch}
                iconClassName={labelOutputStyles.iconClass}
                labelText= {'Duración de la consulta'}
                labelClassname={labelOutputStyles.labelClass}
                inputId={'duracion'}
                value={formatTime(time)}
            />
            <div
                className="w-full py-2 flex justify-center items-center"
            >
                <Button classname={`${loginButton} bg-Dark_Blue text-White mt-7 hover:bg-Dark_Grayish_Blue transition-colors`} onClick={(e) => buttonsHandler(e, 'iniciar')}>{'Iniciar Consulta'}</Button>
            </div>
        </div>
    );
}

export default DisplayShiftInfo;