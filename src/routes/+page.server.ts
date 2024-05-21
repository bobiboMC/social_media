import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSessionId } from '$lib/server/session';
import { createSession, disableSession } from '$lib/server/userSessions.service';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const user = session?.user;
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
							id: true,
							UserInfo: {
								select: {
									firstName: true,
									lastName: true
								}
							}
						}
					}
				}
			},
			Like: {
				select: {
					id: true,
					createdAt: true,
					user: {
						select: {
							id: true
						}
					},
					post: {
						select: {
							id: true
						}
					}
				}
			}
		}
	});

	/*const userInfo = await prisma.userInfo.findMany({
		where: {
			userId: user?.id
		}
	});*/
	/*const posts = await prisma.post.findMany({
		include: {
			Comment: true
		}
	});*/

	return { posts };
};

export const actions = {
	signIn: async ({ locals, request, getClientAddress, cookies }) => {
		const session = await locals.getSession();
		if (session) {
			return {};
		}
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		if (typeof email !== 'string' || typeof password !== 'string') {
			return fail(400, { message: 'Invalid input' });
		}
		const { data, error } = await locals.supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			return fail(400, { msg: error.message });
		}

		const userAgent = request.headers.get('User-Agent') ?? undefined;
		// TODO: implemenent counntry and device checking
		const {
			data: { session: supabaseSession }
		} = await locals.supabase.auth.getSession();
		console.log(supabaseSession, 'data');
		await prisma.userSession.create({
			data: {
				id: supabaseSession?.user?.session_id,
				userId: data.user.id
			}
		});
		return { success: true };
	},
	signOut: async ({ locals }) => {
		const session = await locals.getSession();
		if (!session) {
			return {};
		}
		const { error: signOutError } = await locals.supabase.auth.signOut({ scope: 'local' });
		if (signOutError) {
			return fail(500, { message: signOutError.message });
		}
		const sessionId = getSessionId(session);
		if (!sessionId) {
			throw error(500, { message: 'Unknwon error' });
		}
		try {
			await disableSession(prisma, sessionId);
		} catch (err) {
			console.log('ERROR SERVER');
			throw error(500, { message: 'Internal error' });
		}
		return { success: true };
	},
	addComment: async ({ locals, request, url }) => {
		const session = await locals.getSession();
		const user = session?.user;
		const formData = await request.formData();
		const text = formData.get('comment');
		const postId = parseInt(formData.get('postId'));
		// Add a new comment to the post
		await prisma.comment.create({
			data: {
				text: text,
				user: {
					connect: {
						id: session.user.id // Assuming `session.user.id` contains the userId
					}
				},
				post: {
					connect: {
						id: postId // Assuming `session.user.id` contains the userId
					}
				}
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
								id: true,
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

		return { posts: posts };
	},
	changeLikePost: async ({ locals, request, url }) => {
		const session = await locals.getSession();
		const user = session?.user;
		const formData = await request.formData();
		const postId = parseInt(formData.get('postId'));

		// Fetch the updated list of posts with comments
		const likedPost = await prisma.like.findMany({
			where: {
				user: {
					id: user?.id
				},
				post: {
					id: postId
				}
			}
		});
		if (likedPost.length == 0) {
			// Add a new comment to the post
			const likedPost = await prisma.like.create({
				data: {
					user: {
						connect: {
							id: session.user.id // Assuming `session.user.id` contains the userId
						}
					},
					post: {
						connect: {
							id: postId // Assuming `session.user.id` contains the userId
						}
					}
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
									id: true,
									UserInfo: {
										select: {
											firstName: true,
											lastName: true
										}
									}
								}
							}
						}
					},
					Like: {
						select: {
							id: true,
							createdAt: true,
							user: {
								select: {
									id: true
								}
							},
							post: {
								select: {
									id: true
								}
							}
						}
					}
				}
			});

			return { posts: posts };
		} else {
			const deletedLike = await prisma.like.delete({
				where: {
					id: likedPost[0]?.id
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
									id: true,
									UserInfo: {
										select: {
											firstName: true,
											lastName: true
										}
									}
								}
							}
						}
					},
					Like: {
						select: {
							id: true,
							createdAt: true,
							user: {
								select: {
									id: true
								}
							},
							post: {
								select: {
									id: true
								}
							}
						}
					}
				}
			});
			return { posts: posts };
		}
	},
	searchPostTitle: async ({ locals, request, url }) => {
		const session = await locals.getSession();
		const user = session?.user;
		const formData = await request.formData();
		const searchedPostTitle = formData.get('searchPostTitle');
		console.log('searchPostTitle', searchedPostTitle);
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
								id: true,
								UserInfo: {
									select: {
										firstName: true,
										lastName: true
									}
								}
							}
						}
					}
				},
				Like: {
					select: {
						id: true,
						createdAt: true,
						user: {
							select: {
								id: true
							}
						},
						post: {
							select: {
								id: true
							}
						}
					}
				}
			},
			where: {
				title: {
					startsWith: searchedPostTitle,
					mode: 'insensitive'
				}
			}
		});
		return { posts: posts };
	}
};
