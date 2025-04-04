# Basic Concepts

## What is a Beacon?

!!! info "Definition"

    A **Beacon** is the core entity in the BuyersBeacon application. It represents an offering from a seller or service provider that potential buyers can discover, evaluate, and interact with.

    Think of a Beacon as a digital signpost that helps buyers find what they're looking for.

The name "BuyersBeacon" reflects this concept of guiding buyers to relevant offerings.

## Key Entities

### Users

Users are the individuals who interact with the platform. A user can be a buyer, a seller, or both.

* **Profile**: Each user has a profile with basic information.
* **Authentication**: User authentication is handled through Clerk.

### Beacons

Beacons are listings created by sellers/providers.

* **Properties**: Title, description, pricing, images, categories, etc.
* **Visibility**: Can be published (visible to all) or saved as drafts.

### Reviews

Reviews allow users to provide feedback on beacons they've interacted with.

* **Rating**: Typically a star rating system.
* **Comments**: Textual feedback about the experience.
* **Tags**: Optional categorization of the review content.

### Chats

Real-time communication between users.

* **Messages**: Text-based communication.
* **Real-time Updates**: Powered by SignalR.

## Platform Flow

1. **User Registration/Login**: Users authenticate via Clerk.
2. **Beacon Creation**: Sellers create beacons describing their offerings.
3. **Discovery**: Buyers browse or search for beacons.
4. **Interaction**: Buyers and sellers communicate via chat.
5. **Feedback**: After engagement, buyers can leave reviews on beacons.