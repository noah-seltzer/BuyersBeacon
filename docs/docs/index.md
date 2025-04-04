# BuyersBeacon

## Overview

BuyersBeacon is a full-stack web application designed to connect buyers and sellers (or service providers) through "beacons". It features user profiles, beacon creation/browsing, reviews, real-time chat, and user authentication. The project is structured as a monorepo using pnpm workspaces, containing a Next.js frontend client and a .NET backend server.

- User profiles with ratings
- Beacon creation and browsing
- Real-time chat between users
- Review system with ratings
- Secure authentication with Clerk

## Tech Stack

*   **Monorepo Management:** pnpm Workspaces
*   **Frontend (Client):**
    *   Framework: Next.js (App Router)
    *   Language: TypeScript
    *   Styling: Tailwind CSS
    *   UI Components: shadcn/ui (built on Radix UI)
    *   State Management: Redux Toolkit
    *   Forms: Formik
    *   Authentication: Clerk (@clerk/nextjs)
    *   Real-time: @microsoft/signalr (client)
    *   Icons: lucide-react
*   **Backend (Server):**
    *   Framework: ASP.NET Core
    *   Language: C# (.NET 9 inferred from `BuyersBeacon.sln` and latest tooling)
    *   API: RESTful APIs (ASP.NET Core Controllers)
    *   Database ORM: Entity Framework Core
    *   Real-time: SignalR
    *   Authentication: Clerk (Webhook integration, token validation)
    *   Storage: Azure Blob Storage (inferred from `BlobServiceManager.cs`)
    *   Database: (Likely SQL Server or PostgreSQL, based on typical EF Core usage)
*   **Deployment:** GitHub Actions (`.github/workflows/main_buyersbeacon.yml`)

## Project Structure

```
BuyersBeacon/
├── .github/                   # GitHub Actions workflows (CI/CD)
│   └── workflows/
│       └── main_buyersbeacon.yml
├── client/                    # Frontend Next.js application
├── server/                    # Backend ASP.NET Core application
├── README.md                  # Top-level project README
├── BuyersBeacon.sln           # Visual Studio Solution File (primarily for server)
├── package.json               # Root pnpm workspace config
├── pnpm-lock.yaml             # pnpm lock file
└── pnpm-workspace.yaml        # pnpm workspace definition
```