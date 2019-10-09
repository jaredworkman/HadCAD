<template>
	<v-dialog max-width='600px' transition='dialog-transition' v-model='dialog'>
		<v-btn small flat slot='activator' class='tertiary--text'>
			<v-icon>add</v-icon>
			<span>Member</span>
		</v-btn>
		<v-card>
			<v-card-title>
				<h2 class='font-weight-light'>Add Group Member</h2>
			</v-card-title>
			<v-card-text>
				<v-form class='px-3' ref='form'>
					<v-text-field label='Name' v-model='name' prepend-icon='person'></v-text-field>
					<v-text-field label='Email' v-model='email' prepend-icon='email'></v-text-field>
          <v-text-field label='Role' v-model='role' prepend-icon='build'></v-text-field>
					<v-spacer></v-spacer>
					<v-btn
						flat outline 
						class='primary mx-0 mt-3 primary--text' 
						@click='submit'
						:loading='loading'
					>Submit</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
  data() {
		return {
			title: '',
			description: '',
			deadline: null,
			client: '',
			inputRules: [
				v => v.length >= 3 || 'Minimum length is 3 characters'
			],
			dialog: false,
			loading: false
		}
	},
	methods: {
		submit() {
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
				this.dialog = false;
				this.$emit('memberAdded');
			}, 1000)
		}
	}
}
</script>
