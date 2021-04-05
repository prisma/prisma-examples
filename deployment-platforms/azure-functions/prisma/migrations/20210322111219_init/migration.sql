-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF__User__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    CONSTRAINT [PK__User__id] PRIMARY KEY ([id]),
    CONSTRAINT [User_email_unique] UNIQUE ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF__Post__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [content] NVARCHAR(1000),
    [published] BIT NOT NULL CONSTRAINT [DF__Post__published] DEFAULT 0,
    [authorId] INT,
    CONSTRAINT [PK__Post__id] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [FK__Post__authorId] FOREIGN KEY ([authorId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;
