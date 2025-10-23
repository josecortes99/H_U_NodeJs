# H_U_NodeJs

# REST API for Store, Product, and Order Management

Backend project developed with **Node.js**, **Express**, and **PostgreSQL**, allowing management of clients, stores, products, and orders.  
Includes full CRUD operations, table relationship handling, and JWT-protected endpoints.

---

## Technologies Used

- **Node.js** – v22.19.0
- **Express** – Server framework
- **PostgreSQL** – Relational database
- **Sequelize** – ORM for modeling and handling data
- **JWT (JSON Web Token)** – For authentication and authorization
- **Dotenv** – Environment variable management
- **Cors** – HTTP header and security configuration

---

## Project Structure

```
project-node-express-postgres
├── src/
│   ├── config/           # Database connection configuration
│   ├── controllers/      # Controllers (handle endpoint logic)
│   ├── middleware/       # Authentication, validations, etc.
│   ├── models/           # Sequelize models (tables)
│   ├── routes/           # Grouped routes by resource
│   ├── services/         # Business logic (CRUD)
│   ├── types/            # Server error types
│   ├── utils/            # Utility functions and error handling
│   └── app.ts            # Main Express configuration
│
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── README.md             # Project documentation
└── tsconfig.json         # TypeScript configuration
```

---

## ⚙️ Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/josecortes99/H_U_NodeJs
   cd H_U_Nodejs
   ```
2. **Initialize project and tsconfig**
   ```bash
   npm init -y
   tsc --init
   ```

3. **Install dependencies**
   ```bash
   npm i express cors dotenv sequelize pg --save-dev
   npm i @types/express @types/cors @types/sequelize
   npm i nodemon ts-node --save-dev
   npm i @types/node --save-dev
   npm i pg -hstore
   npm install bcrypt jsonwebtoken
   npm install -D @types/bcrypt @types/jsonwebtoken
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory with the following content:

   ```env
   PORT=3000
   VALID_TOKEN=12345
   DB_NAME=hitoria_usuario
   DB_USER=postgres
   DB_PASS=123456
   JWT_SECRET=ZRDUlqyoa1vCImRTYCf567yZAmAglExQOEgaZm+HmxE=
   JWT_EXPIRES_IN="1h"
   ```

5. **Initialize the database**

   Make sure PostgreSQL is running and create the database:
   ```sql
   CREATE DATABASE hitoria_usuario;
   ```


## Running the Server

Development mode:
```bash
npm run listen
```

The server will run by default at:
```
http://localhost:3000
```

---

## Main Endpoints

### Stores
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/stores` | List all stores |
| GET | `/stores/:id` | Get store by ID |
| GET | `/stores/active` | List active stores with stock |
| POST | `/stores` | Create new store |
| PUT | `/stores/:id` | Update store |
| DELETE | `/stores/:id` | Delete store |

### Products
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/products` | List all products |
| GET | `/products/:id` | Get product by ID |
| GET | `/products/code/:code` | Get product by code |
| POST | `/products` | Create product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Orders
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/orders` | List all orders |
| GET | `/orders/:id` | Get order by ID |
| POST | `/orders` | Create order |
| PUT | `/orders/:id` | Update order |
| DELETE | `/orders/:id` | Delete order |

---

## Best Practices Applied

- Clear separation between controllers, services, and models.
- Use of `try/catch` and centralized error handler (`handleHttp`).
- Input data validation.
- Properly defined relationships between tables in Sequelize.
- Clean and modular code structure.

---

# Docker Setup for Node.js + Express + PostgreSQL

This guide explains how to containerize your Node.js + Express + PostgreSQL project using Docker.

---

## Dockerfile

Below is the recommended Dockerfile for your project:

```Dockerfile
# 1 Base image
FROM node:22-alpine

# 2 Set working directory
WORKDIR /usr/src/app

# 3 Copy project config files
COPY package*.json ./

# 4 Install dependencies
RUN npm install

# 5 Copy project source code
COPY . .

# 6 Build TypeScript to JavaScript
RUN npx tsc

# 7 Expose the application port
EXPOSE 3000

# 8 Start the server
CMD ["npm", "run", "listen"]
```

---

## Build and Run Containers

### Build the image manually
```bash
docker build -t final_nodejs .
```

### Run the container
```bash
docker run -p 3000:3000 --env-file .env final_nodejs
```

### Run both API and PostgreSQL with Docker Compose
```bash
docker compose up --build
```

The API will be available at:
```
http://localhost:3000
```

PostgreSQL will be running at:
```
localhost:5432
```

---
**Done!** You now have your Node.js + Express + PostgreSQL project fully containerized using Docker.

---

## Author

**José Cortes**  
Backend Developer | Node.js | PostgreSQL  
Contact: j.c.e555@hotmail.com  
GitHub: [@josecortes99](https://github.com/josecortes99)

---