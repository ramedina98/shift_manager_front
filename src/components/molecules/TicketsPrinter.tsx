import React from "react";
import ConectorPlugin from "../../printer-system/ConectorPlugin.js";

const TicketsPrinter: React.FC = () => {

    const handlePrint = async () => {
        try {
            const conector = new ConectorPlugin();

            conector
            .Iniciar()
            .EscribirTexto('Hola a todos')
            .Feed(2)
            .Corte()

            // lista de impresoras...
            const impresoras = await ConectorPlugin.obtenerImpresoras();
            console.log("Impresoras disponibles: ", impresoras);

            // Elegir la impresora (asegúrate de que el nombre sea válido)
            const impresora = impresoras[0]; // Primera impresora

            // Enviar las operaciones a la impresora
            const respuesta = await conector.imprimirEn(impresora);
            console.log("Respuesta del servidor:", respuesta);
        } catch (error) {
            console.error("Error al imprimir:", error);
        }
    }

    return (
        <button onClick={handlePrint}>
            Imprimir
        </button>
    );
}

export default TicketsPrinter;