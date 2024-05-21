<script lang="ts">
	import InputLabel from './InputLabel.svelte';
	export let value: string;
	export let id: string;
	export let name: string;
	export let label: string;
</script>

<InputLabel {label} {id} {name} type="text" placeholder="Your Title" bind:value />
