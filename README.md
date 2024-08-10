# ShowLib

ShowLib is a Full-Stack SPA designed to manage your movie and TV show library. The updated version integrates a new backend server built with TypeScript, Node.js, Express, TypeORM, and PostgreSQL, while the client remains built with TypeScript, Angular, and Angular Material.

## Features

- **Store Shows:** Easily add and manage movies and TV shows in your library of favourites.
- **Add Comments:** Comment on specific movies and TV shows.
- **Organize and Categorize:** Choose between movies and TV shows.

## Technologies

- **Frontend:** TypeScript, Angular, Angular Material
- **Backend:**  TypeScript, Node.js, Express, TypeORM, PostgreSQL

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) - Ensure Node.js is installed.
- [PostgreSQL](https://www.postgresql.org/) - Ensure PostgreSQL is installed and configured.

### Clone the Repository

```bash
git clone https://github.com/yavordobrev24/ShowLib.git
cd ShowLib
```

### Client-Side Setup

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

### Server-Side Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

## Configuration

### Client Configuration

Edit `src/environment.ts` in the `client` directory to configure the client to point to the API URL (default set to `'http://localhost:3000/api'`).

### Server Configuration

Create a `.env` file in the `server` directory with the following variables:

```plaintext
PORT=YOUR_PORT_HERE
JWT_SECRET=YOUR_JWT_SECRET_HERE
TMDB_API_URL=YOUR_TMDB_API_URL_HERE
TMDB_API_KEY=YOUR_TMDB_API_KEY_HERE

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=YOUR_DB_PASSWORD_HERE
DB_NAME=showlib
```

Replace the placeholder values with your actual configuration values.

## Running the Application

### Start the Client

In the `client` directory, run:

```bash
ng serve
```

### Start the Server

In the `server` directory, run:

```bash
npm run dev
```

## API Endpoints

The backend server provides the following API endpoints:

- **Authentication:** `/api/auth`
- **Movies:** `/api/movies`
- **TV Shows:** `/api/tv-shows`
- **Comments:** `/api/comments`
- **Favourites:** `/api/favourites`
