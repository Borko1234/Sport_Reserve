
CREATE SCHEMA sport_reserve;
SET search_path TO sport_reserve;

-- Таблица за спортни зали
CREATE TABLE sports_halls (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    entry VARCHAR(4) NOT NULL CHECK (entry IN ('free', 'paid', 'both'))
);

-- Таблица за график
CREATE TABLE schedule (
    id SERIAL PRIMARY KEY,
    open TIME NOT NULL,
    close TIME NOT NULL
);

-- Таблица за връзка между спортни зали и график
CREATE TABLE sport_hall_schedule (
    sports_hall_id INT NOT NULL,
    schedule_id INT NOT NULL,
    PRIMARY KEY (sports_hall_id, schedule_id),
    CONSTRAINT fk_sports_hall FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id),
    CONSTRAINT fk_schedule FOREIGN KEY (schedule_id) REFERENCES schedule(id)
);

-- Таблица за потребители
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    phone VARCHAR(15)
);

-- Таблица за резервации
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    sports_hall_id INT NOT NULL,
    user_id INT NOT NULL,
    date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    duration INT NOT NULL,
    description TEXT,
    CONSTRAINT fk_sports_hall FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Таблица за ценообразуване
CREATE TABLE pricing (
    id SERIAL PRIMARY KEY,
    sports_hall_id INT NOT NULL,
    price_per_hour DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_pricing_sports_hall FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id)
);

-- Таблица за снимки на спортни зали
CREATE TABLE sports_hall_photos (
    id SERIAL PRIMARY KEY,
    sports_hall_id INT NOT NULL,
    photo_url TEXT NOT NULL,
    CONSTRAINT fk_photo_sports_hall FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id)
);

-- Таблица за отзиви
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    sports_hall_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_sports_hall FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id),
    CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Таблица за удобства
CREATE TABLE facilities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);
-- Таблица за удобства на спортните зали
CREATE TABLE sports_hall_facilities (
    sports_hall_id INT NOT NULL,
    facility_id INT NOT NULL,
    PRIMARY KEY (sports_hall_id, facility_id),
    CONSTRAINT fk_sports_hall FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id),
    CONSTRAINT fk_facility FOREIGN KEY (facility_id) REFERENCES facilities(id)
);

-- Таблица за типове спортни зали
CREATE TABLE sports_hall_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);
