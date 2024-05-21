<script lang="ts">
	import SelectLabel from './SelectLabel.svelte';
	export let items: { value: string; label: string }[];
	export let value: string;
	export let id: string;
	export let name: string;
	export let label: string;
</script>

<SelectLabel {id} {name} {label} required={true} {items} bind:value />
