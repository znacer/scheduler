import { error, type Actions } from "@sveltejs/kit";
import { z } from "zod";
import { 
    new_schedule, 
    new_task, 
    update_schedule,
    DatabaseError,
    AuthorizationError,
    ValidationError, 
    delete_task,
    delete_schedule
} from "$lib/server/db/utils";

export const actions = {
    disconnect: async ({cookies}) => {
        cookies.delete("username", {path: "/"});
        cookies.delete("session", {path: "/"});
        return {success: true};
    },
    new_schedule: async ({ cookies, request }) => {
        const username = cookies.get("username");
        if (!username) {
            throw error(401, { message: "Not logged in" });
        }

        const form = await request.formData();
        try {
            const result = await new_schedule(form, username);
            return { success: true, data: result };
        } catch (e) {
            if (e instanceof ValidationError || e instanceof z.ZodError) {
                throw error(400, { message: e.message });
            }
            if (e instanceof AuthorizationError) {
                throw error(403, { message: e.message });
            }
            if (e instanceof DatabaseError) {
                throw error(500, { message: "Database operation failed" });
            }
            console.error("Unexpected error:", e);
            throw error(500, { message: "An unexpected error occurred" });
        }
    },

    delete_schedule: async ({ cookies, request }) => {
        const username = cookies.get("username");
        if (!username) {
            throw error(401, { message: "Not logged in" });
        }

        const form = await request.formData();
        try {
            const result = await delete_schedule(form, username);
            return { success: true, data: result };
        } catch (e) {
            if (e instanceof ValidationError || e instanceof z.ZodError) {
                throw error(400, { message: e.message });
            }
            if (e instanceof AuthorizationError) {
                throw error(403, { message: e.message });
            }
            if (e instanceof DatabaseError) {
                throw error(500, { message: "Database operation failed" });
            }
            console.error("Unexpected error:", e);
            throw error(500, { message: "An unexpected error occurred" });
        }
    },

    update_schedule: async ({ cookies, request }) => {
        const username = cookies.get("username");
        if (!username) {
            throw error(401, { message: "Not logged in" });
        }

        const form = await request.formData();
        try {
            const result = await update_schedule(form, username);
            return { success: true, data: result };
        } catch (e) {
            console.error("error: ", e);
            if (e instanceof ValidationError || e instanceof z.ZodError) {
                throw error(400, { message: e.message });
            }
            if (e instanceof AuthorizationError) {
                throw error(403, { message: e.message });
            }
            if (e instanceof DatabaseError) {
                throw error(500, { message: `Database operation failed: ${e.message}` });
            }
            throw error(500, { message: "An unexpected error occurred" });
        }
    },

    new_task: async ({ cookies, request }) => {
        const username = cookies.get("username");
        if (!username) {
            throw error(401, { message: "Not logged in" });
        }

        const form = await request.formData();
        try {
            const result = await new_task(form, username);
            return { success: true, data: result };
        } catch (e) {
            if (e instanceof ValidationError || e instanceof z.ZodError) {
                throw error(400, { message: e.message });
            }
            if (e instanceof AuthorizationError) {
                throw error(403, { message: e.message });
            }
            if (e instanceof DatabaseError) {
                throw error(500, { message: "Database operation failed" });
            }
            console.error("Unexpected error:", e);
            throw error(500, { message: "An unexpected error occurred" });
        }
    },

    update_task: async ({ cookies, request }) => {
        const username = cookies.get("username");
        if (!username) {
            throw error(401, { message: "Not logged in" });
        }

        const form = await request.formData();
        try {
            const result = await new_task(form, username);
            return { success: true, data: result };
        } catch (e) {
            if (e instanceof ValidationError || e instanceof z.ZodError) {
                throw error(400, { message: e.message });
            }
            if (e instanceof AuthorizationError) {
                throw error(403, { message: e.message });
            }
            if (e instanceof DatabaseError) {
                throw error(500, { message: "Database operation failed" });
            }
            console.error("Unexpected error:", e);
            throw error(500, { message: "An unexpected error occurred" });
        }
    },

    delete_task: async ({ cookies, request }) => {
        const username = cookies.get("username");
        if (!username) {
            throw error(401, { message: "Not logged in" });
        }

        const form = await request.formData();
        try {
            const result = await delete_task(form, username);
            return { success: true, data: result};
        } catch (e) {
            if (e instanceof ValidationError || e instanceof z.ZodError) {
                throw error(400, { message: e.message });
            }
            if (e instanceof AuthorizationError) {
                throw error(403, { message: e.message });
            }
            if (e instanceof DatabaseError) {
                throw error(500, { message: "Database operation failed" });
            }
            console.error("Unexpected error:", e);
            throw error(500, { message: "An unexpected error occurred" });
        }
    },
} satisfies Actions;
