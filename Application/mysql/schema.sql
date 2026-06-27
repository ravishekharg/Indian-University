CREATE DATABASE university;

USE university;

CREATE TABLE students (

    id INT PRIMARY KEY AUTO_INCREMENT,

    first_name VARCHAR(100),

    last_name VARCHAR(100),

    email VARCHAR(100) UNIQUE,

    course_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (

    id INT PRIMARY KEY AUTO_INCREMENT,

    course_name VARCHAR(100),

    duration VARCHAR(50),

    fees DECIMAL(10,2)
);

CREATE TABLE users (

    id INT PRIMARY KEY AUTO_INCREMENT,

    username VARCHAR(100) UNIQUE,

    password_hash VARCHAR(255),

    role VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);