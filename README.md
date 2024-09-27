# RepoTracker Frontend

This is the frontend for the RepoTracker application, built with React, Vite, and Tailwind CSS.

## Features

- User authentication (login/signup)
- Dashboard with bookmarked repositories graph
- Bookmark management (add/remove)
- CSV upload for bulk bookmarking
- GitHub repository and user search
- Token-based authorization

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/shijasmhd/RepoTracker.git
cd RepoTracker
```

2. Install dependencies:

```bash
npm install
```

## Running the App

To start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Linting

To run the linter:

```bash
npm run lint
```

## Sample CSV file to check csv upload functionality

```bash
./github_repo_urls.csv
```

## Project Structure

- `src/`
  - `components/` - React components
  - `components/{page}` - Page components
  - `components/ui/` - Shadcn components
  - `hooks/` - Custom React hooks
  - `api/` - API service functions
  - `utils/` - Utility functions
  - `src/App.jsx` - Main application component
  - `src/main.jsx` - Entry point

## Dependencies

- React
- React Router
- Axios
- Tailwind CSS
- shadcn/ui components
- Tanstack React Query
- Recharts
- Formik
- Yup

For a full list of dependencies, see `package.json`.
