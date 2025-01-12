import { IShiftData } from "../interfaces/IShift";

const URL = import.meta.env.VITE_URL_PLUGIN;

const configuraciones = (data: IShiftData, impresora: string) => {
    return {
        "serial": "",
        "nombreImpresora": impresora,
        "operaciones": [
            {
                "nombre": "Iniciar",
                "argumentos": []
            }, {
                "nombre": "EstablecerAlineacion",
                "argumentos": [1]
            },{
                "nombre": "EstablecerTamañoFuente",
                "argumentos": [2, 2]
            },{
                "nombre": "EscribirTexto",
                "argumentos": ["Clinica San Jose\nDe los ojos\n"]
            },{
                "nombre": "EstablecerTamañoFuente",
                "argumentos": [1, 1]
            },{
                "nombre": "EscribirTexto",
                "argumentos": ["---------------------\n"]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": ["Bienvenido\n"]
            }, {
                "nombre": "Feed",
                "argumentos": [1]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": [data.paciente_nombre]
            }, {
                "nombre": "Feed",
                "argumentos": [1]
            } ,{
                "nombre": "EscribirTexto",
                "argumentos": ["Su turno es\n"]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": ["---------------------\n"]
            }, {
                "nombre": "EstablecerTamañoFuente",
                "argumentos": [2, 2]
            },{
                "nombre": "EscribirTexto",
                "argumentos": [data.turno]
            }, {
                "nombre": "EstablecerTamañoFuente",
                "argumentos": [1, 1]
            },{
                "nombre": "EscribirTexto",
                "argumentos": ["\n---------------------\n"]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": ["Favor de esperar su\nturno en la\nsala de espera\n"]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": ["---------------------\n"]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": [`Gracias por su visita\n${data.datatime}`]
            }, {
                "nombre": "Beep",
                "argumentos": [1, 2]
            }, {
                "nombre": "Corte",
                "argumentos": [1]
            }
        ]
    }
}

export const printShiftTicket = async (ticketData: IShiftData, nomImpresora: string): Promise<void> => {
    try {
        const object: any = configuraciones(ticketData, nomImpresora);

        const respuesta = await fetch(`${URL}/imprimir`,
            {
                method: "POST",
                body: JSON.stringify(object),
            }
        );

        if(respuesta.ok){
            console.log("Impresiom correcta.")
        } else{
            console.error("Error en la impresion.")
        }
    } catch (error: any) {
        throw new Error('Error: ' + error.message);
    }
}