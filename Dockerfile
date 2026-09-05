FROM mcr.microsoft.com/playwright:v1.62.1-noble

WORKDIR /myworkingdir

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npx", "playwright", "test", "tests/nps.spec.ts", "--project=chromium"]