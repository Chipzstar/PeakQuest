CREATE TABLE `task` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quest_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`is_complete` integer,
	`index` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
