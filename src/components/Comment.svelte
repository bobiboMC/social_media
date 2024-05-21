<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '@components/Button.svelte';
	import { notifications } from '@stores/notifications';
	let comment: string = '';
</script>

<div>
	<div class="flex space-x-4">
		<textarea
			cols="40"
			placeholder="comment..."
			class="pt-4 rounded border-4 border-black bg-gray-400 text-black"
			bind:value={comment}
		></textarea>
		<input type="hidden" name="comment" bind:value={comment} />
	</div>
	<Button>Send</Button>
</div>

<style>
	textarea::placeholder {
		color: black;
	}
</style>
