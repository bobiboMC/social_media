import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	createPost: async ({ locals, request }) => {
		const session = await locals.getSession();
		if (!session) {
			return fail(401, { id: 'setDetails' });
		}
		const formData = await request.formData();
		const title = formData.get('title');
		const postDescription = formData.get('postDescription');
		await prisma.post.create({
			data: {
				title: title,
				description: postDescription,
				user: {
					connect: {
						id: session.user.id // Assuming `session.user.id` contains the userId
					}
				}
			}
		});
	}
};
