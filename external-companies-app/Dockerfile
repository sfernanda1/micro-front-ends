FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --output-path=dist

RUN npm install -g serve

EXPOSE 4203

CMD ["serve", "-s", "dist", "-l", "4203"]
