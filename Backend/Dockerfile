# Usa l'immagine ufficiale di Node.js
FROM node:18

# Imposta la directory di lavoro all'interno del container
WORKDIR /usr/src/app

# Copia solo package.json e package-lock.json per installare le dipendenze
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutto il resto del codice, inclusa la build Angular nella cartella 'public'
COPY . .

# Espone la porta del backend
EXPOSE 3000

# Comando di avvio del server
CMD ["node", "index.js"]
