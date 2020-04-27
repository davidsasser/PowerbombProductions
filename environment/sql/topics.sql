DROP TABLE IF EXISTS "topics" CASCADE;

CREATE TABLE "topics"(
 	"topic_id" serial PRIMARY KEY,
	"topic_type" VARCHAR(16) DEFAULT 'off_topic',
	"subject" TEXT NOT NULL,
 	"message"  TEXT,
	"created_on" TIMESTAMP NOT NULL,
	"pinned" BOOLEAN DEFAULT FALSE,
 	"user_id" INT REFERENCES user_account (user_id)
);