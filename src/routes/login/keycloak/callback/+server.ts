import { generateSessionToken, createSession, setSessionTokenCookie } from "$lib/server/session";
import { keycloak } from "$lib/server/oauth";
import { parseJWT } from "@oslojs/jwt";
import type { RequestEvent } from "@sveltejs/kit";
import type { OAuth2Tokens } from "arctic";
import { createUser, getUserFromkeycloakId } from "$lib/server/user";

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get("code");
	const state = event.url.searchParams.get("state");
	const codeVerifier = event.cookies.get("keycloak_oauth_code_verifier");
	const storedState = event.cookies.get("keycloak_oauth_state") ?? null;
	if (code === null || codeVerifier === null || codeVerifier === undefined || state === null || storedState === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await keycloak.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const [_, payload, __] = parseJWT(tokens.idToken());
	const keycloakUserId = payload.sub;
	const keycloakUsername = payload.preferred_username;

	const existingUser = await getUserFromkeycloakId(keycloakUserId);

	if (existingUser) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/app"
			}
		});
	}

	const user = await createUser(keycloakUserId, keycloakUsername);

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return new Response(null, {
		status: 302,
		headers: {
			Location: "/"
		}
	});
}
