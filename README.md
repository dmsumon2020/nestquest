# NestQuest: Real Estate Management System

### Live Demo

Visit the live website: [NestQuest](https://amazing-sfogliatella-39e3b0.netlify.app)

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
   - [Home Page](#home-page)
   - [Navbar](#navbar)
   - [All Properties Page](#all-properties-page)
   - [Property Details Page](#property-details-page)
   - [User Dashboard](#user-dashboard)
   - [Agent Dashboard](#agent-dashboard)
   - [Admin Dashboard](#admin-dashboard)
   - [Authentication System](#authentication-system)
3. [Technical Details](#technical-details)
   - [Authentication](#authentication)
   - [Data Fetching](#data-fetching)
   - [Protected Routes](#protected-routes)
4. [Advanced Features](#advanced-features)
5. [Setup Instructions](#setup-instructions)
6. [License](#license)

## Overview

This project is a full-stack real estate management system built using React, Vite, Tailwind CSS, MongoDB, and Tanstack Query. It provides functionalities for users, agents, and admins to interact seamlessly with properties, reviews, and transactions.

## Features

### Home Page

The homepage contains:

- **Navbar**: Links to Home, All Properties, Dashboard, and Login (protected routes).
- **Banner/Slider**: A visual introduction to the platform.
- **Advertisement Section**: Highlights 4 featured properties with details such as:
  - Property Image
  - Location
  - Price Range
  - Verification Status
  - "Details" Button (redirects to the Property Details page)
- **Latest User Reviews Section**: Displays 3 recent reviews with:
  - Reviewer Name & Image
  - Review Description
  - Property Title
- **Unique Extra Sections**: Two additional sections for more engagement (e.g., featured agents, trending locations).

### Navbar

The navbar includes:

- Website name and logo.
- Navigation links (Home, All Properties, Dashboard, Login).
- User profile details (name, profile picture, logout button) upon login.

### All Properties Page

- Displays all admin-verified properties in card format, showing:
  - Property Image, Title, Location, Agent Name & Image, Verification Status, Price Range.
  - "Details" Button (redirects to Property Details page).
- **Search Functionality**: Based on property location.
- **Sort Functionality**: By price range.
- Protected Route.

### Property Details Page

Displays detailed information about a property, including:

- Property Title, Description, Price Range, and Agent Name.
- **Wishlist Button**: Adds the property to the user's wishlist and saves it to the database.
- **Review Section**: Displays all reviews for the property.
- **Add Review Button**: Opens a modal for users to submit a review.
- Protected Route.

### User Dashboard

Accessible to logged-in users with the following routes:

1. **My Profile**: Displays user details (e.g., name, image, role).
2. **Wishlist**: Displays wishlisted properties with options to:
   - "Make an Offer" (navigate to an offer form).
   - "Remove" (delete from wishlist and database).
3. **Property Bought**: Lists properties with offered amounts and statuses:
   - Statuses: "Pending", "Accepted", "Bought" (with transaction ID).
   - "Pay" button appears when the status is "Accepted".
4. **My Reviews**: Displays user-submitted reviews with delete functionality.

### Agent Dashboard

Accessible to logged-in agents with the following routes:

1. **Agent Profile**: Displays agent details (e.g., name, image, role).
2. **Add Property**: Form to add new properties.
3. **My Added Properties**: Lists agent-added properties with options to:
   - Update (if not rejected).
   - Delete.
4. **My Sold Properties**: Tabular view of sold properties with:
   - Property details, Buyer details, Sold price.
   - Total sold amount.
5. **Requested Properties**: Lists user offers for properties with:
   - Accept/Reject buttons to update statuses.
   - Automatically rejects other offers when one is accepted.

### Admin Dashboard

Accessible to admins with the following routes:

1. **Admin Profile**: Displays admin details (e.g., name, image, role).
2. **Manage Properties**: Allows verification or rejection of properties.
3. **Manage Users**: Options to:
   - Make Admin, Make Agent, Mark as Fraud, Delete User.
4. **Manage Reviews**: Displays all reviews with delete functionality.
5. **Advertise Property**: Lists verified properties with an "Advertise" button to feature them on the homepage.

### Authentication System

- Registration and login using email/password and social login.
- Validation for registration:
  - Password must be at least 6 characters, include a capital letter and a special character.
- Displays errors (below input or via toast) for invalid credentials.
- JWT for session management, stored in localStorage.

## Technical Details

### Authentication

- Firebase authentication for user management.
- JWT for secure session handling.

### Data Fetching

- Tanstack Query for efficient data fetching and state management.

### Protected Routes

- Private routes for user, agent, and admin-specific pages.

## Advanced Features

1. **Search & Sort Functionality** on the All Properties page.
2. **JWT Implementation** for secure authentication.
3. **Advertise Property** feature for admin.
4. **Total Sold Amount** displayed on the My Sold Properties page.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Navigate to the project directory:
   ```bash
   cd real-estate-management
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up Firebase for authentication and MongoDB for the database.
5. Start the development server:
   ```bash
   npm run dev
   ```
