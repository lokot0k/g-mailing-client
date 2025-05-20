# Dockerfile.dev
FROM node:18-alpine

WORKDIR /app

# Сначала ставим зависимости
COPY package.json package-lock.json ./
RUN npm ci

# Копируем всё приложение (для локальной разработки мы будем монтировать код поверх)
COPY . .

# Открываем порт Vite (по умолчанию 5173)
EXPOSE 5173

# И запускаем dev-сервер
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

