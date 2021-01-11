USE InfoDB
GO
CREATE TABLE Users
(ID uniqueidentifier NOT NULL, [Email] nvarchar(50) NOT NULL, [Password] nvarchar(MAX) NOT NULL, [UserName] nvarchar(MAX) NOT NULL)