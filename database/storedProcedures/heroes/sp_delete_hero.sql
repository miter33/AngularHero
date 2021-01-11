USE InfoDB
GO
CREATE PROCEDURE sp_delete_hero
    @id int
AS
BEGIN
DELETE FROM Heroes WHERE Id = @id
END;
GO