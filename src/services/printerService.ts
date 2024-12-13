// TODO: desarrollar aquí lo necesarío para el ticket de turno...
import { IShiftData } from "../interfaces/IShift";
//import { ConectorPlugin } from "../printer-system/ConectorPlugin.js";

export const printShiftTicket = async (ticketData: IShiftData): Promise<void> => {
    console.log('Ticket: ', ticketData);
}