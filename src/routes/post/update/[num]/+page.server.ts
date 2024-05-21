import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url, params }) => {
	const session = await locals.getSession();
	const user = session?.user;
	const index = parseInt(params.num);
	console.log(index, 'index');
	const posts = await prisma.post.findMany({
		where: {
			userId: user?.id
		},
		skip: index,
		take: 1,
		orderBy: {
			createdAt: 'asc'
		},
		select: {
			id: true,
			title: true,
			description: true,
			createdAt: true
		}
	});

	const userInfo = await prisma.userInfo.findMany({
		where: {
			userId: user?.id
		}
	});
	console.log(posts, 'posts2');
	return { posts, firstName: userInfo[0]?.firstName, lastName: userInfo[0]?.lastName };
};

export const actions = {
	updatePost: async ({ locals, request, url, params }) => {
		const session = await locals.getSession();
		const user = session?.user;
		const formData = await request.formData();
		const title = formData.get('title');
		const postDescription = formData.get('postDescription');
		const index = parseInt(params.num);
		const posts = await prisma.post.findMany({
			where: {
				userId: user?.id
			},
			skip: index,
			take: 1,
			orderBy: {
				createdAt: 'asc'
			}
		});
		const postId = posts[0].id;
		await prisma.post.update({
			where: {
				userId_id: {
					userId: user?.id,
					id: postId
				}
			},
			data: {
				title: title,
				description: postDescription
			}
		});
	}
};
