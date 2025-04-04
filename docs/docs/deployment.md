# Deployment (GitHub Actions)

BuyersBeacon uses GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD). This document outlines the deployment workflow and infrastructure.

## Deployment Workflow

The application's deployment process is defined in `.github/workflows/main_buyersbeacon.yml`. This workflow automates the testing, building, and deployment of both client and server components.

### Workflow Triggers

The deployment workflow is triggered on:
* Pushes to the `main` branch
* Pull requests targeting the `main` branch

### CI/CD Pipeline Steps

1. **Checkout Code**
   * GitHub Actions checks out the repository code

2. **Setup Environment**
   * Sets up Node.js environment for client-side code
   * Sets up .NET environment for server-side code
   * Configures necessary build tools and dependencies

3. **Install Dependencies**
   * Uses pnpm to install dependencies for all workspaces
   * Likely runs `pnpm install` at the root level

4. **Client-side Build Process**
   * Lints client code (`pnpm --filter client lint`)
   * Runs client-side tests if applicable
   * Builds Next.js application (`pnpm --filter client build`)
   * Outputs production-ready static files or server-side rendered application

5. **Server-side Build Process**
   * Restores .NET packages
   * Builds the server application (`dotnet build`)
   * Publishes the application (`dotnet publish`)
   * Prepares deployable artifacts

6. **Deployment**
   * **Client:** Likely deploys to a service like Vercel, Netlify, or Azure Static Web Apps
   * **Server:** Likely deploys to Azure App Service (inferred from potential `.azurewebsites.net` URLs)
   * Sets necessary environment variables from GitHub Secrets

7. **Post-Deployment Verification**
   * May include smoke tests or health checks

## Infrastructure

Based on the workflow file name (`main_buyersbeacon.yml`), the application is likely deployed to an Azure-hosted environment:

### Deployment Architecture

GitHub Repository → GitHub Actions CI/CD Pipeline → Deployment:
- Frontend: Azure Static Web Apps or Vercel
- Backend: Azure App Service
- Database: Azure SQL Database
- Storage: Azure Blob Storage

The frontend makes API requests to the backend, which communicates with the database and blob storage.

* **Client (Frontend):** 
  * Hosted on Azure Static Web Apps or Vercel
  * Configured with production environment variables
  * Uses CDN for static assets

* **Server (Backend):**
  * Hosted on Azure App Service
  * Connected to a production database (likely Azure SQL or PostgreSQL)
  * Integrated with Azure Blob Storage for file storage

* **Database:**
  * Production database with proper backup and scaling configurations
  * Likely SQL Server or PostgreSQL on Azure

* **Environment Variables:**
  * Stored as GitHub Secrets or Azure App Configuration
  * Injected during the deployment process

## Deployment Considerations

* **Database Migrations:** The workflow may include automatic migration application
* **Zero-Downtime Deployment:** Azure App Service supports slot deployments for minimal disruption
* **Rollback Strategy:** Previous deployments can be restored if issues are detected
* **Environment Separation:** Different environments (dev, staging, production) may have separate workflows

## Monitoring & Logging

* Application likely uses Azure Application Insights or similar for monitoring
* Logs are centralized in Azure Log Analytics or a similar service
* Alerts may be configured for critical errors or performance issues