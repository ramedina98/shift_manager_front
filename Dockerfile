# Etapa 1: Construcción
FROM node:23 AS builder

WORKDIR /app

# Copiar archivos necesarios
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Copiar las variables de entorno sin exponerlas
COPY .env .env

# Construir la aplicación
RUN npm run build

# Etapa 2: Servidor de producción
FROM node:23 AS runner

WORKDIR /app

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Exponer el puerto
EXPOSE 5173

# Definir las variables de entorno PORT
ENV PORT=5173

# Comando de inicio
CMD ["npm", "run", "start"]