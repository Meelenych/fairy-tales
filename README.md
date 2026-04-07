# Fairy Tales App

A Next.js application for browsing fairy tales stored in a local SQLite database with comprehensive admin functionality.

## Features

- **Header Navigation**: Consistent navigation across all pages with responsive mobile menu
  - **Home (/)**: Landing page with hero section
  - **All Fairy Tales (/list)**: Browse all available fairy tales
  - **Random Tale (/random)**: View a randomly selected fairy tale
  - **Admin Panel (/admin)**: Comprehensive admin dashboard
- **Individual Tales (/fairy-tale/[id])**: Read specific fairy tales with click tracking
- **Admin Dashboard**: Statistics and management tools
  - Total tales count, visible/hidden counts
  - Most popular tales by click count
  - Complete CRUD operations for tales
  - Hide/show tales from public view
- **Database**: SQLite with click tracking and visibility controls

## Admin Features

### Dashboard
- **Statistics Cards**: Total, visible, and hidden tale counts
- **Popular Tales**: Top 5 most-clicked fairy tales
- **Smooth Updates**: Dashboard refreshes instantly when tales are added, edited, deleted, or visibility is toggled

### Tale Management
- **View All Tales**: Table with all tales including hidden ones
- **Add New Tales**: Create new fairy tales with all metadata using a modal form
- **Edit Tales**: Full editing capabilities for title, content, author, country, year
- **Delete Tales**: Remove tales with confirmation modal
- **Toggle Visibility**: Hide/show tales from public users with instant dashboard updates
- **Add New Tales**: Create new fairy tales with all metadata

## Technical Architecture

- **Backend**: Next.js API routes with controller pattern
- **Database**: SQLite with migrations
- **Frontend**: React with TypeScript, Tailwind CSS
- **Components**: Modular, reusable components following best practices
- **Type Safety**: Shared TypeScript interfaces across the application

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize the database:
   ```bash
   npm run init-db
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Navigation

- **Header Navigation**: Consistent navigation across all pages with responsive mobile menu
  - **Home (/)**: Landing page with hero section
  - **All Fairy Tales (/list)**: Browse all available fairy tales
  - **Random Tale (/random)**: View a randomly selected fairy tale
  - **Admin Panel (/admin)**: Comprehensive admin dashboard
- **Individual Tales (/fairy-tale/[id])**: Read specific fairy tales with "Back to List" link

## Build

To build for production:
```bash
npm run build
npm start
```