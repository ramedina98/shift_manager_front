import React, { useEffect, useState } from "react";
import { useShift } from "../../contexts/ShiftContext";
import axios from "axios";

interface ISelectorPrinterProps {
    setNamePrinter: React.Dispatch<React.SetStateAction<string | null>>;
}

const URL = import.meta.env.VITE_URL_PLUGIN;

const SelectorPrinter: React.FC<ISelectorPrinterProps> = ({setNamePrinter}) => {
    const { setShiftsMessageError } = useShift();

    const [impresoras, setImpresoras] = useState<string[] | null>(null);

    // style btn...
    const buttonStyle = 'text-white tracking-wider font-medium text-lg py-2 rounded-md';

    useEffect(() => {
        const searchPrinter = async () => {
            try {
                const response = await axios.get(`${URL}/impresoras`);

                if(response.status !== 200){
                    console.log('Algo salio mal.');
                    setShiftsMessageError('No se encontro impresora disponible.');
                    setImpresoras(null);
                } else{
                    setImpresoras(response.data);
                }
            } catch (error: any) {
                console.log(`Error: ${error.message}`);
                setShiftsMessageError(`Error plugin 8080: ${error.message}`);
            }
        }
        searchPrinter();
    }, []);

    const handlerSelectPrinter = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const {value} = event.target;
        setNamePrinter(value);
    }

    return (
        <select
            className={`bg-Dark_Grayish_Blue ${buttonStyle} transition-colors text-center outline-none cursor-pointer`}
            style={{width: '160px'}}
            onChange={handlerSelectPrinter}
        >
            <option
                value={'option'}
            >
                Impresora
            </option>
            {(impresoras) && (
                impresoras.map((impresora, index) => (
                    <option
                        key={index}
                        value={impresora}
                    >
                        {impresora}
                    </option>
                ))
            )};
        </select>
    );
}

export default SelectorPrinter;