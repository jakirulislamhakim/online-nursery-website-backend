# Online Nursery Website - Backend 🌱

## Project Overview

The backend of the Online Nursery Website is built using **Node.js** and **Express.js**, providing a robust and secure API for managing products, categories, and user orders. It supports essential functionalities such as product CRUD operations.

-

- **[Backend live](https://online-nursery-backend-jade.vercel.app)**
- **[Front-end live](https://online-nursery-taupe.vercel.app)**
- **[Api documentation](https://documenter.getpostman.com/view/30515463/2sAXqwZfVi#c1715a1b-7076-4945-8551-4e48b70113d0)**

## Key Features 🌟

- **RESTful API**: Implements a RESTful architecture for handling requests related to products, categories, and orders.
- **Product Management**:
  - Create, read, update, and delete (CRUD) operations for products.
  - Endpoint to retrieve products with filtering, searching, sorting and pagination options.
- **Category Management**:
  - Manage product categories with CRUD operations.
- **Order Processing**:
  - Create orders with customer details.
  - Validate product stock levels before order confirmation.
  - When order create successfully then reduce product quantity.

## Technologies Used 🛠️

- **Backend**:
  - **Node.js**: JavaScript runtime for server-side development.
  - **Express.js**: Web framework for building the API.
  - **MongoDB**: NoSQL database for storing product, category, and user data.
  - **Mongoose**: ODM library for MongoDB to manage data models.
  - **Zod**: For validation data.

## API Endpoints 📋

### Product Endpoints

- **GET /api/products**: Retrieve a list of products with optional filtering, sorting, and pagination.
- **GET /api/products/:id**: Retrieve a product .
- **POST /api/products**: Create a new product .
- **PUT /api/products/:id**: Update an existing product .
- **DELETE /api/products/:id**: Delete a product .

### Category Endpoints

- **GET /api/categories**: Retrieve a list of product categories.
- **POST /api/categories**: Create a new category .
- **PUT /api/categories/:id**: Update an existing category .
- **DELETE /api/categories/:id**: Delete a category .

### Order Endpoints

- **POST /api/orders**: Create a new order.

## Installation & Usage 📋

1. Clone the repository:
   ```bash
   git clone https://github.com/jakirulislamhakim/online-nursery-website-backend
   ```
2. into the project:
   ```bash
   git clone online-nursery-website-backend
   ```
3. follow env.example file
4. start the project

```bash
  npm run start-dev
```
