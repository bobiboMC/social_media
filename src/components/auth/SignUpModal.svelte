<script lang="ts">
	import { notifications } from '@stores/notifications';
	import { closeAllModals, openModal } from 'svelte-modals';

	import CloseModalButton from '@components/CloseModalButton.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let errors: string[] = [];
	let email: string = '';
	let password: string = '';
	let offersBonuses: boolean;
	let termsAndConditions: boolean;
	let countryName: string = '';
	let phoneNumber: string = '';
	let dialCode: string;

	function setClientErrors() {
		let validEmail = schemaEmail.safeParse({ email });
		if (!validEmail.success) {
			clientErrors.email = validEmail.error.flatten().fieldErrors.email[0];
		} else clientErrors.email = '';

		let validPassword = schemaPassword.safeParse({ password });
		if (!validPassword.success)
			clientErrors.password = validPassword.error.flatten().fieldErrors.password[0];
		else clientErrors.password = '';

		let validCountry = schemaCountry.safeParse({ country: countryName });
		if (!validCountry.success)
			clientErrors.country = validCountry.error.flatten().fieldErrors.country[0];
		else clientErrors.country = '';

		let validphone = schemaPhone.safeParse({ phone: phoneNumber });
		if (!validphone.success) clientErrors.phone = validphone.error.flatten().fieldErrors.phone[0];
		else clientErrors.phone = '';

		let validTermsAndConditions = schemaTermsAndConditions.safeParse({ termsAndConditions });
		if (!validTermsAndConditions.success)
			clientErrors.termsAndConditions =
				validTermsAndConditions.error.flatten().fieldErrors.termsAndConditions[0];
		else clientErrors.termsAndConditions = '';
		if (
			clientErrors.termsAndConditions === '' &&
			clientErrors.email === '' &&
			clientErrors.password === '' &&
			clientErrors.country === '' &&
			clientErrors.phone === ''
		)
			form.requestSubmit();
	}
	export let isOpen: boolean;
	let clientErrors = {
		email: '',
		password: '',
		country: '',
		phone: '',
		termsAndConditions: ' '
	};
	let form: HTMLFormElement;
</script>

{#if isOpen}
	<ModalLayout>
		<CloseModalButton closeModal={closeAllModals} />
		<div class="px-6 py-6 lg:px-8">
			<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Register on platform</h3>
			{#each errors as error}
				<Toast
					message={error}
					variant="danger"
					on:closeError={() => (errors = errors.filter((item) => item !== error))}
				/>
			{/each}
			<form
				novalidate
				class="space-y-6"
				action="/auth?/signup"
				method="post"
				bind:this={form}
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'redirect') {
							goto(result.location);
						} else if (result.type === 'success') {
							notifications.add(result.data.message.toString(), 'success');
							closeAllModals();
						} else if (result.type === 'failure') {
							notifications.add(result.data); // TODO: Refactor to use message inside
						} else {
							errors = [];
							for (const field in result.error.fieldErrors) {
								if (Object.prototype.hasOwnProperty.call(result.error.fieldErrors, field)) {
									errors.push(result.error.fieldErrors[field]);
								}
							}
						}
					};
				}}
			>
				{#if clientErrors.country != ''}
					<div class="text-red-600">{clientErrors.country}</div>
				{/if}

				<br /><br />
				<button on:click={setClientErrors}>Register</button>

				<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
					<div class="flex justify-center">
						<a
							on:click={openSignInModal}
							href="#reset-password"
							class="text-sm text-blue-700 hover:underline dark:text-blue-500">Log in</a
						>
					</div>
				</div>
			</form>
		</div>
	</ModalLayout>
{/if}
