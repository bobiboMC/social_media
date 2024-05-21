<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '@components/Button.svelte';
	import TitleInput from '@components/TitleInput.svelte';
	import Toast from '@components/Toast.svelte';
	import { notifications } from '@stores/notifications';
	export let data;
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
	action="?/updatePost"
	method="post"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'redirect') {
				goto(result.location);
			} else if (result.type === 'success') {
				success = true;
				error = '';
			} else if (result.type === 'failure') {
				notifications.add(JSON.stringify(result.data)); // TODO: Refactor to use message inside
			} else {
				success = false;
				error = result.error.message;
			}
		};
	}}
>
	<div>
		<title class="text-lg text-gray-500">Update Post</title>
		<TitleInput value={data?.posts[0]?.title} id="title" name="title" label="Title"></TitleInput>
		<label for="postDescription" class="block text-sm text-gray-500">Description:</label>
		<textarea cols="120" rows="10" class="border-4 border-black" name="postDescription"
			>{data?.posts[0]?.description}</textarea
		>
		<div class="flex justify-between">
			<Button>Update</Button>
		</div>
	</div>
</form>
