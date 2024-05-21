<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '@components/Button.svelte';
	import Comment from '@components/Comment.svelte';
	import LikeButton from '@components/LikeButton.svelte';
	import SearchInput from '@components/SearchInput.svelte';
	import { notifications } from '@stores/notifications';

	export let data;
	let posts = data.posts;
	let search: string = '';
	//let likePost:string=data.likedPost
</script>

<div>
	<form
		class="space-y-6"
		action="?/searchPostTitle"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'redirect') {
					goto(result.location);
				} else if (result.type === 'success') {
					console.log('comment', result?.data.posts.comment);
					posts = result?.data.posts;
					//comments = result?.data.posts.comment;
					console.log('hereeee', result);
					update();
				} else if (result.type === 'failure') {
					notifications.add(JSON.stringify(result.data)); // TODO: Refactor to use message inside
				} else {
				}
			};
		}}
	>
		<SearchInput bind:value={search} name="Search for post title..">
			<svg
				aria-hidden="true"
				class="w-5 h-5 text-gray-500 dark:text-gray-400"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
					clip-rule="evenodd"
				/></svg
			>
		</SearchInput>
		<input name="searchPostTitle" type="hidden" value={search} />
	</form>
	{#each posts as post, i}
		<div class="block space-y-4 mb-8 mt-8">
			<div class="inline-block space-y-4 pl-4 pt-4 rounded border-4 border-black bg-gray-500">
				<div>
					<h1 class="text-2xl">
						{post?.user?.UserInfo[0]?.firstName}
						{post?.user?.UserInfo[0]?.lastName}
					</h1>
					<h2 class="text-lg">{post?.createdAt}</h2>
				</div>
				<div class="pb-4">
					<h2 class="text-xl font-medium">{post.title}</h2>
					<p>{post.description}</p>
				</div>
			</div>
			<form
				class="space-y-6"
				action="?/changeLikePost"
				method="post"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'redirect') {
							goto(result.location);
						} else if (result.type === 'success') {
							console.log('comment', result?.data.posts.comment);
							posts = result?.data.posts;
							//comments = result?.data.posts.comment;
							console.log('hereeee', result);
							update();
						} else if (result.type === 'failure') {
							notifications.add(JSON.stringify(result.data)); // TODO: Refactor to use message inside
						} else {
						}
					};
				}}
			>
				{#if post?.Like?.some((like) => like?.user?.id === $page?.data?.session?.user?.id && like?.post?.id === post?.id)}
					<LikeButton active={true}></LikeButton>
				{:else}
					<LikeButton></LikeButton>
				{/if}
				<input type="hidden" name="postId" value={post?.id} />
			</form>
			<form
				class="space-y-6"
				action="?/addComment"
				method="post"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'redirect') {
							goto(result.location);
						} else if (result.type === 'success') {
							console.log('comment', result?.data.posts.comment);
							posts = result?.data.posts;
							//comments = result?.data.posts.comment;
							console.log('hereeee', result);
							update();
						} else if (result.type === 'failure') {
							notifications.add(JSON.stringify(result.data)); // TODO: Refactor to use message inside
						} else {
						}
					};
				}}
			>
				{#each post.Comment as comment, i}
					<div class="block mb-9 mt-9">
						<div class="inline bg-gray-200 rounded p-4">
							<span class="font-medium"
								>{comment?.user?.UserInfo[0]?.firstName}
								{comment?.user?.UserInfo[0]?.lastName}:</span
							>
							{comment.text}
						</div>

						{#if comment?.user?.id === $page?.data?.session?.user?.id}
							<Button
								sumbit={false}
								on:click={async (e) => {
									const res = await fetch(`/?commentId=${comment?.id}`, {
										method: 'DELETE'
									});
									const postsPromise = await res.json();
									posts = postsPromise?.posts;
									console.log(posts, 'temp');
								}}>Delete</Button
							>
						{/if}
					</div>
				{/each}
				<Comment></Comment>
				<input type="hidden" name="postId" value={post?.id} />
			</form>
		</div>
	{/each}
</div>
