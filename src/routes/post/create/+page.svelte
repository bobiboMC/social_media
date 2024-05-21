<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '@components/Button.svelte';
	import TitleInput from '@components/TitleInput.svelte';
	import { notifications } from '@stores/notifications';
</script>

<form
	class="space-y-6"
	action="?/createPost"
	method="post"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'redirect') {
				goto(result.location);
			} else if (result.type === 'success') {
			} else if (result.type === 'failure') {
				notifications.add(JSON.stringify(result.data)); // TODO: Refactor to use message inside
			} else {
			}
		};
	}}
>
	<div>
		<title class="text-lg text-gray-500">Create Post</title>
		<TitleInput value="" id="title" name="title" label="Title"></TitleInput>
		<label for="postDescription" class="block text-sm text-gray-500">Description:</label>
		<textarea cols="120" rows="10" class="border-4 border-black" name="postDescription"></textarea>
		<div class="flex justify-between">
			<Button>Submit</Button>
		</div>
	</div>
</form>
