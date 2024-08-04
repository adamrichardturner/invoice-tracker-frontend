# Invoice Tracker - Frontend

This is the frontend for an Invoice Tracker application, built with Next.js in TypeScript, Tailwind CSS, and Shadcn.

It interacts with the backend server to manage invoices efficiently.

The backend repository can be found [here](https://github.com/adamrichardturner/invoice-tracker-backend).

![](preview.gif)

## Demo

You can view a live demo of this application [here](https://invoice-tracker.adamrichardturner.dev/).

Visit the URL and on the login screen, click `Login as Demo User`.

## Features

- **Next.js**: A React framework for building fast web applications.
- **TypeScript**: For type safety and improved developer experience.
- **Tailwind CSS**: For utility-first CSS styling.
- **Shadcn**: For enhanced styling components.
- **App Router**: Manages routing within the application.
- **Middleware**: Handles session management.
- **Zustand Store**: Manages invoices, UI, and user state.
- **React Hook Form**: Handles invoice creation and editing with Zod schema validation.
- **Custom Hooks**: Abstracts API services and state management for cleaner code.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

You will need the backend API to effectively run this application, available [here](https://github.com/adamrichardturner/invoice-tracker-backend).

1. **Clone the repository**

   ```bash
   git clone https://github.com/adamrichardturner/invoice-tracker-frontend.git
   cd invoice-tracker-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root of the project and add the following variables:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/ <--- In production, use the frontend domain
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Create a demo account in the database**

   For the `Login as Demo User` button on the login form you will need a user account in the database with email/password as `demo@demo.com` and `password123`.

## Usage

- The frontend will be running at `http://localhost:3000`, in production this is `http://localhost:5000`.
- Navigate through the application to manage invoices, create new invoices, and edit existing ones.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.
