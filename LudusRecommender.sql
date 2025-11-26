CREATE DATABASE LudusRecommenderDB;
USE LudusRecommenderDB;
GO

-- DROP DATABASE IF EXISTS LudusRecommenderDB;
-- GO

/*
Tables Needed - GameLog, Review, GameLove, GameDifficulty, TopTenGames

Procedures Needed - CreateAllTables, DropAllTables, CreateRoles, 
InitalizeLudusRecommender, LoveAndRank, RecommendedGames, GenreSummary

Roles Needed - Admin, Reviewer, Viewer 
 */

CREATE PROCEDURE CreateAllTables
AS
	BEGIN

	CREATE TABLE GameLog (
		GameID INT PRIMARY KEY IDENTITY(1,1),
		Game VARCHAR(50),
		Genre VARCHAR(50),
		Platform VARCHAR(50),
		ReleaseYear INT
	);
	
	CREATE TABLE Review (
		ReviewID INT PRIMARY KEY IDENTITY(1,1),
		GameID INT FOREIGN KEY REFERENCES GameLog(GameID),
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
		GameID INT FOREIGN KEY REFERENCES GameLog(GameID),
		Game VARCHAR(50),
		LoveRank VARCHAR(1)
	);

	CREATE TABLE GameDifficulty (
		DifficultyID INT PRIMARY KEY IDENTITY(1,1),
		GameID INT FOREIGN KEY REFERENCES GameLog(GameID),
		Game VARCHAR(50),
		DifficultyRank VARCHAR(1)
	);

	CREATE TABLE TopTenGames (
		TopTenID INT PRIMARY KEY IDENTITY(1,1),
		GameID INT FOREIGN KEY REFERENCES GameLog(GameID),
		Game VARCHAR(50),
		Rank INT
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

CREATE PROCEDURE CreateAllRoles
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
	EXEC CreateAllRoles;
	END;
GO

EXEC InitalizeLudusRecommender;
GO

CREATE PROCEDURE RecommendedGames -- REVISE LOGIC
AS  
	SELECT *
	FROM GameLog GL
	JOIN Review R ON GL.GameID = R.GameID
	WHERE R.Recommended = 1;
GO

CREATE PROCEDURE InsertGameLogData
@Game VARCHAR(50),
@Genre VARCHAR(50),
@Platform VARCHAR(50),
@ReleaseYear INT
AS
	BEGIN
	INSERT INTO GameLog (Game, Genre, Platform, ReleaseYear)
	VALUES 
	(@Game, @Genre, @Platform, @ReleaseYear);
	END;
GO

-- Game Genre Search 
CREATE PROCEDURE GameGenreSearch
@Genre1 VARCHAR(50),
@Genre2 VARCHAR(50),
@Genre3 VARCHAR(50),
@Genre4 VARCHAR(50)
AS
	BEGIN
	IF @Genre2 IS NULL AND @Genre3 IS NULL AND @Genre4 IS NULL
		BEGIN
			SELECT GL.Game, GL.Genre, GL.Platform, GL.ReleaseYear
			FROM GameLog GL
			WHERE GL.Genre LIKE '%' + @Genre1 + '%'
		END
	ELSE IF @Genre3 IS NULL AND @Genre4 IS NULL
		BEGIN
			SELECT GL.Game, GL.Genre, GL.Platform, GL.ReleaseYear
			FROM GameLog GL
			WHERE GL.Genre LIKE '%' + @Genre1 + '%'
			AND GL.Genre LIKE '%' + @Genre2 + '%'
		END
	ELSE IF @Genre4 IS NULL
		BEGIN
			SELECT GL.Game, GL.Genre, GL.Platform, GL.ReleaseYear
			FROM GameLog GL
			WHERE GL.Genre LIKE '%' + @Genre1 + '%'
			AND GL.Genre LIKE '%' + @Genre2 + '%'
			AND GL.Genre LIKE '%' + @Genre3 + '%'
		END
	ELSE
	BEGIN
			SELECT GL.Game, GL.Genre, GL.Platform, GL.ReleaseYear
			FROM GameLog GL
			WHERE GL.Genre LIKE '%' + @Genre1 + '%'
			AND GL.Genre LIKE '%' + @Genre2 + '%'
			AND GL.Genre LIKE '%' + @Genre3 + '%'
			AND GL.Genre LIKE '%' + @Genre4 + '%'
		END
	END;
GO
-- Game Platform Search
CREATE PROCEDURE GamePlatformSearch
@Platform VARCHAR(50)
AS
	BEGIN
		SELECT GL.Game, GL.Genre, GL.Platform, GL.ReleaseYear
		FROM GameLog GL
		WHERE GL.Platform LIKE '%' + @Platform + '%'
	END;
GO
-- Game Release Year Search
CREATE PROCEDURE GameReleaseYearSearch
@ReleaseYear INT
AS
	BEGIN
		SELECT GL.Game, GL.Genre, GL.Platform, GL.ReleaseYear
		FROM GameLog GL
		WHERE GL.ReleaseYear = @ReleaseYear
	END;
GO
	
-- Make backlog table and add all backlog games

-- INSERTION STATEMENTS FOR DATA FROM EXCEL
EXEC InsertGameLogData 'Untitled Goose Game', 'Puzzle-Indie-Adventure-Action', 'Playstation 5', 2019;
EXEC InsertGameLogData 'Metal: Hellsinger', 'FPS-Rhythm', 'Playstation 5', 2022;
EXEC InsertGameLogData 'Inscryption', 'Horror-Puzzle-Adventure', 'Playstation 4', 2021;
EXEC InsertGameLogData 'Dark Pictures: House of Ashes', 'Survival-Horror-Adventure', 'Playstation 5', 2021;
EXEC InsertGameLogData 'Thomas was Alone','Platformer-Puzzle', 'Playstation 4', 2012;
EXEC InsertGameLogData 'Hue', 'Puzzle-Platformer-Indie', 'Playstation 4', 2016;
EXEC InsertGameLogData 'A Plague Tale: Innocence', 'Action-Adventure-Stealth', 'Playstation 5', 2019;
EXEC InsertGameLogData 'Life is Strange', 'Adventure-Episodic', 'Playstation 4', 2015;
EXEC InsertGameLogData 'Tchia','Indie-Adventure-Open World', 'Playstation 5', 2023;
EXEC InsertGameLogData 'Rollerdrome', 'Sports-Action-Indie', 'Playstation 5', 2022;
EXEC InsertGameLogData 'Telling Lies', 'Adventure-Episodic', 'Playstation 5', 2019;
EXEC InsertGameLogData 'Haven', 'RPG-Indie-Adventure', 'Playstation 5', 2020;
EXEC InsertGameLogData 'Titanfall 2', 'FPS-Action', 'Playstation 5', 2016;
EXEC InsertGameLogData 'Returnal', 'Roguelike-FPS-Action', 'Playstation 5', 2021;
EXEC InsertGameLogData 'Batman: Enemy Within', 'Adventure-Episodic', 'Playstation 4', 2017;
EXEC InsertGameLogData 'Marvels Spider Man 2', 'Action-Adventure', 'Playstation 5', 2023;
EXEC InsertGameLogData 'Slay the Spire', 'Roguelike-Card Game-Indie', 'Playstation 4', 2019;
EXEC InsertGameLogData 'Journey', 'Adventure-Indie', 'Playstation 4', 2012;
EXEC InsertGameLogData 'My Little Pony: A Maretime Bay Adventure', 'Adventure-Indie', 'Playstation 5', 2022;
EXEC InsertGameLogData 'Demon Slayer: Kimetsu no Yaiba – The Hinokami Chronicles', 'Action-Fighting', 'Playstation 5', 2021;
EXEC InsertGameLogData 'The Last Of Us Part I', 'Action-Adventure', 'Playstation 5', 2022;
EXEC InsertGameLogData 'Fast & Furious: Spy Racers Rise of SH1FT3RS', 'Racing-Action', 'Playstation 5', 2021;
EXEC InsertGameLogData 'Nour: Play with your Food', 'Puzzle-Indie', 'Playstation 5', 2023;
EXEC InsertGameLogData 'TMNT: Shredder’s Revenge', 'Action-Indie-Fighting', 'Playstation 5', 2022;
EXEC InsertGameLogData 'Tunic', 'Action-Adventure-Indie', 'Playstation 5', 2022;
EXEC InsertGameLogData 'Kena: Bridge of Spirits', 'Action-Adventure-Indie', 'Playstation 5', 2021;
EXEC InsertGameLogData 'For Honor', 'Action-Adventure', 'Playstation 5', 2017;
EXEC InsertGameLogData 'Marvels Midnight Suns', 'RPG-Action', 'Playstation 5', 2024;
EXEC InsertGameLogData 'Spiritfarer', 'Management-Indie-Adventure', 'Playstation 5', 2020;
EXEC InsertGameLogData 'Harry Potter: Quidditch Champions', 'Sports-Adventure', 'Playstation 5', 2023;
EXEC InsertGameLogData 'Cat Quest', 'RPG-Indie', 'Playstation 4', 2017;
EXEC InsertGameLogData 'Deaths  Door', 'Action-Adventure-Indie', 'Playstation 4', 2021;
EXEC InsertGameLogData 'Jedi Survivor', 'Action-Adventure', 'Playstation 5', 2023;
EXEC InsertGameLogData 'Gotham Knights', 'Action-Adventure', 'Playstation 5', 2023;
EXEC InsertGameLogData 'Raji: An Ancient Epic', 'Action-Adventure-Indie', 'Playstation 5', 2020;
EXEC InsertGameLogData 'Road 96', 'Adventure-Indie', 'Playstation 5', 2021;
EXEC InsertGameLogData 'Call Of The Sea', 'Adventure-Indie', 'Playstation 5', 2020;
EXEC InsertGameLogData 'What Remains Of Edith Finch', 'Adventure-Indie', 'Playstation 4', 2017;
EXEC InsertGameLogData 'Tomb Raider', 'Action-Adventure', 'Playstation 4', 2013;
EXEC InsertGameLogData 'Cult of the Lamb', 'Action-Adventure-Indie', 'Playstation 5', 2022;
EXEC InsertGameLogData 'Uncharted Golden Abyss', 'Action-Adventure', 'Playstation Vita', 2008;
EXEC InsertGameLogData 'Gris', 'Platformer-Puzzle-Indie', 'Playstation 4', 2018;
EXEC InsertGameLogData 'Infamous Second Son', 'Action-Adventure', 'Playstation 3', 2014;
EXEC InsertGameLogData 'The Devil Inside Me', 'Horror-Adventure', 'Playstation 5', 2019;
EXEC InsertGameLogData 'The Plucky Squire', 'Action-Adventure-Indie', 'Playstation 5', 2023;
EXEC InsertGameLogData 'Mystic Pillars', 'RPG-Indie', 'Playstation 5', 2023;
EXEC InsertGameLogData 'Buzz Lightyear Toy Story 2', 'Action-Adventure', 'Playstation 4', 2023;
EXEC InsertGameLogData 'Undertale', 'RPG-Indie', 'Playstation Vita', 2015;
EXEC InsertGameLogData 'Astro Bot', 'Platformer-Indie', 'Playstation 5', 2018;
EXEC InsertGameLogData 'Tiny Kin', 'Platformer-Indie', 'Playstation 5', 2022;
EXEC InsertGameLogData 'The Wolf Among Us', 'Adventure-Episodic', 'Playstation Vita', 2014;
EXEC InsertGameLogData 'Wolfenstein: The New Order', 'FPS-Action', 'Playstation 5', 2014;
-- 2024 Completions
GO