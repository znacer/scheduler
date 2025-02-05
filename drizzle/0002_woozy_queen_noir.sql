ALTER TABLE "category" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "group" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "schedule" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "schedule_group" ALTER COLUMN "schedule_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "schedule_group" ALTER COLUMN "groupname" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "schedule_group" ALTER COLUMN "write" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "start" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "duration" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "category_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "schedule_id" SET NOT NULL;