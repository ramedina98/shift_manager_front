import * as jose from "jose";

type JwtPayload = {
    id_user: string;
    user_name: string;
    nombre: string;
    apellido: string;
    type: string;
    exp?: number;
};

const checkTokenExpiration = async (): Promise<void> => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.log("No hay token disponible.");
        return;
    }

    try {
        // Decodificar el token
        const decoded = jose.decodeJwt(token) as JwtPayload;

        if (decoded.exp) {
            const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

            if (decoded.exp < currentTime) {
                console.warn("El token ha expirado.");
                // Limpiar el almacenamiento local y las cookies
                localStorage.removeItem("token");
                localStorage.removeItem("office");

                // Eliminar cookies relacionadas
                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                document.cookie = "office=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                // Notificar que la sesión ha expirado
                alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
            } else {
                console.log("El token es válido.");
            }
        } else {
            console.error("El token no contiene un campo de expiración (exp).");
        }
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        // Limpiar el almacenamiento en caso de error
        localStorage.removeItem("token");
        localStorage.removeItem("office");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "office=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
};

export default checkTokenExpiration;