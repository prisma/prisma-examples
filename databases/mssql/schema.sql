CREATE DATABASE prisma;
GO

CREATE TABLE [prisma].[dbo].[User] (
	[id] int PRIMARY KEY IDENTITY (1, 1),
	[createdAt] datetime NOT NULL DEFAULT(getdate ()),
	[email] varchar(255) NOT NULL UNIQUE,
	[name] text,
)
CREATE TABLE [prisma].[dbo].[Post] (
    [id] int PRIMARY KEY IDENTITY (1, 1),
    [createdAt] datetime NOT NULL DEFAULT (getdate()),
    [title] text NOT NULL,
    [content] text,
    [published] bit NOT NULL DEFAULT ('0'),
    [authorId] int NOT NULL CONSTRAINT [POST_AUTHOR] FOREIGN KEY (authorId) REFERENCES [dbo].[User]([id]),
)
CREATE TABLE [prisma].[dbo].[Comment] (
	[id] int PRIMARY KEY IDENTITY (1, 1),
	[createdAt] datetime NOT NULL DEFAULT(getdate ()),
	[comment] text NOT NULL,
	[authorId] int NOT NULL CONSTRAINT [COMMENT_AUTHOR] FOREIGN KEY (authorId) REFERENCES [dbo].[User] ([id]),
	[postId] int NOT NULL CONSTRAINT [COMMENT_POST] FOREIGN KEY (postId) REFERENCES [dbo].[Post] ([id]),
)

CREATE TABLE [prisma].[dbo].[Tag] (
	[id] int PRIMARY KEY IDENTITY (1, 1),
	[tag] VARCHAR(255) NOT NULL UNIQUE,
)

CREATE TABLE [prisma].[dbo].[TagToPost] (
	[postId] int NOT NULL CONSTRAINT [TAG_POST] FOREIGN KEY (postId) REFERENCES [dbo].[Post] ([id]),
	[tagId] int NOT NULL CONSTRAINT [TAG_TAG] FOREIGN KEY (tagId) REFERENCES [dbo].[Tag] ([id]),
  PRIMARY KEY (postId, tagId)
)
