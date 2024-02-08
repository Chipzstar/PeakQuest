-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `__drizzle_migrations` (
	`id` numeric PRIMARY KEY,
	`hash` text NOT NULL,
	`created_at` numeric
);
--> statement-breakpoint
CREATE TABLE `character` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`path` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `prompt` (
	`id` integer PRIMARY KEY NOT NULL,
	`prompt` text NOT NULL,
	`variables` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `quest` (
	`id` text PRIMARY KEY NOT NULL,
	`goal` text NOT NULL,
	`goal_params` text NOT NULL,
	`raw_openai_response` text,
	`openai_response` text,
	`is_response_valid` integer,
	`prompt_id` integer NOT NULL,
	`character_id` integer,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`character_id`) REFERENCES `character`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`prompt_id`) REFERENCES `prompt`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`email_verified` integer,
	`image` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quest_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`is_complete` integer,
	`index` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);
*/
