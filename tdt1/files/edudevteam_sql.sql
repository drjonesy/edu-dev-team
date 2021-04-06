BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "courses" (
	"_id"	INTEGER NOT NULL,
	"name"	INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "course_info" (
	"_cid"	INTEGER,
	"cname"	TEXT NOT NULL UNIQUE,
	"image"	TEXT,
	"course_url"	TEXT,
	"keywords"	TEXT,
	"title"	TEXT,
	"desc"	TEXT,
	"details"	TEXT,
	PRIMARY KEY("_cid")
);
INSERT INTO "courses" VALUES (1,'git');
INSERT INTO "courses" VALUES (2,'codeorg');
INSERT INTO "courses" VALUES (3,'tinkercad');
INSERT INTO "courses" VALUES (4,'swiftplaygrounds');
INSERT INTO "course_info" VALUES (1,'git','src/images/git.png','courses/git-version-control/course.html','free, version control, git','Git Version Control','Software for tracking changes in any set of files.','Learn how to track, review, and rollback to almost any change made to a file or folder. Git Version Control is free software and comes preconfigured with tools like Microsoft Office and Google Docs.');
INSERT INTO "course_info" VALUES (2,'codeorg','src/images/code-org.png','code-org/README.md','free, code','Intro to Coding','A free and fun way to learning computer science.',NULL);
INSERT INTO "course_info" VALUES (3,'tinkercad','src/images/tinkercad.png','tinkercad/README.md','free, cad, 3D','Start Tinkering in 3D','Bring your 3D thoughts to life using this free simple CAD tool.',NULL);
INSERT INTO "course_info" VALUES (4,'swiftplaygrounds','src/images/swift-playgrounds.png','swift-playgrounds/README.md','free, code, apple, swift','Swift Playgrounds','Learn to code swift with this 3D interactive puzzle game.',NULL);
INSERT INTO "course_info" VALUES (5,'',NULL,NULL,NULL,NULL,NULL,NULL);
COMMIT;
