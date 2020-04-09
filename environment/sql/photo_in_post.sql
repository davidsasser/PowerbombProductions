DROP TABLE IF EXISTS "photo_in_post" CASCADE;

CREATE TABLE "photo_in_post"(
    "img_id" serial PRIMARY KEY,
    "post_id" INT REFERENCES posts (post_id),
    "img_position" INT NOT NULL,
    "extension" VARCHAR(8) NOT NULL
);