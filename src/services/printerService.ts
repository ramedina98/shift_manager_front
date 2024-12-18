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
                "argumentos": [4, 4]
            },{
                "nombre": "EscribirTexto",
                "argumentos": ["Clinica San Jose\nDe los ojos"]
            },{
                "nombre": "Feed",
                "argumentos": [2]
            }, {
                "nombre": "EstablecerEnfatizado",
                "argumentos": [true]
            },{
                "nombre": "EscribirTexto",
                "argumentos": ["-------------------------"]
            }, {
                "nombre": "EstablecerEnfatizado",
                "argumentos": [false]
            }, {
                "nombre": "EstablecerTamañoFuente",
                "argumentos": [2, 2]
            }, {
                "nombre": "Feed",
                "argumentos": [2]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": ["Bienvenido"]
            }, {
                "nombre": "EstablecerTamañoFuente",
                "argumentos": [3, 3]
            }, {
                "nombre": "Feed",
                "argumentos": [2]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": [data.paciente_nombre]
            }, {
                "nombre": "EstablecerTamañoFuente",
                "argumentos": [2, 2]
            }, {
                "nombre": "Feed",
                "argumentos": [2]
            } ,{
                "nombre": "EscribirTexto",
                "argumentos": ["Su turno es"]
            }, {
                "nombre": "EstablecerEnfatizado",
                "argumentos": [true]
            }, {
                "nombre": "Feed",
                "argumentos": [2]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": ["-------------------------"]
            }, {
                "nombre": "EstablecerEnfatizado",
                "argumentos": [false]
            }, {
                "nombre": "EstablecerTamañoFuente",
                "argumentos": [4, 4]
            }, {
                "nombre": "Feed",
                "argumentos": [2]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": [data.turno]
            }, {
                "nombre": "EstablecerEnfatizado",
                "argumentos": [true]
            }, {
                "nombre": "Feed",
                "argumentos": [2]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": ["-------------------------"]
            }, {
                "nombre": "EstablecerEnfatizado",
                "argumentos": [false]
            }, {
                "nombre": "EstablecerTamañoFuente",
                "argumentos": [2, 2]
            }, {
                "nombre": "Feed",
                "argumentos": [2]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": ["Favor de esperar su\nturno en la\nsala de espera"]
            }, {
                "nombre": "EstablecerEnfatizado",
                "argumentos": [true]
            },{
                "nombre": "Feed",
                "argumentos": [2]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": ["-------------------------"]
            }, {
                "nombre": "EstablecerEnfatizado",
                "argumentos": [false]
            }, {
                "nombre": "EstablecerTamañoFuente",
                "argumentos": [2, 2]
            }, {
                "nombre": "Feed",
                "argumentos": [2]
            }, {
                "nombre": "EscribirTexto",
                "argumentos": [`Gracias por su visita ${data.datatime}`]
            },{
                "nombre": "Feed",
                "argumentos": [2]
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