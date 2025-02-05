ALTER TABLE "schedule_group" DROP CONSTRAINT "schedule_group_schedule_id_schedule_id_fk";
--> statement-breakpoint
ALTER TABLE "schedule_group" DROP CONSTRAINT "schedule_group_groupname_group_name_fk";
--> statement-breakpoint
ALTER TABLE "user_group" DROP CONSTRAINT "user_group_username_user_name_fk";
--> statement-breakpoint
ALTER TABLE "user_group" DROP CONSTRAINT "user_group_groupname_group_name_fk";
--> statement-breakpoint
ALTER TABLE "schedule_group" ADD CONSTRAINT "schedule_group_schedule_id_schedule_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedule"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "schedule_group" ADD CONSTRAINT "schedule_group_groupname_group_name_fk" FOREIGN KEY ("groupname") REFERENCES "public"."group"("name") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_username_user_name_fk" FOREIGN KEY ("username") REFERENCES "public"."user"("name") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_groupname_group_name_fk" FOREIGN KEY ("groupname") REFERENCES "public"."group"("name") ON DELETE cascade ON UPDATE cascade;