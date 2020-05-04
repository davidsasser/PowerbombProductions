DROP TABLE IF EXISTS "replies";

CREATE TABLE "replies"(
 	"reply_id" serial PRIMARY KEY,
 	"message"  TEXT NOT NULL,
	"created_on" TIMESTAMP NOT NULL,
	"parent_id" INT DEFAULT NULL,
 	"user_id" INT REFERENCES user_account (user_id),
    "topic_id" INT REFERENCES topics (topic_id)
);