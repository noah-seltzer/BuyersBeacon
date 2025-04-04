# Jest Testing Documentation

## Setup

BuyersBeacon uses Jest with React Testing Library for unit testing React components. The configuration includes:

- **Configuration File**: `jest.config.js`
- **Setup File**: `jest.setup.ts`
- **Test Location**: `client/src/__tests__/`

### Running Tests
- **Run All Tests**: `cd BuyersBeacon/client && pnpm test`
- **Watch Mode**: `cd BuyersBeacon/client && pnpm test:watch`
- **Run Specific Test**: `cd BuyersBeacon/client && pnpm test -- -t "BeaconForm"`
- **Coverage Report**: `cd BuyersBeacon/client && pnpm test -- --coverage`

