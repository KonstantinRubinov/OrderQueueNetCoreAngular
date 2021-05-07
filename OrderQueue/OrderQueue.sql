CREATE DATABASE OrderQueue;


CREATE TABLE USERS (
	userOrderNumber bigint IDENTITY(1,1) PRIMARY KEY,
	userName nvarchar(50) NOT NULL,
	userTime bigint NOT NULL,
	userStatus int NOT NULL
);


CREATE PROCEDURE [dbo].[AddUser] (@userName nvarchar(50), @userTime bigint)
AS
set transaction isolation level Read Uncommitted
	begin try
		begin transaction
			INSERT INTO USERS (userName, userTime, userStatus) VALUES (@userName, @userTime, 0);
			SELECT * from USERS where userOrderNumber=SCOPE_IDENTITY();
		commit transaction
	end try
	begin catch
		rollback transaction
	end catch
	
	
CREATE PROCEDURE [dbo].[GetAllUsers]
AS
SELECT * from USERS where USERS.userStatus=0;


CREATE PROCEDURE [dbo].[CallNextUser]
AS
set transaction isolation level Read Uncommitted
	begin try
		begin transaction
			UPDATE USERS SET userStatus = 2 WHERE USERS.userStatus=1;
			UPDATE USERS SET userStatus = 1 WHERE USERS.userStatus=0 and userOrderNumber = ( SELECT TOP 1 userOrderNumber FROM USERS WHERE USERS.userStatus=0 ORDER BY userOrderNumber );
			SELECT * from USERS WHERE USERS.userStatus=1;
		commit transaction
	end try
	begin catch
		rollback transaction
	end catch
	
	
	

