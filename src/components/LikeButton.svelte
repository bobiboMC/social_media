<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '@components/Button.svelte';
	import { notifications } from '@stores/notifications';
	export let active = false;
</script>

<div>
	<div class="block space-y-4">
		{#if !active}
			<button class="bg-gray-400 px-4 pt-2 pb-2 rounded">Like</button>
		{:else}
			<button class="bg-blue-400 px-4 pt-2 pb-2 rounded">Like</button>
		{/if}
	</div>
</div>
