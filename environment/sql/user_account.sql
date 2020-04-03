DROP TABLE IF EXISTS "user_account" CASCADE;

CREATE TABLE "user_account"(
    "user_id" serial PRIMARY KEY,
    "username" VARCHAR (50) UNIQUE NOT NULL,
    "password" VARCHAR (100) NOT NULL,
    "email" VARCHAR (355) UNIQUE NOT NULL,
    "created_on" TIMESTAMP NOT NULL,
    "last_login" TIMESTAMP,
    "is_admin" BOOLEAN DEFAULT FALSE
);

INSERT INTO user_account(
    "username", "password", "email", "created_on", "is_admin")
    VALUES ('test', '$2a$10$iAc8NevR8Asw6pnp5dO5AO1Az8RRAeN/iLTh6dMhoCPnooVHh1XvO', 'david.sasser95@gmail.com', now()::timestamp(0), true);