<template>
	<v-dialog max-width='600px' transition='dialog-transition' v-model='dialog' lazy>
		<v-btn small flat slot='activator' class='tertiary--text'>
			<v-icon>add</v-icon>
			<span>Task</span>
		</v-btn>
		<v-card>
			<v-card-title>
				<h2 class='font-weight-light'>Add Task</h2>
			</v-card-title>
			<v-card-text>
				<v-form class='px-3' ref='form' id='addTaskForm'>
					<v-text-field autofocus label='Name' v-model='name' prepend-icon='folder'></v-text-field>
					<v-textarea 
						label='Description' 
						v-model='description' 
						prepend-icon='edit'
						rows='1'
						auto-grow
					></v-textarea>
					<v-text-field
						label='Est. Time (mins)'
						prepend-icon='timer'
						v-model='estHours'
					></v-text-field>
					<v-select 
						:items='lists'
						item-text='name'
						return-object
						label='Select List'
						prepend-icon='category'
						v-model='list'
						menu-props='offsetY'
					></v-select>
					<v-menu menu-props='offsetY' transition='slide-y-transition'>
						<v-text-field :value='deadline | date' slot='activator' label='Deadline' prepend-icon='date_range'></v-text-field>
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
import { mapState } from 'vuex';

export default {
  data() {
		return {
			name: '',
			description: '',
			deadline: null,
			estHours: null,
			list: null,
			dialog: false,
			loading: false,
		}
	},
	computed: {
    ...mapState({
      user: 'user',
      groups: 'groups',
			projects: 'projects',
			currentProject: 'currentProject',
			projectMap: 'projectMap',
			lists: state => state.projectMap[state.currentProject].lists
    })
  },
	methods: {
		submit() {
				this.loading = true;
				console.log('newTask');
				const d = new Date();
				const uuidv4 = require('uuid/v4');
				const id = uuidv4();
				const name = this.name;
				const description = this.description;
				const deadline = this.deadline;
				const estHours = this.estHours;
				const status = 'ongoing';
				const timeSubmissions = [];
				const expenseSubmissions = [];
				const list = this.list;
				const newTask = {id, name, description, deadline, estHours, status, timeSubmissions, expenseSubmissions, list};
				console.log('about');
				this.$store.commit('createTask', newTask);
				console.log('about');
				const proj = this.projectMap[this.currentProject];
				console.log(proj.tasks);
				updateProject(this.currentProject, proj.tasks);
				this.loading = false;
				this.$refs.form.reset();
				this.dialog = false;
			}
		}
}
</script>
