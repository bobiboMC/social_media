import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ locals }) => {
	try {
		//console.log('locals', locals);
		const session = await locals.getSession();
		//console.log(session, 'session');
		const user = session?.user;
		// initial data for various stores so that even with ssr stores have their value
		const initialData = {
			balance: 'hi'
		};

		return {
			initialData,
			session: await locals.getSession(),
			config: {}
		};
	} catch (err) {
		console.error(err);
		// Can't throw because it renders a static error page instead of error.svelte
		// throw error(500, { message: (err as Error)?.message })
		return {};
	}
};
