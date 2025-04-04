# Authentication Flow (Clerk)

BuyersBeacon uses Clerk for authentication, which provides a secure, fully-managed authentication solution. This document outlines how Clerk is integrated into both the client and server parts of the application.

## Client-side Authentication

1. **Components & Pages:**
   * BuyersBeacon uses Clerk's pre-built components in the Next.js frontend
   * `@clerk/nextjs` provides components like `<SignIn>`, `<SignUp>`, and `<UserButton>`
   * These are implemented in auth-related pages (`/auth/login`, `/auth/register`) and the navbar

2. **Configuration & Setup:**
   * Clerk configuration in `.env.local` includes public and secret keys
   * `<ClerkProvider>` wrapper likely in `src/components/providers.tsx` or root layout
   * After successful login/signup, Clerk redirects users based on configured redirect URLs

3. **Route Protection:**
   * `middleware.ts` integrates with Clerk's `authMiddleware` to protect routes
   * Public routes (like homepage, login) are accessible to all
   * Private routes (beacons, profile, etc.) require authentication

4. **User Data Access:**
   * Frontend retrieves user information using Clerk hooks:
     * `useUser()` provides user profile data
     * `useAuth()` provides authentication status and token
   * This data is stored in Redux (`auth-slice.ts`) for global access

## Server-side Authentication

1. **JWT Validation:**
   * When client makes API requests, it includes the Clerk JWT in `Authorization` header
   * ASP.NET Core middleware validates these tokens using Clerk's public keys
   * Controllers can access authenticated user information (like Clerk User ID) from the validated token

2. **Webhook Integration:**
   * Clerk sends webhooks to the server for authentication events (user creation, updates, deletion)
   * These are received by `WebhookController.cs` or `AuthController.cs`
   * The server validates webhook signatures with `ClerkService.cs`
   * On valid webhooks, the server updates its local user database accordingly

3. **User Synchronization:**
   * BuyersBeacon maintains its own user table alongside Clerk's user management
   * When users register via Clerk, webhooks trigger local user creation
   * When user profiles are updated in Clerk, local profiles are synchronized

4. **SignalR Authentication:**
   * For real-time connections (chat), the same JWT tokens validate SignalR connections
   * `ChatHub.cs` likely validates connections based on the same token validation logic

## Authentication Flow

1. User signs up or logs in using Clerk's UI components
2. Clerk handles authentication and issues JWT tokens
3. Frontend stores these tokens (handled by Clerk's SDK)
4. Frontend includes tokens in API requests to the server
5. Server validates tokens and authorizes access to resources
6. For changes to users, Clerk webhooks synchronize data with the server

## Security Considerations

* Token expiration and refresh flows are handled by Clerk
* Sensitive operations require fresh authentication
* All authentication-related communication occurs over HTTPS
* Server uses proper signature verification for webhooks