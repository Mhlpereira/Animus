CREATE TABLE "users" (
  "id" UUID PRIMARY KEY ,
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "is_active" BOOLEAN NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP,
  "password_update_at" TIMESTAMP
);

CREATE TABLE "customers" (
  "id" UUID PRIMARY KEY ,
  "name" VARCHAR(255) NOT NULL,
  "nickname" VARCHAR(255),
  "birthday" DATE NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP,
  "user_id" UUID UNIQUE,
  FOREIGN KEY("user_id") REFERENCES "users"("id") ON UPDATE CASCADE ON DELETE CASCADE
);
