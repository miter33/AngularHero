USE InfoDB
GO
CREATE PROCEDURE sp_select_all_heroes AS
BEGIN
    SELECT * FROM Heroes
END;
GO