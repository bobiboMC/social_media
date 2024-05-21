import { fail } from '@sveltejs/kit';

export const actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const { data, error: supabaseError } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				emailRedirectTo: '/auth/callback'
			}
		});
		console.log(supabaseError);
		if (supabaseError) {
			if (supabaseError?.message === 'User already registered') {
				return fail(500, 'User already registered');
			} else if (supabaseError?.message === 'Password should be at least 6 characters') {
				return fail(500, 'Password should be at least 6 characters');
			}
			return fail(500, 'Server error. Try again later.');
		}

		if (!data.user) {
			throw fail(500, { message: 'No error and no user' });
		}

		return {
			message: 'Please check your email for a magic link to log into the website.',
			success: true
		};
	}
};
