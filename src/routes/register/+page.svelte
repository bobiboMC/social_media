<script lang="ts">
	import { notifications } from '@stores/notifications';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import CountryInput from '@components/CountryInput.svelte';
	import { countries } from '@src/countries.json';
	import EmailInput from '@components/EmailInput.svelte';
	import LastNameInput from '@components/LastNameInput.svelte';
	import FirstNameInput from '@components/FirstNameInput.svelte';
	import Button from '@components/Button.svelte';
	import Toast from '@components/Toast.svelte';
	import InputLabel from '@components/InputLabel.svelte';

	let errors: string[] = [];
	let firstName: string = '';
	let lastName: string = '';
	let email: string = '';
	let password: string = '';
	let countryName: string = '';
	let error: string | undefined;
	let success = false;

	let form: HTMLFormElement;
</script>

<div class="px-6 py-6 lg:px-8">
	{#if error}
		<Toast message={error} variant="danger" on:closeError={() => (error = undefined)} />
	{/if}
	{#if success}
		<Toast
			message="Check for confirmation email"
			variant="success"
			on:closeError={() => (success = false)}
		/>
	{/if}
	<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Register on platform</h3>
	<form
		novalidate
		class="space-y-6"
		action="/auth?/signup"
		method="post"
		bind:this={form}
		use:enhance={() => {
			return async ({ result }) => {
				console.log('wft');
				if (result.type === 'redirect') {
					goto(result.location);
				} else if (result.type === 'success') {
					console.log('bogo');
					success = true;
					error = '';
					notifications.add(result.data.message.toString(), 'success');
				} else if (result.type === 'failure') {
					console.log('wft2', result.data);
					notifications.add(result.data); // TODO: Refactor to use message inside
				} else {
					success = false;
					error = result.error.message;
				}
			};
		}}
	>
		<LastNameInput label="First name" bind:value={firstName}></LastNameInput>
		<FirstNameInput label="Last name" bind:value={lastName}></FirstNameInput>
		<EmailInput label="Email" id="email" name="email" bind:value={email} />
		<InputLabel
			bind:value={password}
			id="password"
			name="password"
			type="password"
			label="Your password"
			placeholder="••••••••"
		/>
		<CountryInput
			id="country"
			name="country"
			label="Country"
			items={countries.map((v) => ({
				value: v.name,
				label: v.name
			}))}
			bind:value={countryName}
		/>

		<br /><br />

		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			<div class="flex flex-col items-center space-y-4">
				<Button>Register</Button>
				<a href="/login" class="text-sm text-blue-700 hover:underline dark:text-blue-500"
					>Are you already registered?</a
				>
			</div>
		</div>
	</form>
</div>
