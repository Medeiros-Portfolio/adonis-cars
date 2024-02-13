# Adonis Cars

> AdonisCars is an API and dashboard for a fictional car dealership. It was built to showcase my ability to develop complex applications solely with the AdonisJS framework and its associated libraries.

## Features

* APIs for inventory, sales, customers, staff etc. with full CRUD operations
* Complex querying and filtering of cars by make, model, price etc.
* User management and role-based access control for sales/finance staff
* Interactive dashboard to view sales stats, revenue, top cars etc.
* Automated emails for purchase receipts using Adonis Mail provider
* Docker setup for running app and PostgreSQL in containers
* Comprehensive tests for APIs, models, and components
* Deployed and hosted on Render cloud platform

## Tech Stack

* [AdonisJS](https://adonisjs.com/)

## Local Usage
You can run the AdonisCars app locally by pulling its docker image from Docker Hub and running it with Docker Compose.

### Requirements
* Docker
* Docker Compose

### Steps

1. Pull the image from Docker Hub
```bash	
docker pull adoniscars/adoniscars:latest
```

2. Configure environment variables
```bash
cp .env.example .env
```

3. Run the app with Docker Compose
```bash
docker-compose up
```

## API Documentation

### Cars
* `GET /api/cars` - Get all cars

**Expected response**:
StatusCode: 200
```json
[
  {
    "id": 1,
    "make": "Toyota",
    "model": "Corolla",
    "year": 2019,
    "price": 15000,
    "created_at": "2021-08-01T12:00:00.000Z",
    "updated_at": "2021-08-01T12:00:00.000Z"
  },
  {
    "id": 2,
    "make": "Honda",
    "model": "Civic",
    "year": 2020,
    "price": 18000,
    "created_at": "2021-08-01T12:00:00.000Z",
    "updated_at": "2021-08-01T12:00:00.000Z"
  }
]
```

## Contact
For any questions or feedback, feel free to reach out to me at...
