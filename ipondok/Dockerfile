# Tahap Build
FROM node:lts-alpine AS builder

# Direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json untuk instalasi dependensi
COPY package.json package-lock.json ./

# Install semua dependensi
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Build aplikasi React (output ke folder `build`)
RUN npm run build

# Tahap Serve
FROM nginx:stable-alpine

# Salin file hasil build React ke direktori default Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Mengekspos port 80
EXPOSE 80

# Jalankan Nginx untuk melayani aplikasi
CMD ["nginx", "-g", "daemon off;"]
