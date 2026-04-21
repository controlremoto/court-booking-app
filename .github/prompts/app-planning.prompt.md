---
name: app-planning
description: Use to recall the application plan steps
---

Here’s a consolidated, high-level plan for your scalable, secure, and modern court booking application, including all integrations and architectural recommendations:

---

## Final Plan: Court Booking Application

### 1. Core Features & User Roles

#### Court Types & Management
- Tennis (1), Padel (2), Soccer 7 (1), Beach Volley (1+)
- Courts are dynamic: admins can add/remove courts and types

#### User Roles
- **Local Government Manager:** Full admin, can manage admins, courts, calendars, announcements, and users
- **Admin:** Moderate bookings, manage users, view stats
- **User:** View landing page, register/login, book courts, view profile/history

---

### 2. Landing Page & UI/UX

- **Hero Banner:** Responsive, with images for each court type (tennis, padel, soccer, beach volley)
  - Images editable by admin (upload, edit, remove)
- **Booking Flow:**  
  - Select court type → calendar → book → confirmation (with email)
  - Only logged-in users can book
- **Profile:**  
  - Booking history, results, opponent/team info (auto-generated if not entered), Name, email, phone, country, region, communa, Address and profile picture (optional)
- **Admin Dashboard:**
- Manage courts, users, hero images, announcements
- **Announcements:**  
  - Displayed on landing page, managed by admin

---

### 3. Authentication & Security

- **Supabase Auth:**  
  - Email/password, Google SSO, Microsoft SSO, OTP (email/phone)
  - Integrate with OAuth providers (Google, Microsoft) using secure libraries.
- **Frontend Security:**
  - Input validation, HTTPS, secure token/cookie handling, no password logging, rate limiting/CAPTCHA (optional)
  - Passwords never stored or logged in the frontend.
  - Use HTTPS for all API calls.
  - Use secure cookies or tokens for session management.
  - Rate limiting and CAPTCHA for registration/login (optional).
  - Sanitize all user input before sending to backend.  
- **Role-based Access:**  
  - Row-level security in Supabase for user/admin separation

---

### 4. Architecture & Best Practices

- **Clean Architecture:**  
  - Presentation (UI/pages/components)
  - Domain (hooks, context, business logic)
  - Data (API services, Supabase integration, models)
- **SOLID Principles:**
  - Single Responsibility: Each component/hook does one thing.
  - Open/Closed: Components are extensible, not modifiable.
  - Liskov Substitution: Use interfaces/props for interchangeable components.
  - Interface Segregation: Small, focused props/interfaces.
  - Dependency Inversion: UI depends on abstractions, not concrete API calls.
- **Hooks:**
  - Custom hooks for API calls (e.g., useCourts, useBookings, useHeroImages).
  - useEffect:
    - Fetch data only when dependencies change.
    - Avoid duplicate calls and infinite loops by managing dependency arrays and state updates carefully.
    - Context for global state (user, auth, theme).
- **State Management:**  
  - Context for global state (user, auth, theme)
  - Reducers for complex state
  - Memoize expensive calculations.


---

### 5. Supabase Integration

- **Database:**  
  - Tables: users, courts, bookings, announcements, hero_images, results
  - Row-level security for user/admin separation
- **Storage:**  
  - Hero images and user-uploaded files
- **APIs:**  
  - Supabase client for all CRUD operations
- **Real-time:**  
  - Optional: live updates for bookings/announcements

---

### 6. Admin Dashboard

- Manage courts (add/remove, block slots/weeks)
- Manage users (add admins, block/unblock users)
- Manage hero images (upload/edit/delete)
- Manage announcements

---

### 7. Notifications

- Email confirmation for bookings/cancellations (Supabase functions or external service)
- Optional: push notifications

---

### 8. Mocking & Local Development

- Mock API layer with fallback for offline development
- All endpoints covered with mock data for robust UI testing

---

### 9. Scalability & Extensibility

- Easily add new court types, user roles, or features
- Clean, modular codebase for future growth

---

**Ready for:**  
- Schema design and Supabase setup  
- UI wireframes and component breakdown  
- Implementation of authentication, booking, and admin flows
