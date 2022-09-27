FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npx playwright install-deps

COPY . .

CMD ["npx","ts-node", "src/index.ts"]