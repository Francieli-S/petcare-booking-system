# Petcare Booking System (Work in Progress)

## Installation

### 1. Prerequisites

This project was built and runs using Node v23.6.0

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

### 4. Build the project

### 5. Set Up Environment Variables

Copy the example environment file and update it with the required values:

```bash
env $(cat .env.example)

```

### 6. Build and Run the Application
 
```bash
docker-compose up --build
```

### 7. Access the Application

The application will be available at `http://localhost:5002`.

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
  - `POST /users/register`: Register a new user.
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
  - `GET /sitters/profile`: Retrieve the profile of the logged-in sitter.
  - `PATCH /sitters`: Update sitter details.

- **Booking Endpoints**:
  - `POST /bookings`: Create a new booking.
  - `GET /bookings`: List all bookings for a user.
  - `GET /bookings/:id`: Retrieve details of a specific booking.
  - `PATCH /bookings/sitter/:id`: Sitter updates booking status.
  - `PATCH /bookings/:id`: User updates booking.
  - `DELETE /bookings`: Delete user.

## API Documentation
The API documentation will be available through Swagger at `http://localhost:5002/api-docs/#/` once the application is running.