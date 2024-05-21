<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	let showMenu = false;
	const toggleMenu = () => (showMenu = !showMenu);
</script>

<div class="h-16 flex items-center shadow-lg bg-gray-900 dark:bg-gray-800 dark:shadow-gray-900/70">
	<nav class="mr-2 w-full flex justify-end">
		<div>
			<div class="relative flex justify-end items-center space-x-3">
				{#if $page.data.session}
					{#if !($page.url.pathname == '/')}
						<div id="backHome" class="flex justify-end">
							<a href="/" class="text-white p-1 bg-blue-500 rounded-lg">Back to Home</a>
						</div>
					{/if}
					<button class="w-8 h-8">
						<span class="rounded-full mr-3">
							<a href="/post/create">
								<svg
									version="1.1"
									id="Capa_1"
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									viewBox="0 0 50 50"
									xml:space="preserve"
								>
									<circle style="fill:#43B05C;" cx="25" cy="25" r="25" />
									<line
										style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"
										x1="25"
										y1="13"
										x2="25"
										y2="38"
									/>
									<line
										style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"
										x1="37.5"
										y1="25"
										x2="12.5"
										y2="25"
									/>
								</svg>
							</a>
						</span>
					</button>
					<button
						on:click={toggleMenu}
						type="button"
						class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
						aria-expanded="false"
						data-dropdown-toggle="dropdown-user"
					>
						<span class="sr-only">Open user menu</span>
						<span class="w-8 h-8 rounded-full">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
								<path
									fill-rule="evenodd"
									d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</span>
					</button>
					{#if showMenu}
						<div class="absolute z-50 -left-15 top-6">
							<div
								class="my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
								id="dropdown-user"
							>
								<div class="px-4" role="none">
									<!-- <p class="text-sm text-gray-900 dark:text-white" role="none">
											{$page.data.userSession.name}
										</p> -->
									<p
										class="py-3 text-sm font-medium text-gray-900 truncate dark:text-gray-300"
										role="none"
									>
										{$page.data.session.user.email || 'no email'}
									</p>
								</div>
								<ul class="py-1" role="none">
									<li>
										<a
											on:click={() => (showMenu = false)}
											href="/profile"
											class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem">Profile</a
										>
									</li>
									<li>
										<a
											on:click={() => (showMenu = false)}
											href="/post"
											class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem">My Posts</a
										>
									</li>
									<li>
										<a
											on:click={() => (showMenu = false)}
											href="/settings/appearance"
											class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem">Settings</a
										>
									</li>
									<li
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										<form
											action="/?/signOut"
											method="POST"
											use:enhance
											on:submit={() => (showMenu = false)}
										>
											<button type="submit" class="w-full flex justify-start" role="menuitem"
												>Sign Out</button
											>
										</form>
									</li>
								</ul>
							</div>
						</div>
					{/if}
				{:else}
					<div class="flex gap-4">
						<a
							href="/login"
							class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
							>Login</a
						>

						<a
							href="/register"
							class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
							>Register</a
						>
					</div>
				{/if}
			</div>
		</div>
	</nav>
</div>
