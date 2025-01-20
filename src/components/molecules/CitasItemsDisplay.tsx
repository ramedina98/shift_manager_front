import React from "react";
import { faStethoscope, faUser, faCalendarCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import LabelOutput from "./LabelOutput";

interface CitasItemsDisplayProps {
    nom_doc: string;
    ape_doc: string;
    nom_patient: string;
    ape_patient: string;
    turno: string;
    hora: string;
}

const CitasItemsDisplay: React.FC<CitasItemsDisplayProps> = ({
    nom_doc,
    ape_doc,
    nom_patient,
    ape_patient,
    turno,
    hora,
}) => {

    const styles = { // input, label and icons...
        icon: 'text-White text-2xl ml-2 mr-2 mt-2',
        label: 'text-white text-md tracking-wider mr-3 mt-2',
    }
    const nombreDoc = `${nom_doc} ${ape_doc}`;
    const nombrePaciente = `${nom_patient} ${ape_patient}`;
    return (
        <div
            className="bg-white w-full my-3 flex flex-wrap gap-4 justify-between items-start p-3 rounded-md"
        >
            <LabelOutput
                icon={faStethoscope}
                iconClassName={styles.icon}
                labelText={"Medico"}
                labelClassname={styles.label}
                inputId="doc"
                value={nombreDoc}
            />
            <LabelOutput
                icon={faUser}
                iconClassName={styles.icon}
                labelText={"Paciente"}
                labelClassname={styles.label}
                inputId="paciente"
                value={nombrePaciente}
            />
            <LabelOutput
                icon={faCalendarCheck}
                iconClassName={styles.icon}
                labelText={"Turno"}
                labelClassname={styles.label}
                inputId="turno"
                value={turno}
            />
            <LabelOutput
                icon={faClock}
                iconClassName={styles.icon}
                labelText={"Hora de creación"}
                labelClassname={styles.label}
                inputId="hora"
                value={hora}
            />
        </div>
    );
}

export default CitasItemsDisplay;