# Contributing

Thank you for considering contributing to BuyersBeacon! This guide will help you understand how to contribute effectively to this project.

## Development Environment Setup

Follow the [Installation](getting-started/installation.md) and [Quick Start](getting-started/quickstart.md) guides to set up your development environment.

## Branching Strategy

* **Main Branch (`main`):** The production-ready code
* **Feature Branches:** Create feature branches from `dev` using the naming convention `feature/name-of-feature`
* **Bugfix Branches:** Create bugfix branches using the naming convention `bugfix/issue-description`
* **Hotfix Branches:** For urgent production fixes, create branches from `main` using `hotfix/issue-description`

## Pull Request Process

1. **Create a Branch:** Fork the repository or create a new branch based on the branching strategy
2. **Develop Your Changes:** Make focused, reasonably-sized changes
3. **Write Tests:** Add appropriate tests for your changes
4. **Ensure Quality:**
   * Client: Run `pnpm lint` to check code style
   * Client: Ensure all tests pass with `pnpm test`
   * Server: Build successfully with `dotnet build`
5. **Create a Pull Request:** Submit a PR against the appropriate target branch
6. **PR Description:** Include a clear description of your changes, references to related issues, and testing strategy
7. **Code Review:** Address any feedback from reviewers
8. **Merge:** Once approved, the PR will be merged

## Coding Standards

### Client (TypeScript/React)

* Follow the [codebase style guidelines](client.md#core-concepts)
* Use TypeScript interfaces in `/types` directory
* Follow atomic design patterns for components
* Use PascalCase for components, camelCase for functions/variables
* Maintain strict TypeScript (`strict: true`)
* Utilize Redux Toolkit for state management appropriately
* Write styles using Tailwind CSS

### Server (C#)

* Follow the [codebase style guidelines](server.md#core-concepts)
* Use PascalCase for classes, methods, properties
* Prefix interfaces with 'I' (e.g., `IBeaconService`)
* Use nullable annotations (`string?`) where appropriate
* Create DTOs for data transfer in `Models/DTOs`
* Prefix private fields with underscore

## Testing Guidelines

* **Unit Tests:** Write tests for individual components and services
* **Integration Tests:** Test interactions between different parts of the system
* **E2E Tests:** Cover critical user flows

### Client Testing

* Use Jest with React Testing Library for unit tests
* Use Cypress for end-to-end tests
* Tests should focus on behavior, not implementation details

### Server Testing

* Use xUnit or another .NET testing framework for C# tests
* Write tests for service layer methods and API endpoints

## Documentation

* Update relevant documentation when making significant changes
* Comment complex logic or non-obvious implementations
* Keep README and other documentation up to date

## Reporting Issues

* Use the issue tracker to report bugs or suggest features
* Include detailed steps to reproduce bugs
* For security issues, please contact the maintainers directly

## Community Guidelines

* Be respectful and constructive in discussions
* Help others learn and grow
* Recognize and appreciate contributions from others

Thank you for contributing to BuyersBeacon!