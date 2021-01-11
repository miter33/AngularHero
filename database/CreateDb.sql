CREATE DATABASE InfoDB
COLLATE Cyrillic_General_CI_AS
GO

USE InfoDB

CREATE TABLE Heroes
(ID int PRIMARY KEY IDENTITY, Name nvarchar(50) NOT NULL)

GO
CREATE TABLE Users
(ID uniqueidentifier NOT NULL, [Email] nvarchar(50) NOT NULL, [Password] nvarchar(MAX) NOT NULL, [UserName] nvarchar(MAX) NOT NULL)

GO
CREATE PROCEDURE sp_select_all_heroes AS
BEGIN
    SELECT * FROM Heroes
END;

GO
CREATE PROCEDURE sp_select_hero_by_id
    @id int
AS
BEGIN
SELECT * FROM Heroes WHERE Id = @id
END;

GO
CREATE PROCEDURE sp_insert_hero
    @name NVARCHAR(50)
AS
BEGIN
INSERT INTO Heroes(Name) 
VALUES(@name)
SELECT CAST(SCOPE_IDENTITY() AS INT) AS LAST_IDENTITY
END;

GO
CREATE PROCEDURE sp_update_hero
    @id int,
	@name nvarchar(50)
AS
BEGIN
UPDATE Heroes SET Name = @Name WHERE Id = @id
END;

GO
CREATE PROCEDURE sp_delete_hero
    @id int
AS
BEGIN
DELETE FROM Heroes WHERE Id = @id
END;

GO
CREATE PROCEDURE sp_select_user_by_email
@email nvarchar(50)
AS
BEGIN
    SELECT * FROM Users WHERE Email = @email
END;

GO
CREATE PROCEDURE sp_select_all_hero_by_name
@name nvarchar(50)
AS
BEGIN
    SELECT * FROM Heroes WHERE Name LIKE @name + '%'
END;
GO