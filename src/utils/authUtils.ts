// this file contains all the functions required to handle the token provided by the server...
import { UserDataFields } from '../interfaces/IUser';
import * as jose from "jose";

/*const extractUserInfo = (token: string, field: UserDataFields): string | null => {
    const KEY = import.meta.env.VITE_JWT_SECRET_KEY;

    try {
        // verify and decodify the token...
        const decoded: any = jwt.verify(token, KEY);

        // returns the required data...
        return decoded[field] || null;
    } catch (error: any) {
        console.log(`Error al decodificar el token: ${error.message}`)
        return null;
    }
}*/

const KEY = import.meta.env.VITE_JWT_SECRET_KEY;

const extractUserInfo = async (token: string, field: UserDataFields): Promise<string | null> => {
    try {
        const secretKey = new TextEncoder().encode(KEY);

        const { payload } = await jose.jwtVerify(token, secretKey);

        return payload[field] as string;
    } catch (error: any) {
        console.error('Error al verificar el token:', error);
        return null;
    }
}

export default extractUserInfo;