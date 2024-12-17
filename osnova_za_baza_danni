
USE SPORT_RESERVE;
CREATE TABLE IF NOT EXISTS sports_halls (
    id INT PRIMARY KEY,       /*Уникален идентификатор за всяка зала*/
    name VARCHAR(50) NOT NULL,               /* Име на спортната зала*/
    mobile VARCHAR(15) NOT NULL,			/*Телефон за връзка със спортната зала*/
    address TEXT NOT NULL,                   /* Адрес на спортната зала*/
    description TEXT,                        /* Описание на спортната зала*/
    schedule TEXT,                         /*Работно време на спортната зала*/
	entry varchar(4) not null                        /*free, paid,both*/
);
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,       /* Уникален идентификатор за всяка резервация*/
    sports_hall_id INT NOT NULL,             /* Свързано ID от таблицата за спортни зали*/
    date DATETIME NOT NULL,                  /* Дата и час на резервацията*/
    description TEXT,                        /* Описание на резервацията*/
    FOREIGN KEY (sports_hall_id) REFERENCES sports_halls(id)/* Свързване със спортната зала*/
);
INSERT INTO SPORTS_HALLS(ID,NAME,MOBILE,ADDRESS,DESCRIPTION,SCHEDULE,ENTRY)
VALUES(1001,"Тенис корт „Парк езеро“","088 596 3983","8000 Бургас Морска Градина","Разполага с 2 бр. съблекални с по 1 бр. бани , с 2 бр. душове и с по 1 бр. тоалетни .
 В комплекса се намира и тенис стена (неизползваема с асфалтова настилка). Единственият спорт, кой то се упражнява е тенис на корт.","понеделник - неделя:  8:00ч. - 20:00ч.","paid")
 
