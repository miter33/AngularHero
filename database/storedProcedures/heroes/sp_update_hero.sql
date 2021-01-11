USE InfoDB
GO
CREATE PROCEDURE sp_update_hero
    @id int,
	@name nvarchar(50)
AS
BEGIN
UPDATE Heroes SET Name = @Name WHERE Id = @id
END;
GO