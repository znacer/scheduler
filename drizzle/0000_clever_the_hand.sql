CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	CONSTRAINT "category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "group" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	CONSTRAINT "group_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "schedule" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "schedule_group" (
	"schedule_id" integer,
	"groupname" varchar,
	"write" boolean
);
--> statement-breakpoint
CREATE TABLE "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"start" bigint,
	"duration" bigint,
	"description" text,
	"category_id" integer,
	"schedule_id" integer
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	CONSTRAINT "user_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_group" (
	"username" varchar NOT NULL,
	"groupname" varchar NOT NULL,
	"admin" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "schedule_group" ADD CONSTRAINT "schedule_group_schedule_id_schedule_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedule"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_group" ADD CONSTRAINT "schedule_group_groupname_group_name_fk" FOREIGN KEY ("groupname") REFERENCES "public"."group"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_schedule_id_schedule_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedule"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_username_user_name_fk" FOREIGN KEY ("username") REFERENCES "public"."user"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_groupname_group_name_fk" FOREIGN KEY ("groupname") REFERENCES "public"."group"("name") ON DELETE no action ON UPDATE no action;