CREATE TABLE "Tasks" (
    "id" SERIAL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "is_complete" BOOLEAN DEFAULT FALSE,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);