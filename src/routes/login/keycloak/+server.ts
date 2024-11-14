import { redirect } from "@sveltejs/kit";
import { generateCodeVerifier, generateState } from "arctic";
import { keycloak } from "$lib/server/oauth";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
  const state = generateState();
  const code_verifier = generateCodeVerifier();
  const scopes = ["openid", "profile"];

  const url = keycloak.createAuthorizationURL(state, code_verifier, scopes);

  event.cookies.set("keycloak_oauth_state", state, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });

  event.cookies.set("keycloak_oauth_code_verifier", code_verifier, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString()
    }
  });
}

