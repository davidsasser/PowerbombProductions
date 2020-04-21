DROP TABLE IF EXISTS "topics" CASCADE;
DROP TYPE IF EXISTS "topic" CASCADE;

CREATE TYPE topic AS ENUM ('wwe', 'aew', 'njpw', 'general', 'off_topic');

CREATE TABLE "topics"(
 	"topic_id" serial PRIMARY KEY,
	"topic_type" topic DEFAULT 'off_topic',
	"subject" TEXT NOT NULL,
 	"message"  TEXT,
	"created_on" TIMESTAMP NOT NULL,
	"pinned" BOOLEAN DEFAULT FALSE,
 	"user_id" INT REFERENCES user_account (user_id)
);