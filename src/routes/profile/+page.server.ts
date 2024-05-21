import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw redirect(303, '/');
	}
	const prismaDetails = await prisma.userInfo.findMany({
		where: {
			userId: session.user.id
		}
	});

	return { prismaDetails };
};

export const actions = {
	setDetails: async ({ locals, request }) => {
		const session = await locals.getSession();
		if (!session) {
			return fail(401, { id: 'setDetails' });
		}
		const formData = await request.formData();
		const firstName = formData.get('firstName');
		const lastName = formData.get('lastName');
		const gender = formData.get('gender');
		const biography = formData.get('biography');
		await prisma.userInfo.updateMany({
			where: {
				userId: session.user.id
			},
			data: {
				firstName: firstName,
				lastName: lastName,
				gender: gender,
				biography: biography
			}
		});
	}
};
