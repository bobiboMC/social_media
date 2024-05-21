<script lang="ts">
	export let cls = 'rounded-lg';
	export let required = true;
	export let id: string;
	export let name: string;
	export let value: string;
	export let items: Array<{ label: string; value: string }>;
</script>

<select
	bind:value
	on:change
	{required}
	{id}
	{name}
	class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-4 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 {cls}"
>
	<option disabled selected value class="hidden"> -- select an option -- </option>
	{#each items as item}
		<option value={item.value}>{item.label}</option>
	{/each}
</select>
