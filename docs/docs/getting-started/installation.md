# Installation

## Prerequisites

* Node.js (>=20.9.0 recommended, use nvm if possible)
* .NET SDK (9.0.1 recommended)
* pnpm (Install via: `npm install -g pnpm` or see [pnpm installation guide](https://pnpm.io/installation))
* WSL or Linux environment is recommended for best results (especially hot reloading). If using WSL, clone the repository into your WSL home directory (`~`).

## Setup Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd BuyersBeacon
   ```

2. **Install dependencies for all workspaces:**
   ```bash
   pnpm install
   ```

3. **Environment Variables Setup:**
   * **Client:**
     * Navigate to `client/` and copy `example.env` to `.env.local`
     * Fill in the required values (like Clerk keys, API URL if different for local dev)
   
   * **Server:**
     * Navigate to `server/` and create a `.env` file (or configure user secrets)
     * Add necessary secrets like:
       * Database connection strings
       * Clerk secrets
       * Azure Blob Storage connection strings
     * The server uses `DotEnv.cs` to load these environment variables

4. **Database Setup (Server):**
   * Ensure your database connection string is correctly configured in the server's environment (`.env` or user secrets)
   * Apply Entity Framework Core migrations:
     ```bash
     cd server
     dotnet ef database update
     ```
     * You might need to install `dotnet-ef` tools globally: `dotnet tool install --global dotnet-ef`