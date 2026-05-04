FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Set environment variables
ENV NEXT_PUBLIC_API_URL=https://thesis-portal-pythonversion3120.up.railway.app
ENV NEXT_PUBLIC_PASSWORD=Dicaprio@5991
ENV NEXT_PUBLIC_AUTH_TOKEN=secret-auth-token-2024

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
