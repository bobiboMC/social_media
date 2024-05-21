import { prisma } from '$lib/server/prisma';

export async function DELETE({ locals, url, cookies, result }) {
	const session = await locals.getSession();
	const user = session?.user;
	console.log(url, 'params.commentId');
	const commentId = url.searchParams.get('commentId');
	// Find the comment to delete
	const comment = await prisma.comment.findUnique({
		where: {
			id: commentId
		},
		select: {
			id: true,
			postId: true,
			user: {
				select: {
					id: true
				}
			}
		}
	});

	if (!comment) {
		throw new Error('Comment not found.');
	}

	// Check if the current user is the owner of the comment
	if (comment.user.id !== session.user.id) {
		throw new Error('Unauthorized: You are not the owner of this comment.');
	}

	// Delete the comment
	await prisma.comment.delete({
		where: {
			id: comment.id
		}
	});

	// Fetch the updated list of posts with comments
	const posts = await prisma.post.findMany({
		select: {
			id: true,
			createdAt: true,
			title: true,
			description: true,
			user: {
				select: {
					UserInfo: {
						select: {
							firstName: true,
							lastName: true
						}
					}
				}
			},
			Comment: {
				select: {
					id: true,
					text: true,
					user: {
						select: {
							UserInfo: {
								select: {
									firstName: true,
									lastName: true
								}
							}
						}
					}
				}
			}
		}
	});

	return new Response(JSON.stringify({ posts }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
