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
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── CitizenLayout.jsx
│   │   │   ├── OfficerLayout.jsx
│   │   │   ├── DheadLayout.jsx
│   │   │   └── PublicLayout.jsx
│   │   │
│   │   ├── ui/                     # Common UI (buttons, modals, inputs, tables)
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Table.jsx
│   │   │   └── NotificationBell.jsx
│   │   │
│   │   └── charts/                 # Reusable charts for analytics
│   │       ├── RequestsChart.jsx
│   │       └── PaymentsChart.jsx
│   │
│   ├── hooks/                      # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useNotifications.js
│   │   └── useRoleGuard.js
│   │
│   ├── layouts/                    # Higher-level layouts
│   │   ├── DashboardLayout.jsx     # Common dashboard wrapper
│   │   └── AuthLayout.jsx
│   │
│   ├── pages/                      # Role-based pages
│   │   ├── public/                 # Public pages
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   └── ContactPage.jsx
│   │   │
│   │   ├── citizen/                # Citizen pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ServicesList.jsx
│   │   │   ├── ServiceDetails.jsx
│   │   │   ├── MyRequests.jsx
│   │   │   ├── RequestDetails.jsx
│   │   │   ├── MyPayments.jsx
│   │   │   ├── PaymentDetails.jsx
│   │   │   ├── Notifications.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── officer/                # Officer pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RequestsList.jsx
│   │   │   ├── RequestDetails.jsx
│   │   │   ├── Notifications.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── dhead/                  # Department Head pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RequestsList.jsx
│   │   │   ├── RequestDetails.jsx
│   │   │   ├── PaymentsList.jsx
│   │   │   ├── ServicesList.jsx
│   │   │   ├── Notifications.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── admin/                  # Admin pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UsersList.jsx
│   │   │   ├── DepartmentsList.jsx
│   │   │   ├── ServicesList.jsx
│   │   │   ├── RequestsList.jsx
│   │   │   ├── PaymentsList.jsx
│   │   │   ├── Notifications.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── error/                  # Error pages
│   │   │   ├── NotFound.jsx
│   │   │   ├── Unauthorized.jsx
│   │   │   └── ServerError.jsx
│   │
│   ├── routes/                     # Route definitions
│   │   ├── index.jsx               # React Router setup
│   │   ├── ProtectedRoute.jsx
│   │   └── RoleBasedRoute.jsx
│   │
│   ├── services/                   # API calls (RTK Query or Axios)
│   │   ├── api.js                  # axios instance
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── requestService.js
│   │   ├── paymentService.js
│   │   ├── serviceService.js
│   │   └── notificationService.js
│   │
│   ├── store/                      # State management (Redux Toolkit)
│   │   ├── index.js
│   │   ├── authSlice.js
│   │   ├── userSlice.js
│   │   ├── requestSlice.js
│   │   ├── paymentSlice.js
│   │   ├── serviceSlice.js
│   │   └── notificationSlice.js
│   │
│   ├── utils/                      # Utility functions
│   │   ├── formatDate.js
│   │   ├── formatCurrency.js
│   │   └── roleUtils.js
│   │
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   ├── index.css                   # Global styles
│   └── tailwind.config.js          # Tailwind config
│
├── package.json
└── jsconfig.json                   # Instead of tsconfig.json

```