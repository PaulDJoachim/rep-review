
-- Create a database called 'rep_review' and run the following lines as a query


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "zip" CHAR (5)
);

CREATE TABLE "bookmarks" (
	"id" SERIAL PRIMARY KEY,
	"url" VARCHAR (1000) NOT NULL
);

CREATE TABLE user_bookmarks (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES "user",
	bookmark_id INT REFERENCES bookmarks
);

