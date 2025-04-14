# Buyers Beacon

This is the github repo for Group 1's COMP7080 project for Term 1 BCIT. 

## Premise

Buyers beacon is a platform built for posting wanted ads for people who want to sell their unwanted items. 

Basically it's a reverse Ebay or craigslist. 

## Developing

It is recommended to run the app in WSL or linux, but windows will generally work fine.

### Runtimes

- Ensure node is installed (>=20.9.0). A version manager like nvm is highly recommended https://nodejs.org/en/download
- Ensure dotnet is installed (>=9.0.1) https://dotnet.microsoft.com/en-us/download
- Install pnpm https://pnpm.io/installation

### Env

Place a .env file with the following in the `/server` directory

```aiignore
AZURE_STORAGE_CONNECTION_STRING=[...]
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_[...]
CLERK_SECRET_KEY=sk_[...]
```

And place the following in your `/client` directory

```aiignore
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_[..]
CLERK_SECRET_KEY=sk_[...]
API_URL=http://[...]
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/auth/login/post
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/auth/register/post
```

### Database

Buyers Beacon requires a connection to a Sql Server instance. Use `dotnet ef database update` to create the schema.

For more info https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli

### Cloud Dependencies

Buyers Beacon requires a connection to an Azure Storage Account with a container that is configured to store images.

It also requires a Clerkjs account to be setup and the keys to be placed in the env file.

### Usage

1. in the project directory, run `pnpm install` to install dependencies in both `client` and `server` folders
2. run `pnpm dev` to run both client and server

## Contributing

### Git Management

#### Commits

Commit titles should be written in the format `<commit type>(<module>):<commit message>`

Common `commit type`s are `feat`, `fix`, `hotfix`, `chore`, `test`, `doc`. Developers can choose to add their own.

Common `module`s are `server`, `client`, `build`, `all`.

Commit titles should always be relatively concise as they will be truncated on the github website.

If more explanation for a commit is needed, use a second -m param. These will be displayed on github.com as a formatted paragraph.

#### Pull requests

Pull request title conventions are the same as git commit title conventions above.

Before submitting a pull request, it is expected that the developer do the following:

- self code review
- manually test new feature
- manually test related features

After that is complete, the developer may notify the team their PR is ready for review. 

#### Code Review Guidelines

When reviewing teammates code, do the following:

1. Attempt to understand what's going on. If you can't, the code is too complicated or not documented well enough
2. Look for corresponding documentation. Does this change need to be documented?
3. Look for the following issues in code:
- duplicated code
- excessive indenting
- symbols outside of naming conventions

