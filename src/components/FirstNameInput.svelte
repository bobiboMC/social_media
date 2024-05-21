<script lang="ts">
	import InputLabel from './InputLabel.svelte';
	export let value: string;
	export let id: string;
	export let name: string;
	export let label: string;
	export let pattern: string;
	export let title: string;
</script>

<InputLabel {label} {id} {name} type="text" placeholder="John" bind:value {pattern} {title} />
