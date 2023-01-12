USE master  

GO  

CREATE DATABASE TestApp

Go

USE TestApp

--To Create Users table
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Password] [varchar](50) NOT NULL,
	[Role] [varchar](50) NULL)

-- To Insert values in Users table
INSERT INTO Users 
VALUES
('Dwayne', 'Johnson', 'dj@test.com', '9876543210', 'No:1, First street', 'Coimbatore', 'TamilNadu', 'India', '642005'),
('Mark', 'Henry', 'mh@test.com', '9876543210', 'No:2, Second street', 'Chennai', 'TamilNadu', 'India', '600028'),
('Matt', 'Prior', 'mp@test.com', '9876543210', 'No:3, Third street', 'Bangalore', 'Karnataka', 'India', '56003'),
('Rohit', 'Sharma', 'rs@test.com', '9876543210', 'No:4, Fourth street', 'Mumbai', 'Maharastra', 'India', '100001'),
('Virat', 'Kohli', 'vk@test.com', '9876543210', 'No:5, Fifth street', 'Delhi', 'Delhi', 'India', '000001')