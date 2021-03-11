-- CreateTable
CREATE TABLE "Post" (
    "post_id" SERIAL NOT NULL,
    "content" TEXT,
    "title" TEXT NOT NULL,
    "author_id" INTEGER,

    PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "bio" TEXT,
    "profile_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "name" TEXT,
    "user_id" SERIAL NOT NULL,

    PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("author_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
