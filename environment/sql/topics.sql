DROP TABLE IF EXISTS "topics" CASCADE;
DROP TYPE IF EXISTS "topic" CASCADE;

CREATE TYPE topic AS ENUM ('WWE', 'AEW', 'NJPW', 'General', 'Off Topic');

CREATE TABLE "topics"(
 	"topic_id" serial PRIMARY KEY,
	"topic_type" topic DEFAULT 'Off Topic',
	"subject" INT NOT NULL,
 	"message"  TEXT,
	"created_on" TIMESTAMP NOT NULL,
 	"user_id" INT REFERENCES user_account (user_id)
);