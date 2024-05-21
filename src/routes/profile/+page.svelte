<script lang="ts">
	import DetailsForm from '@components/DetailsForm.svelte';
	export let data;

	let details = data.prismaDetails[0];
</script>

<div class="border rounded-lg border-gray-600 my-5 py-3 px-5">
	<DetailsForm {details} />
</div>
