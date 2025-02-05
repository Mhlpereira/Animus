CREATE TABLE "users" (
  "id" UUID PRIMARY KEY ,
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP NOT NULL
);

CREATE TABLE "customers" (
  "id" UUID PRIMARY KEY ,
  "name" VARCHAR(255) NOT NULL,
  "birthday" DATE NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP,
  "user_id" UUID UNIQUE,
  FOREIGN KEY("user_id") REFERENCES "users"("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- CREATE TABLE "groups" (
--   "id" UUID PRIMARY KEY,
--   "name" VARCHAR(255) NOT NULL,
--   "owner_id" UUID NOT NULL,
--   "created_at" TIMESTAMP NOT NULL,
--   "description" VARCHAR(255),
--   "updated_at" TIMESTAMP,
--   FOREIGN KEY("owner_id") REFERENCES "users"("id") ON UPDATE CASCADE ON DELETE CASCADE
-- );

-- CREATE TABLE "tipos_grupo" (
--   "id" UUID PRIMARY KEY,
--   "name" VARCHAR(255) NOT NULL UNIQUE
-- );

-- CREATE TABLE "turmas" (
--   "id" UUID PRIMARY KEY,
--   "name" VARCHAR(255) NOT NULL,
--   "starts" DATE NOT NULL,
--   "max_capacity" INTEGER,
--   "created_at" TIMESTAMP NOT NULL,
--   "end" DATE NOT NULL
-- );

-- CREATE TABLE "turma_aluno" (
--   "id" UUID PRIMARY KEY,
--   "turma_id" UUID NOT NULL,
--   "customer_id" UUID NOT NULL,
--   FOREIGN KEY("turma_id") REFERENCES "turmas"("id") ON UPDATE CASCADE ON DELETE CASCADE,
--   FOREIGN KEY("customer_id") REFERENCES "customers"("id") ON UPDATE CASCADE ON DELETE CASCADE
-- );
