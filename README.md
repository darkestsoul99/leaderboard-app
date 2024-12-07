# Leaderboard System

A scalable leaderboard system built with Node.js, Redis, and MongoDB.

## Features

- Score submission with highest-score tracking
- Paginated leaderboard retrieval
- Individual rank querying
- Token-based authentication
- Rate limiting
- Docker support

## Prerequisites

- Docker and Docker Compose
- Node.js 16+ (for local development)

## Quick Start

You can start the application in two ways:

### Using the run script
For Linux/Mac:

```bash
./run.sh
```

For Windows:

```bash
.\run.bat
```

### Manual setup
1. Clone the repository
2. Create a `.env` file based on `.env.example`
3. Run with Docker:

```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`
## API Documentation

### Authentication

#### Register User
```
POST /auth/register
Content-Type: application/json

{
    "username": "player1",
    "password": "password123"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
    "username": "player1",
    "password": "password123"
}
```

### Leaderboard

#### Submit Score
```
POST /leaderboard/submit-score
Authorization: Bearer <token>
Content-Type: application/json

{
    "userId": "user123",
    "gameId": "game456",
    "score": 250
}
```

#### Get Top Players
```
GET /leaderboard/top?gameId=game456&limit=10&page=1
```

#### Get Player Rank
```
GET /leaderboard/rank?userId=user123&gameId=game456
```

## Development

1. Install dependencies:

```bash
npm install
```

2. Run in development mode:

```bash
npm run dev
```

## Testing

Run tests:

```bash
npm test
```

## License

MIT
```

</rewritten_file>