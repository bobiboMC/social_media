<script lang="ts">
	export let placeholder = '';
	export let required = true;
	export let disabled = false;
	export let readonly = false;
	export let value: string;
	export let type: string;
	export let pattern: string | undefined = undefined;
	export let title: string | undefined = undefined;
	export let id: string;
	export let name: string;
	export let step = '';
	export let cls = 'rounded-lg';

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<input
	bind:value
	on:blur
	on:change
	on:input
	use:typeAction
	on:click|preventDefault
	{placeholder}
	{required}
	{disabled}
	{readonly}
	{id}
	{step}
	{pattern}
	{title}
	{name}
	class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white rounded-lg {cls}"
/>
