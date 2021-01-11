USE InfoDB
GO
CREATE PROCEDURE sp_select_user_by_email
@email nvarchar(50)
AS
BEGIN
    SELECT * FROM Users WHERE Email = @email
END;
GO