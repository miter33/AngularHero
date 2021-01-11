USE InfoDB
GO
CREATE PROCEDURE sp_select_all_hero_by_name
@name nvarchar(50)
AS
BEGIN
    SELECT * FROM Heroes WHERE Name LIKE @name + '%'
END;
GO