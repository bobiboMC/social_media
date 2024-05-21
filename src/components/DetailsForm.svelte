<script lang="ts">
	import FloatingLabelInput from '@components/FloatingLabelInput.svelte';
	import FloatingLabelSelected from '@components/FloatingLabelSelected.svelte';
	import Button from '@components/Button.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { notifications } from '@stores/notifications';

	import { page } from '$app/stores';
	import { countries } from '@src/countries.json';
	import Toast from './Toast.svelte';

	export let details;
	console.log(details, 'details2');
	let error: string | undefined;
	let success = false;
</script>

{#if error}
	<Toast message={error} variant="danger" on:closeError={() => (error = undefined)} />
{/if}
{#if success}
	<Toast
		message="Successfully updated info"
		variant="success"
		on:closeError={() => (success = false)}
	/>
{/if}
<form
	class="space-y-6"
	action="/profile?/setDetails"
	method="post"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'redirect') {
				goto(result.location);
			} else if (result.type === 'success') {
				success = true;
				error = '';
			} else if (result.type === 'failure') {
				notifications.add(JSON.stringify(result.data));
			} else {
				success = false;
				error = result.error.message;
			}
		};
	}}
>
	<div class="grid md:grid-cols-2 md:gap-6">
		<div class="relative z-0 w-full mb-6 group">
			<FloatingLabelInput
				label="First Name"
				type="text"
				id="firstName"
				value={details?.firstName ?? ''}
				pattern="[A-Za-z ]+"
				title="You must only put letters or spaces"
			/>
		</div>
		<div class="relative z-0 w-full mb-6 group">
			<FloatingLabelInput
				label="Last Name"
				type="text"
				id="lastName"
				value={details?.lastName ?? ''}
				pattern="[A-Za-z ]+"
				title="You must only put letters or spaces"
			/>
		</div>
	</div>

	<div class="grid md:grid-cols-2 md:gap-6">
		<div class="relative z-0 w-full mb-6 group">
			<FloatingLabelSelected
				label="Gender"
				id="gender"
				values={['male', 'female']}
				value={details?.gender ?? ''}
			/>
		</div>
	</div>
	<div class="">
		<label for="biography" class="block text-sm text-gray-500">About Me:</label>
		<textarea
			cols="60"
			rows="4"
			class="border-4"
			id="biography"
			name="biography"
			value={details?.lastName ?? ''}
		/>
	</div>

	<div class="flex justify-between">
		<Button>Submit</Button>
	</div>
</form>
