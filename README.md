# Invoice Tracker - Frontend

This is the frontend for an Invoice Tracker application, written in TypeScript and built with Next.js, Tailwind CSS, and Shadcn.

It interacts with the backend server to manage invoices efficiently, with a smooth client-side routing system and attractive UI.

The backend repository can be found [here](https://github.com/adamrichardturner/invoice-tracker-backend).

![](preview.gif)

## Demo

You can view a live demo of this application [here](https://invoice-tracker.adamrichardturner.dev/).

Visit the URL and click `Try Demo` to explore the application.

## Features

- **Next.js**: A React framework with App Router for fast, modern web applications
- **TypeScript**: For type safety and improved developer experience
- **Tailwind CSS**: For utility-first CSS styling
- **Shadcn**: For enhanced UI components and consistent design
- **JWT Authentication**: Simple and secure authentication flow
- **Zustand Store**: Global state management for invoices and UI
- **React Hook Form**: Form handling with Zod schema validation
- **Custom Hooks**: Abstracts API services and state management
- **Axios**: For HTTP requests with interceptors for auth
- **Client-side Protection**: Route protection without complex middleware

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

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Usage

The application provides a simple demo login flow:

1. Click the `Try Demo` button on the login page
2. Explore the invoice management interface
3. Create, edit, and manage invoices
4. View invoice statistics and status updates

## Contributing

Contributions are welcome! Please feel free to:

- Open issues for bugs or feature requests
- Submit pull requests with improvements
- Suggest UI/UX enhancements

## License

This project is open source and available under the MIT license.
