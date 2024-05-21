<script lang="ts">
	export let label: string
	export let required = true

	export let value: string
	export let type: string
	export let id: string
	export let readonly = false
	export let pattern: string | undefined = undefined
	export let title: string | undefined = undefined

	function typeAction(node: HTMLInputElement) {
		node.type = type
	}
</script>

<div class="relative z-0 w-full mb-6 group">
	<input
		bind:value
		{readonly}
		use:typeAction
		{required}
		{id}
		name={id}
		placeholder=" "
		{pattern}
		{title}
		class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
	/>
	<label
		for={id}
		class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
		>{label}</label
	>
</div>
