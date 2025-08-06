# UOGDOCACCESS Frontend

This is the frontend for the UOG Document Access system, built with React and Vite. It provides a user-friendly interface for students and administrators to access, verify, and manage university documents securely.

## Features

- Student document download and verification
- Admin dashboard for user and document management
- Secure authentication and verification steps
- Responsive, modern UI

## Getting Started

### Prerequisites
- Node.js (v16 or above recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/faizan-03/UOG-GOOGLE-DOCs.git
   cd UOG-GOOGLE-DOCs/frontend/UOGDOCACCESS
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the App
Start the development server:
```sh
npm run dev
# or
yarn dev
```
The app will be available at [https://uogdocs.vercel.app/]

## Project Structure

- `src/` — Main source code
  - `components/` — Reusable UI components (admin, user)
  - `pages/` — Main pages (Admin, Userboard, Register, Starter)
  - `store/` — State management (authstore)
  - `lib/` — Utility libraries (axios wrapper)
  - `assets/` — Images and static assets
- `public/` — Static files
- `vite.config.js` — Vite configuration

