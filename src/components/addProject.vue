<template>
	<v-dialog max-width='600px' transition='dialog-transition' v-model='dialog'>
		<v-btn small flat slot='activator' class='tertiary--text'>
			<v-icon>add</v-icon>
			<span>Project</span>
		</v-btn>
		<v-card>
			<v-card-title>
				<h2 class='font-weight-light'>Add Project</h2>
			</v-card-title>
			<v-card-text>
				<v-form class='px-3' ref='form'>
					<v-text-field label='Title' v-model='title' prepend-icon='folder' :rules='inputRules'></v-text-field>
					<v-text-field label='Client' v-model='client' prepend-icon='person' :rules='inputRules'></v-text-field>
					<v-textarea 
						label='Description' 
						v-model='description' 
						prepend-icon='edit'
						rows='1'
						auto-grow
						:rules='inputRules'
					></v-textarea>

					<v-select 
						:items='groupNames'
						label='Group'
						prepend-icon='people'
						offset-y
					></v-select>

					<v-select
						:items='members'
						multiple
						chips
						deletable-chips
						offset-y
						hide-selected
						clearable
						label='Members'
						prepend-icon='person_add'
					></v-select>

					<v-menu offset-y transition='slide-y-transition'>
						<v-text-field :value='deadline' slot='activator' label='Deadline' :rules='inputRules' prepend-icon='date_range'></v-text-field>
						<v-date-picker v-model='deadline'></v-date-picker>
					</v-menu>
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
import {createProject, getProject, updateProject, deleteProject} from '../modules/projectController.js';
import {login, register, updateUser} from '../modules/loginController.js';
import { mapState } from 'vuex';

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
			loading: false,
			members: ['Jared Workman', 'Connor Lindsey', 'Grant Hagen', 'Tab McLain']
		}
	},
	computed: {
		...mapState({
			user: 'user',
			groups: 'groups',
			groupNames: 'groupNames'
		})
	},
	methods: {
		submit() {
			// if (this.$refs.form.validate()) {
			// 	this.loading = true;
			// 	// Submit project
			// 	// Send to store
			// 	setTimeout(() => {
			// 		this.loading = false;
			// 		this.dialog = false;
			// 		this.$emit('projectAdded');
			// 	}, 1000)
			// }
			const name = this.title;
			const uuidv4 = require('uuid/v4');
			const id = uuidv4();
			const description = this.description;
			const clients = [];
			clients.push(this.client);
			const budget = null;
			const deadline = this.deadline;
			const status = 'ongoing';
			const data = [];
			const members = [];
			const lists = [];
			const group = null;
			createProject(id, name, description, status, clients, budget, deadline, members, data, lists, group);
			const newProject = {id, name, description, status, clients, budget, deadline, members, data, lists, group}
            this.$store.commit('createProject', newProject);
			this.$store.commit('addProjectToCompany', id);
			members.forEach(member => {
				updateUserGroup(member, id);
			});
			this.user.projects.push(id);
			this.loading = true;
			this.addToUser();
			setTimeout(() => {
				this.loading = false;
				this.dialog = false;
				this.$emit('projectAdded');
			}, 1000)
		},
		addToUser(){
			console.log('updainging user2222');
			updateUser(this.user);
    	}	
	}
}
</script>
