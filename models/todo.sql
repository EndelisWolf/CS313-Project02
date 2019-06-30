CREATE DATABASE todo;

CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL UNIQUE,
    username        TEXT NOT NULL UNIQUE,
    password        TEXT NOT NULL
);

CREATE TABLE list (
    id              SERIAL PRIMARY KEY,
    noteEntry       Text NOT NULL,
    usersId         int REFERENCES users(id),
    dueDate         date     
);

INSERT INTO users (name, username, password) VALUES ('Michael', 'Pancake', 'maple'), ('John', 'Waffle', 'blueberry'), ('Kim', 'FrenchToast', 'strawberry');

INSERT INTO list (usersId, noteEntry, dueDate) VALUES (1, 'Dont go to school on July 4th', '07/04/2019');
INSERT INTO list (usersId, noteEntry, dueDate) VALUES (1, 'Find Wallet', '06/30/2019');
INSERT INTO list (usersId, noteEntry, dueDate) VALUES (1, 'Apply for internships', '07/01/2019');
INSERT INTO list (usersId, noteEntry, dueDate) VALUES (1, 'Go to SLC', '07/20/2019');

CREATE USER todo_user WITH PASSWORD 'remember';

GRANT SELECT, INSERT, UPDATE, DELETE ON users TO todo_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON list TO todo_user;

GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO todo_user;
GRANT USAGE, SELECT ON SEQUENCE list_id_seq TO todo_user;

-- to log in psql -Utodo_user todo