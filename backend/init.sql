-- ==============================
-- Database Schema for E-Gov Portal
-- ==============================

DROP TABLE IF EXISTS notifications, payments, documents, requests, services, departments, users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('citizen', 'officer', 'head', 'admin')) NOT NULL,
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    fee DECIMAL(10,2) DEFAULT 0,
    department_id INT REFERENCES departments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    service_id INT REFERENCES services(id) ON DELETE CASCADE,
    status VARCHAR(50) CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected')) DEFAULT 'submitted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    request_id INT REFERENCES requests(id) ON DELETE CASCADE,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    request_id INT REFERENCES requests(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('pending', 'success', 'failed')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO departments (name, description) VALUES
('Interior', 'Handles passports and national IDs'),
('Commerce', 'Handles business licenses'),
('Housing', 'Handles land and housing related services');

INSERT INTO services (name, description, fee, department_id) VALUES
('Passport Renewal', 'Apply for renewing your passport', 50.00, 1),
('National ID Update', 'Update details on your national ID card', 0.00, 1),
('Business License', 'Apply for a new business license', 100.00, 2);
