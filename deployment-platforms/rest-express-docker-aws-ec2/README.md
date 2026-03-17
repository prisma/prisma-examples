# REST API with Express, Docker & AWS EC2

This example shows how to deploy a **Prisma REST API** (Express + TypeScript) to **AWS EC2** using **Docker** and **GitHub Actions**.

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose (for the Docker path)
- [Node.js](https://nodejs.org/) 20+ and a local PostgreSQL instance (for the non-Docker path)
- An AWS account (for deployment only)

## Getting started

### 1. Clone the repository

```sh
git clone https://github.com/prisma/prisma-examples.git --depth=1
cd prisma-examples/deployment-platforms/rest-express-docker-aws-ec2
```

### 2. Run the app

Choose one of the two local development paths below.

---

#### Option A — Docker Compose (recommended)

Copy the example env file (Docker Compose sets `DATABASE_URL` automatically, so no edits needed):

```sh
cp .env.example .env
```

Start the app and a local Postgres database:

```sh
docker compose up --build
```

The server is now running at `http://localhost:3000`. Migrations are applied automatically on startup.

---

#### Option B — Local Node.js + PostgreSQL

Create a `.env` file and set `DATABASE_URL` to your local database:

```sh
cp .env.example .env
# edit .env and set DATABASE_URL, e.g.:
# DATABASE_URL="postgresql://prisma:prisma@localhost:5432/prisma"
```

Install dependencies and generate the Prisma Client:

```sh
npm install
npx prisma migrate dev
```

Start the development server:

```sh
npm run dev
```

The server is now running at `http://localhost:3000`.

---

### 3. Use the REST API

Create a user:

```sh
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"email": "alice@prisma.io", "name": "Alice"}'
```

Create a post:

```sh
curl -X POST http://localhost:3000/post \
  -H "Content-Type: application/json" \
  -d '{"title": "Hello Prisma", "content": "My first post", "authorEmail": "alice@prisma.io"}'
```

Publish a post:

```sh
curl -X PUT http://localhost:3000/publish/1
```

Fetch all published posts:

```sh
curl http://localhost:3000/feed
```

Fetch a single post:

```sh
curl http://localhost:3000/post/1
```

Delete a post:

```sh
curl -X DELETE http://localhost:3000/post/1
```

---

## Deploying to AWS EC2

### 1. Set up AWS prerequisites

**ECR repository** — create one if you haven't already:

```sh
aws ecr create-repository --repository-name my-prisma-app --region us-east-1
```

**EC2 instance** — launch an instance (Amazon Linux 2 or Ubuntu) and install Docker:

```sh
# Amazon Linux 2
sudo yum update -y
sudo amazon-linux-extras install docker -y
sudo service docker start
sudo usermod -aG docker ec2-user
```

Make sure port `3000` (or your chosen `CONTAINER_PORT`) is open in the instance's security group.

### 2. Configure GitHub secrets and variables

In your repository, go to **Settings → Secrets and variables → Actions** and add:

**Secrets** (sensitive values):

| Name | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | AWS IAM access key with ECR and EC2 permissions |
| `AWS_SECRET_ACCESS_KEY` | Corresponding secret key |
| `EC2_HOST` | Public IP or DNS of your EC2 instance |
| `EC2_USER` | SSH username (e.g. `ec2-user` or `ubuntu`) |
| `EC2_SSH_KEY` | Private SSH key used to connect to EC2 |
| `DATABASE_URL` | PostgreSQL connection string for your production database |

**Variables** (non-sensitive values):

| Name | Example value |
|---|---|
| `AWS_REGION` | `us-east-1` |
| `ECR_REPOSITORY` | `my-prisma-app` |
| `CONTAINER_NAME` | `prisma-app` |
| `CONTAINER_PORT` | `3000` |

### 3. How deployment works

Copy [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) to `.github/workflows/` at the root of **your own repository**. Pushing to `main` then triggers the workflow. It authenticates with AWS, builds a Docker image using Buildx (with GitHub Actions layer caching for faster rebuilds) and pushes it to ECR tagged with both the commit SHA and `latest`. It then SSHs into your EC2 instance, runs `prisma migrate deploy` against your production database using a one-off container, pulls the new image, gracefully stops and removes the old container if one exists, starts the new one with `DATABASE_URL` injected at runtime, waits 5 seconds and verifies the container is running — printing logs and exiting non-zero if it isn't. Finally it prunes old images to keep the EC2 disk clean.
