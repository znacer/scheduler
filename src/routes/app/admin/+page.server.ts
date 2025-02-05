import { error, type Actions } from "@sveltejs/kit";
import { z } from "zod";
import { 
  add_user, 
  admin_user, 
  kick_user, 
  new_group, 
  unadmin_user,
  DatabaseError,
  AuthorizationError,
  ValidationError 
} from "$lib/server/db/utils";

export const actions = {
    new_group: async ({ cookies, request }) => {
        const username = cookies.get("username");
        if (!username) {
            throw error(401, "Not logged in");
        }
        
        const form = await request.formData();
        try {
            const result = await new_group(form, username);
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
            // Unknown error
            console.error("Unexpected error:", e);
            throw error(500, { message: "An unexpected error occurred" });
        }
    },

    kick_user: async ({ cookies, request }) => {
        const username = cookies.get("username");
        if (!username) {
            throw error(401, { message: "Not logged in" });
        }

        const form = await request.formData();
        try {
            const result = await kick_user(form, username);
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

    add_user: async ({ cookies, request }) => {
        const username = cookies.get("username");
        if (!username) {
            throw error(401, { message: "Not logged in" });
        }

        const form = await request.formData();
        try {
            const result = await add_user(form, username);
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

    admin_user: async ({ cookies, request }) => {
        const username = cookies.get("username");
        if (!username) {
            throw error(401, { message: "Not logged in" });
        }

        const form = await request.formData();
        try {
            const result = await admin_user(form, username);
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

    unadmin_user: async ({ cookies, request }) => {
        const username = cookies.get("username");
        if (!username) {
            throw error(401, { message: "Not logged in" });
        }

        const form = await request.formData();
        try {
            const result = await unadmin_user(form, username);
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
} satisfies Actions;
