<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '@components/Button.svelte';
	import { notifications } from '@stores/notifications';
</script>

<div>
	<div class="block space-y-4 mb-8 mt-8">
		<textarea class="inline-block space-y-4 pl-4 pt-4 rounded border-4 border-black bg-gray-500">
		</textarea>
	</div>
</div>
