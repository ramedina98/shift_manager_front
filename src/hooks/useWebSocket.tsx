import { useState, useEffect, useRef } from 'react';
import { IShifts } from '../interfaces/IShift';
// Tipo para los mensajes del WebSocket
interface WebSocketMessage {
    code: number,
    title: string,
    message: string,
    turno: string | null;
    shiftsData: IShifts;
    sender: string
}

const useWebSocket = (url: string) => {
    const [messages, setMessages] = useState<WebSocketMessage[]>([]);
    const wsRef = useRef<WebSocket | null>(null);  // Para mantener la referencia del WebSocket

    useEffect(() => {
        // Crear la conexión WebSocket
        wsRef.current = new WebSocket(url);

        // Evento cuando el WebSocket se abre
        wsRef.current.onopen = () => {
            console.log("Conexión WebSocket abierta");
        };

        // Evento cuando se recibe un mensaje
        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, {
                code: data.code,
                title: data.title,
                message: data.message,
                shiftsData: data.shiftsData,
                turno: data.turno,
                sender: 'Server'
            }]);
        };

        // Evento cuando ocurre un error en la conexión
        wsRef.current.onerror = (error) => {
            console.error("Error en WebSocket", error);
        };

        // Evento cuando se cierra la conexión
        wsRef.current.onclose = (event) => {
            console.log("Conexión WebSocket cerrada", event.code, event.reason);
        };

        // Cleanup: cerrar la conexión cuando el componente se desmonte
        return () => {
            wsRef.current?.close();
        };
    }, [url]);

    return { messages };
};

export default useWebSocket;