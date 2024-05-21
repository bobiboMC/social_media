import { writable } from 'svelte/store';

export type NotificationTypes = 'error' | 'warning' | 'success';

interface Notification {
	type: NotificationTypes;
	content: string;
	id: number;
	timeout: number;
}

function createNotificationsStore() {
	const { subscribe, update } = writable<Notification[]>([]);

	const remove = (id: number) => {
		update((ns) => ns.filter((n) => n.id != id));
	};

	function add(content: string, type: NotificationTypes = 'error', timeout = 30) {
		const id = Math.random();
		update((old) => [{ type, content, timeout, id }, ...old]);
		setTimeout(() => remove(id), timeout * 1000);
	}

	return {
		subscribe,
		remove,
		add
	};
}

export const notifications = createNotificationsStore();
