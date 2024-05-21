<script lang="ts">
	import Input from './Input.svelte';

	export let label: string;
	export let placeholder = '';
	export let required = true;
	export let disabled = false;
	export let readonly = false;
	export let value: string;
	export let type = 'text';
	export let pattern: string | undefined = undefined;
	export let title: string | undefined = undefined;
	export let id: string;
	export let name: string;
	export let cls = '';
</script>

<label for={id} class="block text-sm font-medium text-gray-900 dark:text-white">
	{label}
	{#if required}
		<span class="ml-0.5 text-red-500">*</span>
	{/if}
</label>
<Input
	bind:value
	on:click
	{type}
	{placeholder}
	{required}
	{id}
	{name}
	{cls}
	{disabled}
	{pattern}
	{title}
	{readonly}
/>
