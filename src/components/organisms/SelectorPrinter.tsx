import React, { useEffect, useState } from "react";
import { useShift } from "../../contexts/ShiftContext";
import axios from "axios";

interface ISelectorPrinterProps {
    setNamePrinter: React.Dispatch<React.SetStateAction<string | null>>;
}

const URL = import.meta.env.VITE_URL_PLUGIN;

const SelectorPrinter: React.FC<ISelectorPrinterProps> = ({setNamePrinter}) => {
    const { setShiftsMessageError } = useShift();

    const [impresoras, setImpresoras] = useState<string[]>([]);

    // style btn...
    const buttonStyle = 'text-white tracking-wider font-medium text-lg py-2 rounded-md';

    useEffect(() => {
        const searchPrinter = async () => {
            try {
                const response = await axios.get(`${URL}/impresoras`);
                if (response.status !== 200) {
                    console.log("Algo salió mal.");
                    setShiftsMessageError("No se encontró impresora disponible.");
                    setImpresoras([]);
                } else {
                    setImpresoras(response.data);
                }
            } catch (error: any) {
                console.error(`Error plugin 8080:: ${error.message}`);
                setShiftsMessageError(`Error plugin 8080: ${error.message}`);
            }
        };
        searchPrinter();

        return () => setShiftsMessageError(null);
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
            <option value="0">Impresora</option>
            {impresoras.map((impresora) => (
                <option key={impresora} value={impresora}>
                    {impresora}
                </option>
            ))}
        </select>
    );
}

export default SelectorPrinter;