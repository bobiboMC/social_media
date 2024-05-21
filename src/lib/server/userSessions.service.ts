import type { Prisma, PrismaClient } from '../../../prisma';

export const getUserSessions = (p: PrismaClient, userId: string) =>
	p.userSession.findMany({
		where: {
			userId
		},
		orderBy: [{ closedAt: { sort: 'desc', nulls: 'first' } }, { createdAt: 'desc' }]
	});

export const getStatus = (p: PrismaClient, id: string) =>
	p.userSession.findUnique({
		where: {
			id
		},
		select: {
			closedAt: true
		}
	});

export const disableOtherSessions = (p: PrismaClient, id: string, userId: string) =>
	p.userSession.updateMany({
		where: {
			userId,
			NOT: {
				id
			},
			closedAt: null
		},
		data: {
			closedAt: new Date()
		}
	});

export const createSession = (p: PrismaClient, data: Prisma.UserSessionUncheckedCreateInput) =>
	p.userSession.create({
		data
	});

export const disableSession = (p: PrismaClient, id: string) =>
	p.userSession.update({
		where: {
			id
		},
		data: {
			closedAt: new Date()
		}
	});
