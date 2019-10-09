<template>
	<v-dialog max-width='600px' transition='dialog-transition' v-model='dialog' lazy>
		<v-btn small flat slot='activator' :class='`${color}--text`'>
			<v-icon>add</v-icon>
			<span>Project</span>
		</v-btn>
		<v-card>
			<v-card-title>
				<h2 class='font-weight-light'>Add Project</h2>
			</v-card-title>
			<v-card-text>
				<v-form class='px-3' ref='form'>
					<v-text-field autofocus label='Title' v-model='title' prepend-icon='folder' required></v-text-field>
					<v-textarea 
						label='Description' 
						v-model='description' 
						prepend-icon='edit'
						rows='1'
						auto-grow
						required
					></v-textarea>
					<v-combobox
						label='Client'
						v-model='client' 
						prepend-icon='person'
						multiple
						chips
						deletable-chips
					></v-combobox>
					<v-select
						label='Group'
						:items='groupCheckOwner'
						item-text="name"
						item-value="id"
						return-object
						required
						v-model='group'
						prepend-icon='people'
						menu-props='offsetY'
						no-data-text='You must be a group owner to add a project'
					></v-select>
					<v-select
						:items='membersForm'
						multiple
						chips
						deletable-chips
						menu-props='offsetY'
						hide-selected
						clearable
						v-model="projectManagers"
						label='Project Managers'
						prepend-icon='person_add'
						no-data-text='No members to make project managers'
					></v-select>
					<v-select
						:items='membersForm'
						multiple
						chips
						deletable-chips
						menu-props='offsetY'
						hide-selected
						clearable
						v-model="members"
						label='Members'
						prepend-icon='person_add'
						no-data-text='Hmm, there are no members in this group'
					></v-select>
					<v-layout row wrap justify-space-between>
						<v-flex>
							<v-text-field
								label='Initial Budget'
								v-model='budget'
								prepend-icon="attach_money"
							></v-text-field>
						</v-flex>
						<v-flex>
							<v-menu offset-y transition='slide-y-transition'>
								<v-text-field :value='deadline | date' slot='activator' label='Deadline' prepend-icon='date_range'></v-text-field>
								<v-date-picker v-model='deadline'></v-date-picker>
							</v-menu>
						</v-flex>
					</v-layout>
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
import {login, register, updateUser, updateUserGroup,updateUserProject} from '../modules/loginController.js';
import { mapState, mapGetters } from 'vuex';
import { updateGroup} from '../modules/groupController.js'

export default {
	props: ['light'],
  data() {
		return {
			title: '',
			description: '',
			group: '',
			deadline: null,
			members: [],
			projectManagers: [],
			client: '',
			budget: 0,
			dialog: false,
			loading: false,
		}
	},
	computed: {
		...mapState({
			user: 'user',
			groups: 'groups',
			projects: 'projects',
			groupMap: 'groupMap',
		}),
		membersForm () {
			if (this.group == null) return []
			return this.group.members
		},
		color () {
			return (this.light) ? 'secondary' : 'tertiary'
		},
		groupCheckOwner () {
			let arr = [];
			arr = this.groups.filter(g => g.owners.includes(this.user.id));
			return arr;
		}
	},
	methods: {
		submit() {
			this.loading = true;
			const name = this.title;
			const uuidv4 = require('uuid/v4');
			const id = uuidv4();
			const description = this.description;
			const clients = this.client;
			const budget = this.budget;
			const deadline = this.deadline;
			const status = 'ongoing';
			const tasks = [];
			const members = this.members;
			const projectManagers = this.projectManagers;
			const lists = [];
			const group = this.group.id;
			const users = {
				projectManagers: this.projectManagers,
				members: this.members
			}
			createProject(id, name, description, status, clients, budget, deadline, members, tasks, lists, group, users);
			const newProject = {id, name, description, status, clients, budget, deadline, members, tasks, lists, group, users}
			this.$store.commit('createProject', newProject);
			let groupId = this.group.id;
			this.$store.commit('addProjectToGroup', {groupId,id});
			members.forEach(member => {
				console.log("finding members")
				updateUserProject(member, id)
			});
			updateGroup(groupId, id);
			this.user.projects.push(id);
			this.addToUser();
			this.loading = false;
			this.$refs.form.reset();
			this.dialog = false;
			this.$emit('projectAdded');
		},
		addToUser(){
			updateUser(this.user);
		}	
	}
}
</script>
