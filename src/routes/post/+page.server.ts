import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const user = session?.user;
	const posts = await prisma.post.findMany({
		where: {
			userId: user?.id
		}
	});

	const userInfo = await prisma.userInfo.findMany({
		where: {
			userId: user?.id
		}
	});
	return { posts, firstName: userInfo[0]?.firstName, lastName: userInfo[0]?.lastName };
};

export const actions = {
	deletePost: async ({ locals, request, url }) => {
		const session = await locals.getSession();
		const user = session?.user;
		const formData = await request.formData();
		const index = parseInt(formData.get('index'));
		const post = await prisma.post.findMany({
			where: {
				userId: session?.user?.id
			},
			skip: index,
			take: 1
		});
		const postId = post[0].id;
		const deleteUser = await prisma.post.delete({
			where: {
				userId_id: {
					userId: user?.id,
					id: postId
				}
			}
		});
		// Fetch the updated list of posts
		const posts = await prisma.post.findMany({
			where: {
				userId: user?.id
			}
		});

		return { posts: posts };
	}
};
