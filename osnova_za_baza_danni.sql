DROP SCHEMA SPORT_RESERVE CASCADE;
-- Създаване на схема
CREATE SCHEMA IF NOT EXISTS sport_reserve;
SET search_path TO sport_reserve;

-- Таблица за спортни зали
CREATE TABLE IF NOT EXISTS sports_halls (
    id SERIAL PRIMARY KEY,                   -- Уникален идентификатор за всяка зала
    name VARCHAR(50) NOT NULL,              -- Име на спортната зала
    mobile VARCHAR(15) NOT NULL,            -- Телефон за връзка със спортната зала
    address TEXT NOT NULL,                  -- Адрес на спортната зала
    description TEXT,                       -- Описание на спортната зала
    entry VARCHAR(4) NOT NULL               -- free, paid, both
);
--SCHEDULE TABLE
CREATE TABLE IF NOT EXISTS schedule(
	id SERIAL PRIMARY KEY,-- schedule's id we use in the sport_hall_schedule
	open TIME(0) NOT NULL,
	close TIME(0) NOT NULL
);

CREATE TABLE IF NOT EXISTS sport_hall_schedule(
	sports_hall_id INT NOT NULL,
	schedule_id INT NOT NULL,
	CONSTRAINT fk_sports_hall FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id)
	CONSTRAINT fk_schedule FOREIGN KEY (schedule_id) REFERENCES schedule(id)
);

-- Таблица за потребители
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,                  -- Уникален идентификатор за потребителите
    name VARCHAR(100) NOT NULL,             -- Име на потребителя
    email VARCHAR(100) UNIQUE NOT NULL,     -- Имейл адрес
    password VARCHAR(255) NOT NULL,         -- Парола
    role VARCHAR(20) DEFAULT 'user',        -- Роля (user, admin)
    phone VARCHAR(15)                       -- Телефонен номер (по избор)
);

-- Таблица за резервации
CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,                  -- Уникален идентификатор за всяка резервация
    sports_hall_id INT NOT NULL,            -- ID на спортната зала
    user_id INT NOT NULL,                   -- ID на потребителя
    date TIMESTAMP WITHOUT TIME ZONE NOT NULL,    -- Дата и час на резервацията
	duration INT NOT NULL,					--запазваме колко време ще е резервацията (в часове),
    description TEXT,                       -- Описание на резервацията
    CONSTRAINT fk_sports_hall FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id), -- Връзка със sports_halls
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) -- Връзка с users
);

-- Таблица за ценообразуване
CREATE TABLE IF NOT EXISTS pricing (
    id SERIAL PRIMARY KEY,                  -- Уникален идентификатор за ценовите записи
    sports_hall_id INT NOT NULL,            -- ID на спортната зала
    price_per_hour DECIMAL(10, 2) NOT NULL, -- Цена на час
    CONSTRAINT fk_pricing_sports_hall FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id)
);

-- Таблица за снимки на спортни зали
CREATE TABLE IF NOT EXISTS sports_hall_photos (
    id SERIAL PRIMARY KEY,                  -- Уникален идентификатор за снимките
    sports_hall_id INT NOT NULL,            -- ID на спортната зала
    photo_url TEXT NOT NULL,                -- URL на снимката
    CONSTRAINT fk_photo_sports_hall FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id)
);

-- Таблица за плащания
CREATE TABLE IF NOT EXISTS payment_transactions (
    id SERIAL PRIMARY KEY,                  -- Уникален идентификатор за плащането
    reservation_id INT NOT NULL,            -- ID на резервацията
    amount DECIMAL(10, 2) NOT NULL,         -- Платена сума
    payment_date TIMESTAMP NOT NULL,        -- Дата на плащането
    status VARCHAR(20) DEFAULT 'pending',   -- Статус на плащането (paid, pending, failed)
    CONSTRAINT fk_payment_reservation FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

-- Таблица за отзиви
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,                  -- Уникален идентификатор за отзива
    sports_hall_id INT NOT NULL,            -- ID на спортната зала
    user_id INT NOT NULL,                   -- ID на потребителя
    rating INT CHECK (rating BETWEEN 1 AND 5), -- Оценка от 1 до 5
    review TEXT,                            -- Текстов отзив
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Дата на създаване
    CONSTRAINT fk_review_sports_hall FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id),
    CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Таблица за удобства на спортните зали
CREATE TABLE IF NOT EXISTS sports_hall_facilities (
    sports_hall_id INT NOT NULL,            -- ID на спортната зала
	facility_id INT NOT NULL,				 -- facility's id
    CONSTRAINT fk_sports_hall FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id)
	CONSTRAINT fk_facility FOREIGN KEY (facility_id) REFERENCES facilities(id)
);
--FACILITIES TABLE
CREATE TABLE IF NOT EXISTS facilities(
	id SERIAL PRIMARY KEY,--id for each facility
	name VARCHAR(100)--name of the facility
);
--SPORT_HALL_TYPES 
CREATE TABLE IF NOT EXISTS sports_hall_types(
	id SERIAL PRIMARY KEY,--id for each type
	name VARCHAR(100)--type name
);
