CREATE DATABASE chat_db;
--создаем базу данных

USE chat_db;
--создаём таблицу с юзерами
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    user_password VARCHAR(100),
    profile_picture VARCHAR(255),
    is_admin BOOLEAN DEFAULT FALSE,
    hashedRT VARCHAR(255) NULL
);
hashedRT VARCHAR(255) NULL; --сохраняем хэш
--теперь все пароли будут записаны в качестве хэша -это защищает доступ,
--поэтому старые записи без хэшированных паролей не будут приняты при входе в аккаунт


--создаем таблицу для сообщений
CREATE TABLE `messages` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    groupId INT NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (senderId) REFERENCES `users`(id),
    FOREIGN KEY (groupId) REFERENCES `groups`(id)
);


--создаём таблицу для групп и связующую таблицу, для членов групп
CREATE TABLE `groups` ( --обратные кавычки нужны, т.к. в MySQL groups зарезервировано
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE `group_members` (
    userId INT NOT NULL,
    groupId INT NOT NULL,
    PRIMARY KEY (userId, groupId),  -- Композитный ключ
    FOREIGN KEY (userId) REFERENCES `users`(id),
    FOREIGN KEY (groupId) REFERENCES `groups`(id)
);

--таблица для конференций
CREATE TABLE conferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    groupId INT NOT NULL,
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (groupId) REFERENCES `groups`(id) 
);


--тестовые данные
INSERT INTO `groups` (name) VALUES ('test group');

INSERT INTO `group_members` (userId, groupId) VALUES
(5, 1),
(9, 1),
(8, 1),
(7, 1),
(10, 1),
(11, 1);

INSERT INTO `messages` (senderId, groupId, content) VALUES
(5, 1, 'Hello, I\'m User-Test'),
(9, 1, 'Hello, I\'m user12'),
(8, 1, 'Hello, I\'m user'),
(7, 1, 'Hello, I\'m UTest'),
(10, 1, 'Hello, I\'m UserKid'),
(11, 1, 'Hello, I\'m User5T');

INSERT INTO `conferences` (title, description, groupId, startTime, endTime) VALUES
('Test', 'first test conference', 1, '2024-10-09 21:00:00', '2024-10-09 21:30:00');
