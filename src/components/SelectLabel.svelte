<script lang="ts">
	import Select from './Select.svelte';

	export let label: string;
	export let error = false;
	export let required = true;
	export let id: string;
	export let name: string;
	export let value: string;
	export let items: Array<{ label: string; value: string }>;
</script>

<div>
	<label for={id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>{label}<span class="text-red-500">&nbsp;&nbsp;*</span></label
	>

	<Select bind:value {required} {id} {name} {items} />
	{error ? 'Error' : ''}
</div>
