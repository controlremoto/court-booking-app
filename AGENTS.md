# AI Agent Instructions for CourtBooker

This file provides essential guidance for AI coding agents working on the CourtBooker (Tennis Club Booking App) project. It covers dependencies, build/start instructions, environment variables, core components, hooks, architecture, and integration patterns.

---

## 1. Dependencies
- All dependencies are managed via `package.json`.
- Major libraries:
  - React (18.x)
  - React Router DOM (v6)
  - Material UI (MUI)
  - DevExtreme (UI components)
  - Styled-components
  - EmailJS (email sending)
  - React Toastify (notifications)
  - Nodemailer (for email, likely backend)
- Install dependencies:
  ```bash
  npm install
  ```

## 2. Build & Start
- **Development:**
  ```bash
  npm start
  ```
- **Production Build:**
  ```bash
  npm run build
  ```
- **Tests:**
  ```bash
  npm test
  ```

## 3. Environment Variables
- The app requires the following environment variable(s):
  - `REACT_APP_SERVER_URL` — Base URL for backend API requests (used throughout the codebase).
- Create a `.env` file in the project root:
  ```env
  REACT_APP_SERVER_URL=http://localhost:5000
  ```
  (Adjust the value as needed for your backend.)

## 4. Core Components & Parameters
- **App.js**: Main entry, sets up routes and provides `UserContext`.
- **Header**: Displays announcements (fetches from `/users/get`).
- **AdminFr**: Admin dashboard for user management (fetches from `/users/all`).
- **Homepage**: Main booking UI, shows available courts, booking logic, and navigation.
- **LogIn/Register/Reset**: Auth flows, all use `UserContext` for state.
- **Confirmation/ConfirmationCancel**: Handle booking and cancellation confirmations.
- **Modal/DeleteModal**: UI dialogs for confirmations and deletions.

## 5. Hooks
- **UserContext** (src/hooks/userContext.js):
  - Provides: `username`, `userId`, `user`, `emailToSend`, and setters.
  - Used for global user/auth state across the app.

## 6. Architectural Design & Structure
- **Frontend**: React SPA, all logic in `src/`.
  - `components/`: Shared UI and admin components.
  - `pages/`: Route-level components (Homepage, Login, Register, Reset, etc.).
  - `hooks/`: Custom hooks and context providers.
- **Routing**: Uses React Router v6 (`Routes`, `Route`).
- **State**: Mostly React state/hooks, with global user state via `UserContext`.
- **API Integration**: All API calls use `REACT_APP_SERVER_URL` as base.
- **Styling**: CSS, styled-components, and MUI.

## 7. Integration Patterns
- All API requests are made using `fetch` with the base URL from `REACT_APP_SERVER_URL`.
- Email sending uses EmailJS (frontend) and possibly Nodemailer (backend).
- Announcements and user data are fetched from backend endpoints.
- Bookings are managed via `/court/booking`, `/court/booked`, and related endpoints.

---

## Useful References
- [README.md](README.md): Project overview, features, and API endpoints.

---

**Tip:** When adding new features, ensure new API endpoints are added to this file and the README. Use `UserContext` for any user-related state that must persist across routes.
