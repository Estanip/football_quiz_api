📚 Futbol Quiz API
API desarrollada con NestJS para gestionar preguntas y respuestas. Implementa PostgreSQL como base de datos, Redis para caché, protección CSRF, y Throttle para limitar solicitudes.

🚀 Características
✅ NestJS como framework principal
✅ PostgreSQL como base de datos
✅ Redis para almacenamiento en caché
✅ Protección CSRF para mayor seguridad
✅ Throttle para limitar solicitudes y prevenir abusos
✅ Autenticación y autorización

🛠 Instalación y configuración
1️⃣ Clonar el repositorio
git clone https://github.com/Estanip/football_quiz_api.git

2️⃣ Instalar dependencias
yarn install

3️⃣ Configurar variables de entorno

# API

NODE_ENV
PORT

# DATABASE

DB_TYPE
DB_HOST
DB_PORT
DB_USERNAME
DB_PASSWORD
DB_NAME
DB_SSL
DB_URL

# CACHE

CACHE_HOST
CACHE_PORT
CACHE_PASSWORD
CACHE_TLS

# CLIENT

CLIENT_ORIGIN

# CSRF

CSRF_SECRET

# IS PUBLIC

IS_PUBLIC_KEY

# JWT

JWT_SECRET

# ROLES

ROLES_KEY

🚀 Ejecución
🔧 Modo desarrollo
yarn start:dev

🏗 Compilar y ejecutar en producción
yarn build
yarn start:prod

🧪 Pruebas
🛠 Ejecutar pruebas unitarias
yarn test:unit

🛠 Ejecutar pruebas integración
yarn test:integration

🛠 Ejecutar pruebas e2e
yarn test:e2e

🛡 Seguridad
🛑 Protección CSRF
⏳ Limitación de solicitudes (Throttle)

🛠 Tecnologías usadas
Tecnología Descripción
NestJS Framework principal
PostgreSQL Base de datos relacional
TypeORM ORM para gestionar entidades
Redis Caché para mejorar rendimiento
Helmet.js Protección de seguridad HTTP
CSRF Protección contra ataques CSRF
Throttle Límite de solicitudes por IP

📜 API Endpoints
Puedes consultar los endpoints detallados en Swagger en http://localhost:3001/api.

📌 Desarrollado con ❤️ y NestJS 🚀
