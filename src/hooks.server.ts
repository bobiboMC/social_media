import type { Handle, HandleServerError } from '@sveltejs/kit';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { prisma } from '$lib/server/prisma';
import { getSessionId } from '$lib/server/session';
import { getStatus } from '$lib/server/userSessions.service';
export const handle: Handle = async function ({ event, resolve }) {
	//console.log('enter handle');
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});
	//console.log('enter2 handle');
	//console.log(event.locals.supabase, 'event.locals.supabase');
	event.locals.getSession = async () => {
		console.log('start getSession');
		const {
			data: { session: supabaseSession }
		} = await event.locals.supabase.auth.getSession();
		//console.log(supabaseSession);
		if (!supabaseSession) {
			return null;
		}
		const sessionId = getSessionId(supabaseSession);
		//console.log('sessionId handle', sessionId);
		//console.log('sessionId handle');
		if (sessionId) {
			//console.log(sessionId, 'sessionId');
			const session = await getStatus(prisma, sessionId);
			//console.log('session handle', session);
			if (session && session.closedAt === null) {
				return supabaseSession;
			}
		}
		//console.log('enter3 handle');
		return null;
	};
	/*event.locals.getSession = async () => {
		//console.log(event.locals.supabase.auth.getUser(), 'event.locals.supabase.auth.getUser()');
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		console.log(session, 'data');
		return session;
	};*/
	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};

export const handleError: HandleServerError = ({ error }) => {
	// example integration with https://sentry.io/
	// Sentry.captureException(error, { event });

	console.error(error);

	return {
		message: 'Unexpected Error',
		code: (error as { code?: string | undefined })?.code ?? 'UNKNOWN'
	};
};
