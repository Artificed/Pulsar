# Pulsar

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js) ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Java](https://img.shields.io/badge/Java-25-orange?style=for-the-badge&logo=openjdk&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white) ![gRPC](https://img.shields.io/badge/gRPC-1.59.0-244c5a?style=for-the-badge&logo=grpc&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-13AA52?style=for-the-badge&logo=mongodb&logoColor=white) ![OpenTelemetry](https://img.shields.io/badge/OpenTelemetry-Latest-419EDA?style=for-the-badge&logo=opentelemetry&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-Latest-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Gradle](https://img.shields.io/badge/Gradle-8.x-02303A?style=for-the-badge&logo=gradle&logoColor=white)

A distributed event booking and management platform built with microservices architecture, featuring AI-powered chat assistance and observability.

## Overview

Pulsar is a full-stack event booking system that combines the power of microservices with an intuitive Next.js frontend. The platform enables users to discover events, manage bookings, and interact with an AI-powered chat assistant that leverages the Model Context Protocol (MCP) for intelligent event recommendations and booking assistance.

## Architecture

The system uses a microservices architecture with four backend services written in Java/Spring Boot, a Next.js frontend, and MongoDB for persistence. Services communicate via gRPC internally and expose REST endpoints for the frontend.

**Frontend**
- Next.js application with React 19
- Server-side rendering and API routes
- AI chat integration using Gemini and Model Context Protocol

**Backend Services**
- User Service - User profile management and data
- Auth Service - Authentication and JWT token handling  
- Event Service - Event CRUD operations and search
- Booking Service - Booking management and status tracking

**Data Layer**
- MongoDB with sharding support for horizontal scaling
- Automated initialization via migration scripts

**Observability**
- OpenTelemetry instrumentation across all services
- Grafana LGTM stack for logs, metrics, and distributed tracing

## Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 (with Turbopack)
- **UI Library**: React 19.1.0
- **Styling**: TailwindCSS 4
- **State Management**: TanStack React Query 5
- **Animations**: Framer Motion
- **AI**: Google Generative AI (Gemini)
- **Protocol**: Model Context Protocol (MCP) SDK
- **Observability**: OpenTelemetry Web SDK

### Backend Services
- **Framework**: Spring Boot 4.0.0
- **Language**: Java 25
- **Communication**: gRPC
- **Database**: MongoDB
- **Authentication**: JWT
- **Observability**: OpenTelemetry Java SDK

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: MongoDB with Sharding Support
- **Monitoring**: Grafana LGTM Stack (Loki, Grafana, Tempo, Mimir)
- **Telemetry**: OpenTelemetry Collector

## Features

- Event discovery and browsing
- Booking management (create, view, manage bookings)
- User authentication and registration
- AI chat assistant powered by Gemini with MCP integration
- Full observability with distributed tracing and metrics
- Responsive UI with animations
- JWT-based authentication
- Scalable microservices architecture with MongoDB sharding

## Prerequisites

Before running the project, ensure you have the following installed:

- **Docker** (v20.10 or higher)
- **Docker Compose** (v2.0 or higher)
- **Node.js** (v20 or higher) - for local frontend development
- **Java JDK** (v25) - for local backend development
- **Gradle** (v8.0 or higher) - for building backend services

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Pulsar
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Gemini AI API Key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB Configuration
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=test123

# Grafana SMTP Configuration (Optional)
GF_SMTP_ENABLED=true
GF_SMTP_HOST=smtp.gmail.com:587
GF_SMTP_USER=your_email@gmail.com
GF_SMTP_PASSWORD=your_app_password
GF_SMTP_FROM_ADDRESS=your_email@gmail.com
GF_SMTP_FROM_NAME=Grafana Alerts
```

### 3. Build and Run with Docker Compose

```bash
docker-compose up --build

docker-compose up --build -d
```

## Project Structure

```
Pulsar/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # React components
│   │   ├── features/        # Feature-based modules
│   │   └── lib/             # Utilities and configurations
│   └── Dockerfile
│
├── services/                # Backend microservices
│   ├── auth-service/        # Authentication & authorization
│   ├── booking-service/     # Booking management
│   ├── event-service/       # Event management
│   └── user-service/        # User profile management
│
├── mongodb/                 # MongoDB configuration
│   ├── migration/           # Database initialization scripts
│   └── sharding/            # Sharding cluster setup
│
└── docker-compose.yml       # Multi-container orchestration
```



## Monitoring & Observability

The project includes comprehensive observability:

1. **Distributed Tracing**: Track requests across all microservices
2. **Centralized Logging**: Aggregate logs from all services
3. **Metrics Collection**: Monitor service health and performance
4. **Grafana Dashboards**: Visualize all telemetry data

Access Grafana to view:
- Service health metrics
- Request traces
- Error rates and latencies
- Custom dashboards

## Database Management

### MongoDB Initialization

The database is automatically initialized with the script in `mongodb/migration/init-db.js` when the container starts.

### Sharding Setup

For production deployment with sharding:

```bash
cd mongodb/sharding
./setup-cluster.sh
```

Refer to the individual `docker-compose.yml` files in `pc_1`, `pc_2`, `pc_3`, `pc_4` directories for distributed sharding configuration.

## Authentication Flow

1. User registers/logs in through the frontend
2. Auth service validates credentials
3. JWT token is generated and stored client-side
4. Token is included in subsequent requests
5. Services validate tokens using shared secret

## AI Chat Integration

The AI chat feature uses:
- **Gemini AI**: For natural language understanding and generation
- **Model Context Protocol (MCP)**: For structured communication with backend services
- **MCP Servers**: Event and Booking services expose MCP endpoints for AI queries

## Screenshots

<img width="1893" height="1066" alt="Screenshot 2026-02-10 085211" src="https://github.com/user-attachments/assets/0bda1612-95b6-4b95-9a83-e131f96b015b" />
<img width="1906" height="1069" alt="Screenshot 2026-02-10 084500" src="https://github.com/user-attachments/assets/b5e2af7d-e3d3-4d94-bd2a-5904d8b5973d" />
<img width="1903" height="1067" alt="Screenshot 2026-02-10 084610" src="https://github.com/user-attachments/assets/7b6dc3d1-18a0-46ff-925f-d2900de04ca7" />
<img width="1908" height="1066" alt="Screenshot 2026-02-10 084713" src="https://github.com/user-attachments/assets/301b7871-75c4-438b-aebd-c8c6d454d746" />
<img width="1899" height="1065" alt="Screenshot 2026-02-10 085020" src="https://github.com/user-attachments/assets/79e620e9-e73b-4297-bedd-3caceb4ebf46" />

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Artificed">Artificed</a>

</p>

