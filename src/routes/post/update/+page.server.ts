import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const actions = {
	updatePost: async ({ locals, request, url }) => {
		const session = await locals.getSession();
		const formData = await request.formData();
		const title = formData.get('title');
		const postDescription = formData.get('postDescription');
		const post = await prisma.post.findMany({
			where: {
				userId: session?.user?.id
			}
		});

		await prisma.post.update({
			where: {
				userId: session?.user?.id
			},
			data: {
				title: title,
				description: postDescription
			}
		});
	}
};
