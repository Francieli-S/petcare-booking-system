FROM node:16.20.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

# Copy and set executable permissions for the init-database.sh script
COPY init-database.sh /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/init-database.sh

RUN npm run build

CMD ["npm", "start"]
