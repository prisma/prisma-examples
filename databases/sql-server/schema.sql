CREATE DATABASE [prisma-demo];
GO

CREATE TABLE [prisma-demo].[dbo].[User] (
	[id] int PRIMARY KEY IDENTITY (1, 1),
	[createdAt] datetime NOT NULL DEFAULT(getdate ()),
	[email] varchar(255) NOT NULL UNIQUE,
	[name] text,
)
CREATE TABLE [prisma-demo].[dbo].[Post] (
    [id] int PRIMARY KEY IDENTITY (1, 1),
    [createdAt] datetime NOT NULL DEFAULT (getdate()),
    [title] text NOT NULL,
    [content] text,
    [published] bit NOT NULL DEFAULT ('0'),
    [authorId] int NOT NULL CONSTRAINT [POST_AUTHOR] FOREIGN KEY (authorId) REFERENCES [dbo].[User]([id]),
)
CREATE TABLE [prisma-demo].[dbo].[Comment] (
	[id] int PRIMARY KEY IDENTITY (1, 1),
	[createdAt] datetime NOT NULL DEFAULT(getdate ()),
	[comment] text NOT NULL,
	[writtenById] int NOT NULL CONSTRAINT [COMMENT_AUTHOR] FOREIGN KEY (writtenById) REFERENCES [dbo].[User] ([id]),
	[postId] int NOT NULL CONSTRAINT [COMMENT_POST] FOREIGN KEY (postId) REFERENCES [dbo].[Post] ([id]),
)

CREATE TABLE [prisma-demo].[dbo].[Tag] (
	[id] int PRIMARY KEY IDENTITY (1, 1),
	[tag] VARCHAR(255) NOT NULL UNIQUE,
)

CREATE TABLE [prisma-demo].[dbo].[_TagToPost] (
	[A] int NOT NULL CONSTRAINT [TAG_POST] FOREIGN KEY (A) REFERENCES [dbo].[Post] ([id]) ON DELETE CASCADE,
	[B] int NOT NULL CONSTRAINT [TAG_TAG] FOREIGN KEY (B) REFERENCES [dbo].[Tag]  ([id]) ON DELETE CASCADE INDEX [POST_ID_INDEX] (B),
  CONSTRAINT [UNIQUE_TAG_TO_POST] UNIQUE CLUSTERED (A, B)
)
