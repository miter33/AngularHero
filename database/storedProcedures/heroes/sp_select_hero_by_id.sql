USE InfoDB

GO
CREATE PROCEDURE sp_select_hero_by_id
    @id int
AS
BEGIN
SELECT * FROM Heroes WHERE Id = @id
END;
GO