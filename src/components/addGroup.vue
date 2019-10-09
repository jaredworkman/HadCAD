<template>
	<v-dialog max-width='600px' transition='dialog-transition' v-model='dialog' lazy>
		<v-btn small flat slot='activator' class='tertiary--text'>
			<v-icon>add</v-icon>
			<span>Group</span>
		</v-btn>
		<v-card>
			<v-card-title>
				<h2 class='font-weight-light'>Add Group</h2>
			</v-card-title>
			<v-card-text>
				<v-form class='px-3' ref='form'>
					<v-text-field label='Name' autofocus v-model='name' prepend-icon='person'></v-text-field>
					<v-combobox
						label='Invite group members'
						v-model='members'
						multiple
						chips
						prepend-icon='people'
					></v-combobox>
					<v-combobox
						label='Invite other group owners'
						v-model='owners'
						multiple
						chips
						prepend-icon='person'
					></v-combobox>
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
import {createGroup, getGroup, deleteGroup, updateGroup} from '../modules/groupController.js';
import {login, register, updateUser, updateUserGroup} from '../modules/loginController.js';
import {mapState} from 'vuex';

export default {
  data() {
		return {
			name: '',
			members: [],
			owners: [],
			inputRules: [
				v => v.length >= 3 || 'Minimum length is 3 characters'
			],
			dialog: false,
			loading: false,
		}
	},
	computed: {
		...mapState({
			user: 'user',
		})
	},
	methods: {
		async submit() {
			this.loading = true;
			const uuidv4 = require('uuid/v4');
			const id = uuidv4();
			const projects = [];
			const owners = this.owners;
			owners.push(this.user.id);
			const members = this.members;
			for (let i = 0; i < owners.length; i++) {
				members.push(owners[i]);
			}
			const name = this.name
			const group = await createGroup(id, name, owners, projects, members);
			this.$store.commit('createGroup', group);
			// Update members
			members.forEach(member => {
				updateUserGroup(member, id);
			});
			owners.forEach(owner => {
				updateUserGroup(owner, id);
			});
			this.loading = false;
			this.$refs.form.reset();
			this.dialog = false;
			this.$emit('groupAdded');
		}
	}
}
</script>
