declare module "*printer-system/ConectorPlugin.js" {

    class Operacion{
        constructor(nombre: string, argumentos: any[]);
    }

    export class ConectorPlugin {
        static URL_PLUGIN_POR_DEFECTO: string;
        static Operacion: typeof Operacion;
        static ALINEACION_IZQUIERDA: number;
        static ALINEACION_CENTRO: number;
        static ALINEACION_DERECHA: number;
        static RECUPERACION_QR_BAJA: number;
        static RECUPERACION_QR_MEDIA: number;
        static RECUPERACION_QR_ALTA: number;
        static RECUPERACION_QR_MEJOR: number;
        static ALGORITMO_IMAGEN_RASTERIZACION: number;
        static ALGORITMO_IMAGEN_COLUMNAS: number;
        static ALGORITMO_IMAGEN_NV_GRAPHICS: number;
        // constructor de la clase Conector plugin...
        constructor(ruta?: string, serial?: string);
        // metodos...
        CargarImagenLocalEImprimir(ruta, maximoAncho, algoritmo): this;
        Corte(): this;
        CorteParcial(): this;
        DefinirCaracterPersonalizado(caracterRemplazo: any, matriz: any): this;
        DescargarImagenDeInternetEImprimir(urlImagen: any, maximoAncho: any, algoritmo: any): this;
        DeshabilitarCaracteresPersonalizados(): this;
        DeshabilitarElModoDeCaracteresChinos(): this;
        EscribirTexto(texto: string): this;
        EstablecerAlineacion(alineacion: any): this;
        EstablecerEnfatizado(enfatizado: any): this;
        EstablecerFuente(fuente: any): this;
        EstablecerImpresionAlReves(alReves: any): this;
        EstablecerImpresionBlancoYNegroInversa(invertir: any): this;
        EstablecerRotacionDe90Grados(rotar: any): this;
        EstablecerSubrayado(subrayado: any): this;
        EstablecerTamañoFuente(multiplicadorAncho: any, multiplicadorAlto: any): this;
        Feed(lineas: number): this;
        HabilitarCaracteresPersonalizados(): this;
        HabilitarElModoDeCaracteresChinos(): this;
        ImprimirCodigoDeBarrasCodabar(contenido: any, alto: any, ancho: any, algoritmo: any): this;
        ImprimirCodigoDeBarrasCode128(contenido: any, alto: any, ancho: any, algoritmo: any): this;
        ImprimirCodigoDeBarrasCode39(contenido: any, incluirSumaDeVerificacion: any, modoAsciiCompleto: any, alto: any, ancho: any, algoritmo: any): this;
        ImprimirCodigoDeBarrasCode93(contenido: any, alto: any, ancho: any, algoritmo: any): this;
        ImprimirCodigoDeBarrasEan(contenido: any, alto: any, ancho: any, algoritmo: any): this;
        ImprimirCodigoDeBarrasEan8(contenido: any, alto: any, ancho: any, tamañoImagen: any): this;
        ImprimirCodigoDeBarrasPdf417(contenido: any, nivelSeguridad: any, alto: any, ancho: any, tamañoImagen: any): this;
        ImprimirCodigoDeBarrasTwoOfFiveITF(contenido: any, intercalado: any, alto: any, ancho: any, algoritmo: any): this;
        ImprimirCodigoDeBarrasUpcA(contenido: any, alto: any, ancho: any, algoritmo: any): this;
        ImprimirCodigoDeBarrasUpcE(contenido: any, alto: any, ancho: any, algoritmo: any): this;
        ImprimirCodigoQr(contenido: any, anchoMaximo: any, nivelRecuperacion: any, algoritmo: any): this;
        ImprimirImagenEnBase64(imagenCodificadaEnBase64: any, maximoAncho: any, algoritmo: any): this;
        Iniciar(): this;
        Pulso(pin: any, tiempoEncendido: any, tiempoApagado: any): this;
        TextoSegunPaginaDeCodigos(numeroPagina: any, pagina: any, texto: any): this;
        GenerarImagenAPartirDeHtmlEImprimir(html: any, anchoPagina: any, maximoAncho: any, algoritmo: any): this;
        GenerarImagenAPartirDePaginaWebEImprimir(urlPagina: any, anchoPagina: any, maximoAncho: any, algoritmo: any): this;
        static obtenerImpresoras(ruta?: string): Promise<string[]>;
        static obtenerImpresorasRemotas(ruta: any, rutaRemota: any): Promise<string[]>;
        imprimirEnImpresoraRemota(nombreImpresora: any, rutaRemota: any): Promise<any>
        imprimirEn(nombreImpresora: string): Promise<any>;
    }

    export default ConectorPlugin;
}