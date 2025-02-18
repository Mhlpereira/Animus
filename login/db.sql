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
  "user_id" UUID UNIQUE REFERENCES "users"("id"), 
  "name" VARCHAR(255) NOT NULL,
  "nickname" VARCHAR(255),
  "birthday" DATE NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE refresh_tokens (
    "user_id" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "token" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "expires_at" TIMESTAMP NOT NULL,
    PRIMARY KEY (user_id, token)
);