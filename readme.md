# Animus

**Management software for sports academies and training centers.**

Animus is where this idea started — the original open-source prototype of a system to manage classes and student attendance for sports academies, reducing no-shows and helping instructors stay organized. I built it because I train jiu-jitsu and kept seeing the same problem at small academies.

> Open to contributions — feel free to reach out!

## What it is

Animus is management software for academies and training centers, designed to streamline class administration and student check-in — cutting down on no-shows and improving organization for instructors and owners.

## Architecture

Built with a **microservices** architecture, following **SOLID** principles and using the **Singleton** pattern for modularity, code reuse and scalability. It's **multi-tenant**, so different academies can use the platform independently.

## Tech Stack

- **Node.js** — RESTful APIs, built efficiently and with scalability in mind, following good architectural practices
- **PostgreSQL** — relational database for structured data with consistency and reliability
- **MongoDB** — stores class-related data, for more flexibility and faster queries
- **Cloudinary** — image and short-video storage, with fast, free uploads
- **Jest** — unit testing to ensure code reliability and quality
- **Socket.IO** — WebSocket setup for low-latency, real-time communication

## Environment variables

Configure your `.env` with:

```
POSTGRES_HOST
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
POSTGRES_PORT
POSTGRES_SSL

JWT_SECRET
REFRESH_SECRET
```

Generate a secret for JWT (and another for refresh):

```bash
# Windows
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Linux (openssl)
openssl rand -hex 32
```

## Project history

Animus was the kickstarter for an idea I kept iterating on:

1. **Animus** (this repo) — the original open-source prototype where the idea began.
2. **[Prime](https://github.com/Mhlpereira/prime)** — a restructured full-stack version with a dedicated frontend and containerized infrastructure (Docker Compose, Nginx).
3. **Gambatte** — the current closed-source product, rebuilt with a spec-driven development approach, launching in 2026. *("Gambatte" / 頑張って means "do your best" in Japanese.)*

---

Built by [Mário Henrique Lino Pereira](https://github.com/Mhlpereira).
