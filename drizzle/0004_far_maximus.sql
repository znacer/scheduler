ALTER TABLE "schedule_group" ADD CONSTRAINT "schedule_group_schedule_id_groupname_pk" PRIMARY KEY("schedule_id","groupname");--> statement-breakpoint
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_username_groupname_pk" PRIMARY KEY("username","groupname");