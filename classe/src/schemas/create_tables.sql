DROP TABLE IF EXISTS subscribers;
CREATE TABLE subscribers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);