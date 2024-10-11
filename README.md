# Petcare Booking System (Work in progess...)

### Overview

The **Petcare Booking System** is a full-stack application designed to connect pet human with sitters for services such as pet sitting, walking, grooming, and boarding. The platform enables pet human to browse sitters, schedule bookings for their pets, and leave reviews after services are completed. Sitters can offer their services, manage their availability, and accept or decline booking requests.

### Features
- **User Management**: Users can register as either pet human (not using owner here!) or pet sitters. A user can manage their profile, update information, and add pets to their profile.
- **Pet Management**: Pet human can add multiple pets to their profile and specify important details about each pet (type, age, behavior, etc.).
- **Booking System**: Owners can book sitters based on their availability for services like pet sitting, walking, or grooming. Bookings can be accepted or rejected by sitters.
- **Ratings and Reviews**: After a service is completed, pet human can leave reviews and ratings for sitters to help future human choose their preferred sitter.
- **Availability Management**: Sitters can define their availability and services, such as hourly rates and the types of pets they can care for.

### Technologies

- **Backend**:
  - **Node.js** with **TypeScript**: The backend server is built using Node.js with TypeScript for type safety.
  - **PostgreSQL**: A relational database that stores user, pet, sitter, and booking information.
  - **TypeORM**: Used for managing database migrations and mapping database entities to TypeScript classes.
  - **Microservices Architecture**: The system is designed using a microservices approach to separate concerns, such as user management, booking, and sitter services.

- **Frontend**:
  - **React**: A modern frontend framework for building responsive user interfaces.
  - **TailwindCSS**: For styling components.

- **Deployment**:
  - **Serverless**: The project uses serverless architecture, deploying services to **Vercel** for scalable and cost-effective hosting.
  - **API Gateway**: Communication between microservices is handled using API Gateway, allowing the frontend to interact with backend services.

### Table Structure

The project uses a relational database to store data. The primary tables used are:

1. **Users**: Stores information about users (both pet human and sitters).
2. **Sitters**: Contains data specific to users who are registered as sitters.
3. **PetHuman**: Stores details about the pet humans.
4. **Bookings**: Manages booking details between pet human and sitters.

### API Endpoints

The application exposes various RESTful API endpoints to interact with the system. Here are some key ones:

- **User Endpoints**:
  <!-- - `POST /users/register`: Register a new user (owner or sitter).
  - `POST /users/login`: Authenticate a user and issue a token.
  - `GET /users/profile`: Retrieve the profile of the logged-in user.
  - `PUT /users/profile`: Update user details. -->

- **PetHuman Endpoints**:
  <!-- - `POST /pets`: Add a pet to the owner's profile.
  - `GET /pets`: Get a list of pets for the logged-in owner.
  - `PUT /pets/{id}`: Update pet information.
  - `DELETE /pets/{id}`: Remove a pet from the owner's profile. -->


- **Sitter Endpoints**:
  <!-- - `GET /sitters`: List all sitters based on filters (location, services).
  - `GET /sitters/{id}`: Get detailed information about a specific sitter. -->

- **Booking Endpoints**:
  <!-- - `POST /bookings`: Create a new booking request.
  - `GET /bookings`: List all bookings for a user (owner or sitter).
  - `PUT /bookings/{id}`: Update booking status (accept, cancel, complete).
  - `GET /bookings/{id}`: Retrieve details of a specific booking. -->

<!-- ### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/petcare-booking-system.git
cd petcare-booking-system
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Set Up Environment Variables
Create a `.env` file in the root directory and configure the following environment variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/petcare_db
PORT=3000
JWT_SECRET=your_jwt_secret_key
```

#### 4. Run Database Migrations
```bash
npm run typeorm migration:run
```

#### 5. Start the Development Server
```bash
npm run dev
```

The application should now be running at `http://localhost:3000`. -->

