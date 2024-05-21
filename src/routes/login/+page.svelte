<script lang="ts">
	import { notifications } from '@stores/notifications';

	import Button from '@components/Button.svelte';
	import InputLabel from '@components/InputLabel.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let error: string;

	interface FormElements extends HTMLFormControlsCollection {
		email: HTMLInputElement;
		password: HTMLInputElement;
	}

	let inProgress = false;

	const onSubmit = async (ev: SubmitEvent) => {
		const target = ev.target as HTMLFormElement;
		const { email, password } = target.elements as FormElements;
		inProgress = true;
		const { error } = await $page.data.supabase.auth.signInWithPassword({
			email: email.value,
			password: password.value
		});
		inProgress = false;
		if (error) {
			notifications.add(error.message);
			console.error(error);
			return;
		}
	};

	export let isOpen: boolean;
</script>

<div class="px-6 py-6 lg:px-8">
	<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
	<form
		class="space-y-6"
		method="POST"
		action="/?/signIn"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success') {
					console.log('login success');
					await goto('/');
					update();
				}
			};
		}}
	>
		<InputLabel
			value=""
			id="email"
			name="email"
			type="text"
			label="Your email"
			placeholder="name@company.com"
		/>
		<InputLabel
			value=""
			id="password"
			name="password"
			type="password"
			label="Your password"
			placeholder="••••••••"
		/>
		<Button disabled={inProgress}>Login to your account</Button>

		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			<div class="flex justify-between">
				<a href="#register" class="text-blue-700 hover:underline dark:text-blue-500"
					>Create account</a
				>
			</div>
		</div>
	</form>
</div>
