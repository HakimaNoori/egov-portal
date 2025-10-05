# Frontend file structure

```
frontend/
├── public/                         # Static assets (favicon, logo, icons, etc.)
│   └── favicon.ico
│
├── src/
│   ├── assets/                     # Images, fonts, and global static files
│   │   └── logo.png
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── layout/                 # Layouts (role-based dashboards)
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── CitizenLayout.tsx
│   │   │   ├── OfficerLayout.tsx
│   │   │   ├── DheadLayout.tsx
│   │   │   └── PublicLayout.tsx
│   │   │
│   │   ├── ui/                     # Common UI (buttons, modals, inputs, tables)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   └── NotificationBell.tsx
│   │   │
│   │   └── charts/                 # Reusable charts for analytics
│   │       ├── RequestsChart.tsx
│   │       └── PaymentsChart.tsx
│   │
│   ├── hooks/                      # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useNotifications.ts
│   │   └── useRoleGuard.ts
│   │
│   ├── layouts/                    # Higher-level layouts
│   │   ├── DashboardLayout.tsx     # Common dashboard wrapper
│   │   └── AuthLayout.tsx
│   │
│   ├── pages/                      # Role-based pages
│   │   ├── public/                 # Public pages
│   │   │   ├── LandingPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   └── ContactPage.tsx
│   │   │
│   │   ├── citizen/                # Citizen pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ServicesList.tsx
│   │   │   ├── ServiceDetails.tsx
│   │   │   ├── MyRequests.tsx
│   │   │   ├── RequestDetails.tsx
│   │   │   ├── MyPayments.tsx
│   │   │   ├── PaymentDetails.tsx
│   │   │   ├── Notifications.tsx
│   │   │   └── Profile.tsx
│   │   │
│   │   ├── officer/                # Officer pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── RequestsList.tsx
│   │   │   ├── RequestDetails.tsx
│   │   │   ├── Notifications.tsx
│   │   │   └── Profile.tsx
│   │   │
│   │   ├── dhead/                  # Department Head pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── RequestsList.tsx
│   │   │   ├── RequestDetails.tsx
│   │   │   ├── PaymentsList.tsx
│   │   │   ├── ServicesList.tsx
│   │   │   ├── Notifications.tsx
│   │   │   └── Profile.tsx
│   │   │
│   │   ├── admin/                  # Admin pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── UsersList.tsx
│   │   │   ├── DepartmentsList.tsx
│   │   │   ├── ServicesList.tsx
│   │   │   ├── RequestsList.tsx
│   │   │   ├── PaymentsList.tsx
│   │   │   ├── Notifications.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── Settings.tsx
│   │   │
│   │   ├── error/                  # Error pages
│   │   │   ├── NotFound.tsx
│   │   │   ├── Unauthorized.tsx
│   │   │   └── ServerError.tsx
│   │
│   ├── routes/                     # Route definitions
│   │   ├── index.tsx               # React Router setup
│   │   ├── ProtectedRoute.tsx
│   │   └── RoleBasedRoute.tsx
│   │
│   ├── services/                   # API calls (RTK Query or Axios)
│   │   ├── api.ts                  # axios instance
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   ├── requestService.ts
│   │   ├── paymentService.ts
│   │   ├── serviceService.ts
│   │   └── notificationService.ts
│   │
│   ├── store/                      # State management (Redux Toolkit)
│   │   ├── index.ts
│   │   ├── authSlice.ts
│   │   ├── userSlice.ts
│   │   ├── requestSlice.ts
│   │   ├── paymentSlice.ts
│   │   ├── serviceSlice.ts
│   │   └── notificationSlice.ts
│   │
│   ├── types/                      # TypeScript types & interfaces
│   │   ├── auth.d.ts
│   │   ├── user.d.ts
│   │   ├── request.d.ts
│   │   ├── payment.d.ts
│   │   ├── service.d.ts
│   │   └── notification.d.ts
│   │
│   ├── utils/                      # Utility functions
│   │   ├── formatDate.ts
│   │   ├── formatCurrency.ts
│   │   └── roleUtils.ts
│   │
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   ├── index.css                   # Global styles
│   └── tailwind.config.js          # Tailwind config
│
├── package.json
└── tsconfig.json
```