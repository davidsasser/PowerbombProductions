DROP TABLE IF EXISTS "posts" CASCADE;

CREATE TABLE "posts"(
    "post_id" serial PRIMARY KEY,
    "title" VARCHAR(256),
    "content" TEXT,
    "user_id" INT REFERENCES user_account (user_id),
    "created_on" TIMESTAMP
);