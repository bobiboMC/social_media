<script lang="ts">
	import InputLabel from './InputLabel.svelte';

	export let value: string;
	export let label: string;
	export let id: string;
	export let name: string;
</script>

<InputLabel {label} {id} {name} type="email" placeholder="name@company.com" bind:value />
