
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "bookmarks" (
	"id" SERIAL PRIMARY KEY,
	"url" VARCHAR (1000) NOT NULL
);

CREATE TABLE user_bookmarks (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES "user",
	bookmark_id INT REFERENCES bookmarks
);

