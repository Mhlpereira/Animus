CREATE TABLE "users" (
	"id" UUID NOT NULL UNIQUE,
	"email" VARCHAR(255) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	"created_at" DATE NOT NULL,
	PRIMARY KEY("id")
);


CREATE TABLE "customers" (
	"id" UUID NOT NULL UNIQUE,
	"name" VARCHAR(255) NOT NULL,
	"birthday" DATE NOT NULL,
	"created_at" DATE NOT NULL,
	"updated_at" DATE,
	PRIMARY KEY("id")
);


CREATE TABLE "groups" (
	"id" UUID NOT NULL UNIQUE,
	"name" VARCHAR(255) NOT NULL,
	"owner_id" UUID NOT NULL,
	"created_at" DATE NOT NULL,
	"description" VARCHAR(255),
	"updated_at" DATE,
	PRIMARY KEY("id")
);


CREATE TABLE "turmas" (
	"id" UUID NOT NULL UNIQUE,
	"name" VARCHAR(255) NOT NULL,
	"starts" DATE NOT NULL,
	"max_capacity" INTEGER,
	"created_at" DATE NOT NULL,
	"end" DATE NOT NULL,
	PRIMARY KEY("id")
);


CREATE TABLE "turma_aluno" (
	"id" UUID NOT NULL UNIQUE,
	PRIMARY KEY("id")
);


ALTER TABLE "customers"
ADD FOREIGN KEY("id") REFERENCES "groups"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "users"
ADD FOREIGN KEY("id") REFERENCES "customers"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "customers"
ADD FOREIGN KEY("id") REFERENCES "turma_aluno"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "turmas"
ADD FOREIGN KEY("id") REFERENCES "turma_aluno"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "groups"
ADD FOREIGN KEY("id") REFERENCES "turmas"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;