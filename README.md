 
# 🛡️ VaultChain Backend
 
**VaultChain** es una plataforma de compraventa descentralizada que utiliza Bitcoin como medio de pago, con un sistema de escrow, comunicación cifrada, y soporte para despliegue `.onion`.
 
Este repositorio contiene el backend desarrollado en **Node.js + Express**, con **PostgreSQL** como base de datos, **Prisma** como ORM y **bitcoinjs-lib** para manejo de direcciones y transacciones Bitcoin.
 
 
## 🚀 Tecnologías principales
 
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)
- [Socket.IO](https://socket.io/)
- [JWT](https://jwt.io/) 
 
---
 
## 📁 Estructura del proyecto
 
vaultchain-backend/ 
├── prisma/ 
│   └── schema.prisma          # Definición de modelos 
├── src/   
│   ├── controllers/            # Lógica de negocio   
│   ├── routes/                 # Rutas de Express  
│   ├── middlewares/            # Autenticación, validaciones  
│   ├── services/               # Lógica de escrow y Bitcoin  
│   ├── utils/                  # Helpers varios 
│   ├── app.ts                  # Registra todas las rutas y middlewares
│   ├── server.ts               # Punto de entrada del backend 
├── .env                        # Variables de entorno 
├── package.json 
└── README.md
 
---
 
## ⚙️ Configuración
 
### 1. Instala dependencias
```bash
pnpm install
```
### 2. Configura el entorno
 
Crea un archivo .env en la raíz con:
 ```bash
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/vaultchain"
JWT_SECRET="clave-super-secreta"
BTC_NETWORK="testnet" # o "mainnet"
ESCROW_WALLET_SEED="tu-semilla-secreta"
 ```
> Recomendado: usar Bitcoin Testnet para desarrollo.
 
 
 
 
---
 
### 3. Inicializa Prisma y la base de datos
 ```bash
npx prisma generate
npx prisma migrate dev --name init
 ```
 
---
 
### 4. Ejecuta el servidor
  ```bash
pnpm run dev
 
Servidor en http://localhost:3000
  ```
 
---
 
### 🧠 Funcionalidades iniciales
 
- Registro y login de usuarios con JWT
 
- Creación de productos por parte de vendedores
 
- Generación de direcciones BTC únicas para cada orden
 
- Sistema Escrow: el pago queda retenido hasta confirmación
 
- Liberación automática o manual de fondos
 
- API lista para ser conectada con frontend (React/Next.js)
 