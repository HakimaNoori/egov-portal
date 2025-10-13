# 📘 E-Government Citizen Services Portal

## 📖 Project Overview
The **E-Government Citizen Services Portal** is a full-stack web application that allows citizens to apply for government services online. Instead of visiting offices physically, users can submit applications, upload documents, make payments, and track requests—all in one place.  
It includes dedicated portals for **citizens**, **officers**, **department heads**, and **administrators**, ensuring an efficient end-to-end workflow.

---

## 🎯 Main Objective
To develop a **secure**, **scalable**, and **user-friendly** web portal that digitalizes government service processes, reduces paperwork, and improves coordination between citizens and government departments.

---

## 🧪 Test Accounts

| Role | Email | Password |
|------|--------|-----------|
| System Administrator | admin@system.com | admin123 |
| Officer User | officer@gmail.com | 123456 |
| DHead User | dhead@gmail.com | 123456 |
| Admin User | admin@gmail.com | 123456 |

---

## 🌐 Live Demo
> To explore the live demo, you can log in with the above **test accounts**:

🚀 **Live Portal:** [https://egov-portal-frontend-6ue6.onrender.com](https://egov-portal-frontend-6ue6.onrender.com)  
🧠 **Backend API:** [https://egov-portal.onrender.com](https://egov-portal.onrender.com/)


> ⚠️ Due to Render’s free-tier limitations, initial load and file operations (upload/preview) may be slow.  
> For smoother performance, **clone and run the project locally** as shown below.

---

## 🧭 How to Run Locally

### 1️⃣ Clone the Repository
You can clone using either HTTPS or SSH:

  ```bash
    # Using HTTPS
    git clone https://github.com/HakimaNoori/egov-portal.git

    # Or using SSH
    git clone git@github.com:HakimaNoori/egov-portal.git
  ```

  ### 2️⃣ 📦 Backend Setup
1. Open your terminal and navigate to the backend directory:

   ```bash
   cd backend
   ```
2. Install dependencies:

    ```bash
    npm install
    ```
3. Create a `.env` file in the backend folder:

    ```bash
    DB_USER=your_postgres_username
    DB_PASSWORD=your_postgres_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=your_database_name
    JWT_SECRET=your_jwt_secret
    JWT_REFRESH_SECRET=your_jwt_refresh_secret
    PORT=5000
    ```
4. Start the backend server:

    ```bash
    npm install
    ```
    Backend will run on: http://localhost:5000
---

### 3️⃣ 💻 Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:

    ```bash
    cd frontend
    ```
2. Install dependencies:

    ```bash
    npm install
    ```
3. Create a `.env` file in the frontend folder:

    ```bash
    VITE_API_URL=http://localhost:5000
    ```
4. Run the frontend app:

    ```bash
    npm run dev
    ```
    Frontend will run on: http://localhost:5173

---

## 🧩 Project Architecture
- **Frontend:** React.js + Vite + Tailwind CSS + Redux  
- **Backend:** Node.js + Express.js  
- **Database:** PostgreSQL  
- **Deployment:** Render (frontend & backend)  
- **Version Control:** GitHub  

The app follows a **modular architecture**, separating frontend, backend, and database layers for scalability and easy maintenance.

---

## 👥 User Roles and Permissions

### 🧍 Citizens
- Register and log in  
- View and update profiles  
- Apply for government services  
- Upload documents (PDF/JPG)  
- Track application status  
- Receive request notifications  

### 🧑‍💼 Officers
- Secure login  
- View pending applications in their department  
- Review and verify documents  
- Approve/reject with feedback  
- Search/filter by applicant, service, or status  

### 🧑‍💻 Admins
- Manage users, departments, and services  
- Check reports and analytics  
- View approved/rejected requests and revenues  
- Full access to all department data  

---

## 🔗 Entity Relationships
- **Department → Services** (1:N)  
- **Service → Requests** (1:N)  
- **Request → Documents** (1:N)  
- **Request → Payment** (1:1)  
- **User → Requests** (1:N)  

---

## 🧰 Technologies Used

### Frontend
- React.js  
- Vite  
- Tailwind CSS  
- Redux Toolkit  

### Backend
- Node.js  
- Express.js  
- PostgreSQL  
- Sequelize ORM  
- JWT Authentication  
- Multer (File Uploads)  
- Nodemailer *(optional)*  

### Deployment
- Render.com (Hosting): Frontend & Backend  
- GitHub (Version Control)

---

## 👩‍💻 Author
**Name:** Hakima Noori  
**Role:** Full Stack Web Developer  
**Tech Stack:** React.js, Node.js, Express.js, PostgreSQL, Redux, Tailwind CSS  
**Project Type:** Capstone Project  
**Deployed On:** Render.com  
