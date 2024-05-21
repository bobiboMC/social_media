<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '@components/Button.svelte';
	import Comment from '@components/Comment.svelte';
	import { notifications } from '@stores/notifications';

	export let data;
	let posts = data.posts;
</script>

<div>
	{#each posts as post, i}
		<div class="block space-y-4 mb-8 mt-8">
			<div class="inline-block space-y-4 pl-4 pt-4 rounded border-4 border-black bg-gray-500">
				<div>
					<h1 class="text-2xl">{data?.firstName} {data?.lastName}</h1>
					<h2 class="text-lg">{post?.createdAt}</h2>
				</div>
				<div class="pb-4">
					<h2 class="text-xl font-medium">{post.title}</h2>
					<p>{post.description}</p>
				</div>
			</div>
			<Comment></Comment>
		</div>
		{#if $page.data.session}
			<div class="flex space-x-4" data-index={i}>
				<a
					href={`/post/update/${i}`}
					class="text-sm text-blue-700 hover:underline dark:text-blue-500"
				>
					<Button>Update</Button>
				</a>
				<form
					class="space-y-6"
					action="?/deletePost"
					method="post"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'redirect') {
								goto(result.location);
							} else if (result.type === 'success') {
								posts = result?.data.posts;
								console.log('hereeee', result);
								update();
							} else if (result.type === 'failure') {
								notifications.add(JSON.stringify(result.data)); // TODO: Refactor to use message inside
							} else {
							}
						};
					}}
				>
					<input type="hidden" name="index" value={i} />
				</form>
			</div>
			<form />
		{/if}
	{/each}
</div>
