# 📘 E-Government Citizen Services Portal

  # 📖 Project Overview
  The E-Government Citizen Services Portal is a full-stack web application that enables citizens to access and apply for government services online. Instead of visiting government offices physically, users can 
  submit applications, upload required documents, make payments, and track their requests—all from a centralized online platform.
  This system also includes dedicated portals for citizens, government officers, and administrators, ensuring a smooth workflow from submission to approval and reporting.

# 🎯 Main Objective
To develop a secure, scalable, and user-friendly web portal that digitalizes government service processes, reduces paperwork, and improves efficiency between citizens and government departments.

# 🧩 Project Architecture

- Frontend: React.js + Vite + Tailwind CSS + Redux
- Backend: Node.js + Express.js
- Database: PostgreSQL
- Deployment: Render (for both frontend and backend)
- Version Control: GitHub

The system follows a modular architecture, separating frontend, backend, and database layers for better scalability and maintainability.

# 👥 User Roles and Permissions

  ## 1. Citizens

  - Register and log in.

- View and update their profiles.

- Apply for government services.

- Upload documents (PDF/JPG).

- Track application status.

- Receive notifications about request updates.

## 2. Officers

- Log in securely.

- View pending applications in their department.

- Review submitted documents.

- Approve or reject requests with feedback.

- Search and filter applications by status, applicant name, or service type.

## 3. Admins

- Manage users (citizens, officers, department heads).

- Manage departments and services.

- View reports and statistics (approved/rejected requests, total revenue, etc.).

- Access all data across departments.

# Example Entity Relationships

- One-to-Many: departments → services

- One-to-Many: services → requests

- One-to-Many: requests → documents

- One-to-One: requests → payments

- One-to-Many: users → requests

# 🧰 Technologies Used

## Frontend
- React.js – Component-based UI
- Vite – Fast build tool for modern React projects
- Tailwind CSS – Utility-first CSS framework for styling
- Redux Toolkit – For state management and API integration

## Backend
- Node.js – JavaScript runtime
- Express.js – REST API framework
- PostgreSQL – Relational database
- Sequelize ORM – Object-relational mapping for PostgreSQL
- JWT Authentication – Secure login sessions
- Multer – File upload middleware
- Nodemailer (optional) – Send email notifications

## Deployment
- Render.com – Cloud hosting for backend and frontend
- GitHub – Version control and CI/CD integration

# 👩‍💻 Author

- Name: Hakima Noori
- Role: Full Stack Web Developer
- Technologies: React.js, Node.js, Express.js, PostgreSQL, Redux, Tailwind CSS
- Project Type: Capstone Project
- Deployed On: Render












