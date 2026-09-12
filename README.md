# Modern Next.js Frontend Template

A production-ready, batteries-included Next.js 15+ frontend template designed to save developers 2-3 days of initial project setup. It comes pre-configured with the best modern tools for styling, state management, application layouts, SEO, and highly reusable components.

## 🚀 Features & What's Included

This template provides a highly scalable foundation equipped with everything you need to build complex web applications instantly:

### 1. Developer Experience & Code Quality

- **Scalable Architecture**: Well-defined folder structure (`components/`, `hooks/`, `lib/`, `store/`, `services/`, `data/`) meant for scale.
- **Automated Formatting**: **Prettier** is set up with opinionated defaults.
- **Git Hooks**: **Husky** and **Lint-Staged** automatically lint and format your code before every commit, keeping the codebase pristine.

### 2. Styling & UI Foundation

- **Tailwind CSS v4**: The latest utility-first CSS framework.
- **Shadcn UI**: Initialized and ready. Includes many pre-installed components (Buttons, Inputs, Dropdowns, Checkboxes, etc.).
- **Light Theme Default**: Designed natively with bright, clean aesthetics and high-quality semantic variables.
- **Icons**: **Lucide React** included for beautiful, consistent iconography.
- **Notifications**: **Sonner** toaster integrated globally for gorgeous, responsive toast notifications.

### 3. Application Layouts

- **Split-Screen Auth Layout**: A highly premium authentication shell with full-bleed background imagery on one side and beautifully centered forms on the other. Responsive by default (branding panel hides on mobile, preserving the logo).
- **Dashboard Layout**: A fully functional application shell featuring:
  - **Collapsible Sidebar**: Navigation sidebar seamlessly mapped to global Zustand state.
  - **Top Header**: Includes global search, notifications, and a functional User Dropdown menu.

### 4. Complete Authentication Flow & Routing

- **Next.js Middleware**: Protects the `/dashboard` routes natively at the edge. Unauthenticated users are strictly redirected to `/login`.
- **Login**: Features demo-credential enforcement (e.g., Admin, Manager, User roles).
- **Register**: Includes strictly enforced, real-time complex password validation (length, uppercase, lowercase, numbers, special characters) with inline error messages and confirm password logic.
- **Forgot Password**: Complete 3-step UI flow (Email Input → OTP Verification → New Password Setup).

### 5. Reusable Global Components

- **Headless Data Table (`<DataTable />`)**: Powered by **TanStack Table (React Table v8)**. Just pass your `columns` and `data`, and it automatically provides:
  - Global Search / Filtering
  - Column Sorting
  - Pagination
  - Row Selection Checkboxes
  - Dynamic Column Visibility Dropdown
- **Dynamic Forms (`<DynamicForm />`)**: A configuration-driven form builder powered by **React Hook Form** and **Zod**. Pass a schema and an array of field definitions, and it automatically renders accessible inputs, selects, radios, textareas, checkboxes, and even **drag-and-drop image uploads** with live previews!
- **Global Modal (`<BaseModal />`)**: A highly reusable wrapper over Shadcn's Dialog primitive. It eliminates extensive boilerplate code, allowing developers to spawn accessible modals anywhere by simply passing `title`, `isOpen`, and `children`.

### 6. State Management & Data Fetching

- **Global State**: **Zustand** is pre-configured for lightweight, boilerplate-free global state (currently managing the sidebar toggle).
- **Server State**: **TanStack React Query** is globally provided, ready to handle data fetching, caching, and background syncs.
- **API Client**: Typed browser and server **Axios** clients live under `services/api`, with feature-specific TanStack Query hooks and normalized API errors.

### 7. SEO & Performance

- **Dynamic Metadata Configuration**: Includes a reusable `constructMetadata` helper (`lib/metadata.ts`) to effortlessly generate perfect Next.js metadata objects. It ensures uniform Titles, Descriptions, OpenGraph images, and Twitter cards across all routes.
- **React Compiler Ready**: Pre-configured to be forward-compatible with React 19's optimizing compiler.

## 📂 Folder Structure Highlights

```text
.
├── app/
│   ├── (auth)/        # Authentication routes and split-screen layout
│   └── dashboard/     # Protected routes and dashboard layout shell
├── components/
│   ├── layout/        # Sidebar and Header components
│   ├── ui/            # Reusable primitives (DataTable, DynamicForm, BaseModal)
│   └── query-provider.tsx
├── data/              # Mock data and simulated API endpoints
├── lib/               # Utility functions (metadata generator, tailwind merge)
├── services/          # API configurations (e.g., pre-configured Axios client)
├── store/             # Global state management (Zustand)
└── middleware.ts      # Edge middleware for route protection
```

## 🛠 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the development server**:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 💡 How this saves you time

By using this template, you skip the tedious configuration of global state, the pain of setting up React Query providers, the hassle of configuring Axios interceptors, building authentication layouts, enforcing middleware protection, managing SEO tags, creating boilerplate for Modals, wiring complex dynamic forms, and building advanced data tables from scratch. You can start building actual features from minute one.
