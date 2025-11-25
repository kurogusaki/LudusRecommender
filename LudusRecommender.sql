CREATE DATABASE LudusRecommenderDB;
USE LudusRecommenderDB;
GO

/*
Tables Needed
-------------
GameLog
GameLove
GameDifficulty

Procedures Needed
-----------------
CreateAllTables

Users Needed
-------------

Roles Needed
------------
Admin
Recommender
User

Views Needed
-------------
LoveAndRank 
RecommendedGames
 */

CREATE PROCEDURE CreateAllTables
AS
	BEGIN

	CREATE TABLE GameLog (
		GameID INT PRIMARY KEY IDENTITY(1,1),
		Game VARCHAR(50),
		Genre VARCHAR(50),
		Platform VARCHAR(50),
		Owned VARCHAR(3),
		Replay VARCHAR(3),
		Platable VARCHAR(50),
		PreThoughts VARCHAR(200),
		PostThoughts VARCHAR(200),
		ExpectedTimeToFinish INT,
		TimeTakenToFinish INT,
		Recommended BIT -- 1 for Yes, 0 for No
	);
	
	CREATE TABLE GameLove (
		LoveID INT PRIMARY KEY IDENTITY(1,1),
		GameID INT FOREIGN KEY REFERENCES Game(GameID),
		Game VARCHAR(50),
		LoveRank VARCHAR(1)
	);

	CREATE TABLE GameDifficulty (
		DifficultyID INT PRIMARY KEY IDENTITY(1,1),
		GameID INT FOREIGN KEY REFERENCES Game(GameID),
		Game VARCHAR(50),
		DifficultyRank VARCHAR(1)
	);

	END;
GO