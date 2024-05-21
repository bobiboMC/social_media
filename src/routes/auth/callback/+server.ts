import { error as errorResp, redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals }) => {
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/';
	if (!code || !next) {
		throw errorResp(400, '');
	}
	await locals.supabase.auth.exchangeCodeForSession(code);
	throw redirect(301, next);
};
