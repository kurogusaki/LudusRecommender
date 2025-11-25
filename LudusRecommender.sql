CREATE DATABASE LudusRecommenderDB;
USE LudusRecommenderDB;
GO

/*
Tables Needed - GameLog, GameLove, GameDifficulty

Procedures Needed - CreateAllTables, DropAllTables, CreateRoles, InitalizeLudusRecommender

Roles Needed - Admin, Reviewer, Viewer

Views Needed - LoveAndRank, RecommendedGames, GenreSummary
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

CREATE PROCEDURE DropAllTables
AS
	BEGIN
	DROP TABLE IF EXISTS GameDifficulty;
	DROP TABLE IF EXISTS GameLove;
	DROP TABLE IF EXISTS GameLog;
	END;
GO

CREATE PROCEDURE CreateRoles
AS
	BEGIN
	CREATE ROLE Admin;
	CREATE ROLE Reviewer;
	CREATE ROLE Viewer;
	END;
GO

CREATE PROCEDURE InitalizeLudusRecommender
AS
	BEGIN
	EXEC CreateAllTables;
	EXEC CreateRoles;
	END;
GO

