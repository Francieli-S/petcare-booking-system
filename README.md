# Petcare Booking System (Work in Progress)

## Installation

### 1. Prerequisites

Before you begin, make sure you have the following installed and configured on your machine:

- **Docker Desktop**: [Download here](https://www.docker.com/products/docker-desktop)  
  Ensure Docker Desktop is running before proceeding.
- **Git**: [Download here](https://git-scm.com/)  
- **Node.js (Optional)**: [Download here](https://nodejs.org/)  
  This is required only if you plan to run the project outside of Docker.

### 2. Clone the Repository

Clone the repository to your local machine and navigate to the project directory:

```bash
git clone https://github.com/Francieli-S/petcare-booking-system.git
cd petcare-booking-system
```

### 3. Install Dependencies

Install the required Node.js dependencies:

```bash
npm install
```

### 4. Compile TypeScript to JavaScript

Compile the TypeScript files to JavaScript:

```bash
npm run build
```

### 5. Set Up Environment Variables

#### For Production

Copy the example environment file and update it with the required values:

```bash
cp .env.example .env.prod
```

Edit `.env.prod` to configure your environment (replace `<your_password>` with your chosen password):

```env
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=petcare_admin
POSTGRES_PASSWORD=<your_password>
POSTGRES_DB=petcare_prod

PORT=5002
NODE_ENV=production
```

#### For Testing

Create a `.env.test` file for testing:

```bash
cp .env.example .env.test
```

Edit `.env.test` to configure your test environment (replace `<your_password>` with your chosen password):

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=petcare_admin
POSTGRES_PASSWORD=<your_password>
POSTGRES_DB=petcare_test

PORT=5001
```

### 6. Build and Run the Application

1. Ensure the initialization script is executable:
   ```bash
   chmod +x init-database.sh

2. Use Docker Compose to build and start the services:

```bash
docker-compose up --build
```

### 7. Access the Application

The application will be available at `http://localhost:5002` (or the port specified in `.env.prod`).

## Testing

### Backend Tests
Run backend tests using Jest:
```bash
npm run test:backend 
```

### Frontend Tests
Run frontend tests using React Testing Library:
```bash
npm run test:frontend
```

## Overview

The **Petcare Booking System** is a full-stack application designed to connect pet humans with sitters for services such as pet sitting, walking, grooming, and boarding. The platform enables pet humans to browse sitters, schedule bookings for their pets, and leave reviews after services are completed. Sitters can offer their services, manage their availability, and accept or decline booking requests.

### Features
- **User Management**: Users can register as either pet humans or pet sitters. A user can manage their profile, update information, and add pets to their profile.
- **Pet Management**: Pet humans can add multiple pets to their profile and specify important details about each pet (type, age, behavior, etc.).
- **Booking System**: Pet humans can book sitters based on their availability for services like pet sitting, walking, or grooming. Bookings can be accepted or rejected by sitters.
- **Ratings and Reviews**: After a service is completed, pet humans can leave reviews and ratings for sitters to help future users choose their preferred sitter.
- **Availability Management**: Sitters can define their availability and services, such as hourly rates and the types of pets they can care for.

## Technologies

- **Backend**:
  - **Node.js** with **TypeScript**: The backend server is built using Node.js with TypeScript for type safety.
  - **PostgreSQL**: A relational database that stores user, pet, sitter, and booking information.
  - **TypeORM**: Used for managing database migrations and mapping database entities to TypeScript classes.
  - **Jest**: For testing the backend functionality.

- **Frontend**:
  - **Next.js - React**: A modern frontend framework for building responsive user interfaces.
  - **Tailwind - CSS**: For styling components.
  - **React Testing Library**: For testing the frontend functionality.

- **Deployment**:
  - **Docker**: Containerized application for consistent development and production environments.
  - **AWS**: Infrastructure for scalable and reliable hosting of the application.

## Table Structure

The project uses a relational database to store data. The primary tables used are:

1. **Users**: Stores information about users (both pet humans and sitters).
2. **Sitters**: Contains data specific to users who are registered as sitters.
3. **Bookings**: Manages booking details between pet humans and sitters.

## API Endpoints

The application exposes various RESTful API endpoints to interact with the system. Here are some key ones:

- **User Endpoints**:
  - `POST /users/register`: Register a new user (pet human or sitter).
  - `POST /users/login`: Authenticate a user and issue a token.
  - `GET /users/profile`: Retrieve the profile of the logged-in user.
  - `PATCH /users`: Update user details.
  - `DELETE /users`: Delete user.
  - `GET /users`: Retrieve all users.
  - `GET /users/:id`: Retrieve an user by id.

- **Sitter Endpoints**:
  - `POST /sitters`: Create a new sitter.
  - `GET /sitters/:id`: Retrieve a sitter by id.
  - `GET /sitters/all`: List all sitters.
  - `PATCH /sitters`: Update sitter details.

- **Booking Endpoints**:
  - `POST /bookings`: Create a new booking.
  - `GET /bookings`: List all bookings for a user.
  - `GET /bookings/:id`: Retrieve details of a specific booking.
  - `PATCH /bookings/:id`: Update booking (exept status).
  - `DELETE /bookings`: Delete user.

## API Documentation
The API documentation will be available through Swagger at `/api-docs` once the application is running.