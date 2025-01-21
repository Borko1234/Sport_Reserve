INSERT INTO sports_halls (name, mobile, address, description, schedule, entry)
VALUES
('Тенис корт „Парк езеро“', '0888530357', 'Бургас, южна част на парк „Езеро“', 
 'Тенис корт с множество удобства.', 'понеделник - неделя: 8:00 - 20:00', 'paid'),
('Тенис корт „III-та поликлиника“', '0889348123', 'ул. „Гурко”', 
 'Тенис корт с асфалтова настилка.', 'понеделник - неделя: 8:00 - 20:00', 'paid'),
('Плувен комплекс „Флора“', '0884285425', 'Приморски парк, Бургас', 
 'Плувен басейн за деца и възрастни.', 'понеделник - неделя: 8:00 - 20:00', 'paid');
-- Примерни данни за потребители
INSERT INTO users (name, email, password, role, phone)
VALUES
('Иван Иванов', 'ivan.ivanov@example.com', 'hashedpassword1', 'user', '0888123456'),
('Мария Петрова', 'maria.petrova@example.com', 'hashedpassword2', 'user', '0888234567'),
('Администратор', 'admin@example.com', 'hashedadminpassword', 'admin', '0888345678');

-- Примерни данни за резервации
INSERT INTO reservations (sports_hall_id, user_id, date, description)
VALUES
(1, 1, '2025-01-25 10:00:00', 'Тренировка по тенис'),
(2, 2, '2025-01-26 15:00:00', 'Любителски мач по тенис'),
(3, 1, '2025-01-27 18:00:00', 'Зумба в плувния комплекс');

-- Примерни данни за ценообразуване
INSERT INTO pricing (sports_hall_id, price_per_hour, discount)
VALUES
(1, 20.00, 0.00),
(2, 15.00, 2.00),
(3, 30.00, 5.00);

-- Примерни данни за плащания
INSERT INTO payment_transactions (reservation_id, amount, payment_date, status)
VALUES
(1, 20.00, '2025-01-20 12:00:00', 'paid'),
(2, 13.00, '2025-01-21 14:00:00', 'paid'),
(3, 25.00, '2025-01-22 18:00:00', 'pending');

-- Примерни данни за отзиви
INSERT INTO reviews (sports_hall_id, user_id, rating, review)
VALUES
(1, 1, 5, 'Прекрасен корт с отлична настилка!'),
(2, 2, 4, 'Добър корт, но би могъл да има повече удобства.'),
(3, 1, 5, 'Страхотен плувен комплекс, идеален за деца.');

-- Примерни данни за удобства на спортните зали
INSERT INTO sports_hall_facilities (sports_hall_id, facility)
VALUES
(1, 'Паркинг'),
(1, 'Съблекални'),
(2, 'Интернет'),
(3, 'Бар'),
(3, 'Детски басейн');
