@echo off

REM Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker is not installed. Please install Docker first.
    exit /b 1
)

REM Check if Docker Compose is installed
where docker-compose >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker Compose is not installed. Please install Docker Compose first.
    exit /b 1
)

REM Create .env file if it doesn't exist
if not exist .env (
    copy .env.example .env
    echo Created .env file from .env.example
)

REM Build and start the containers
docker-compose up --build -d

echo Application is starting...
echo API will be available at http://localhost:3000
echo Health check endpoint: http://localhost:3000/health 