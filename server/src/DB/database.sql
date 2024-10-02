CREATE DATABASE chat_db;
--создаем базу данных

USE chat_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    user_password VARCHAR(100),
    profile_picture VARCHAR(255),
    is_admin BOOLEAN DEFAULT FALSE
);
--создаём таблицу с юзерами
INSERT INTO users (user_name, user_password, profile_picture, is_admin) VALUES
( 'User1', 'password1', 'profile1.jpg', FALSE),
( 'User2', 'password2', 'profile2.jpg', FALSE),
( 'AdminUser', 'adminpass', 'admin_profile.jpg', TRUE);


--создаем таблицу для истории чата
--создаём таблицу для групп и конференций