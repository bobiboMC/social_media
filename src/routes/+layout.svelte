<script lang="ts">
	import '../app.css';
	import Nav from '../components/Nav.svelte';

	export let data;

	let isNavOpen = false;
	function openNav() {
		isNavOpen = true;
	}

	function closeNav() {
		isNavOpen = false;
	}

	//let { supabase, session } = data;
	//$: ({ supabase, session } = data);

	/*onMount(() => {
		const { data: d } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => d.subscription.unsubscribe();
	});*/
</script>

<nav class="bg-white">
	<Nav />
	<slot name="sideNav" />
</nav>
<main class="min-h-screen ml-[3.33%]">
	<slot />
</main>

<style>
</style>
