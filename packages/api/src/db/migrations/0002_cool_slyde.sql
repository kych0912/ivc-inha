CREATE TABLE "published" (
	"id" serial PRIMARY KEY NOT NULL,
	"from" timestamp NOT NULL,
	"to" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
