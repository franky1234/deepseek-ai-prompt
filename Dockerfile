# Usa una imagen con Node 18
FROM node:18-bullseye

# Crea el directorio de la aplicación
WORKDIR /usr/src/app

# Copia los archivos de configuración iniciales
COPY package*.json ./
COPY astro.config.mjs ./

# Instala Astro y dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Puerto expuesto
EXPOSE 4321

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "dev"]