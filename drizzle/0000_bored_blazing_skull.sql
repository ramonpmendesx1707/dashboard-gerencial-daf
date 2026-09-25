CREATE TABLE `account_profile` (
	`username` text PRIMARY KEY NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`password_hash` text NOT NULL,
	`salt` text NOT NULL,
	`algorithm` text DEFAULT 'sha256-legacy' NOT NULL,
	`session_version` integer DEFAULT 0 NOT NULL,
	`updated_at` text NOT NULL
);
