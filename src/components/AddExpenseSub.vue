<template>
	<v-dialog max-width='600px' transition='dialog-transition' v-model='dialog' lazy>
		<v-btn small flat slot='activator' class='tertiary--text'>
			<v-icon>attach_money</v-icon>
			<span>Expense Submission</span>
		</v-btn>
		<v-card>
			<v-card-title>
				<h2 class='font-weight-light'>Expense Submission</h2>
			</v-card-title>
			<v-card-text>
				<v-form class='px-3' ref='form'>
					<v-select
					autofocus
					:items="projectMap[currentProject].tasks"
					item-text="name"
					item-value="id"
					label='Task'
					v-model="task"
					prepend-icon='weekend'
					menu-props='offsetY'
				></v-select>
					<v-textarea 
						label='Description' 
						v-model='description' 
						prepend-icon='edit'
						rows='1'
						auto-grow
					></v-textarea>
					<v-layout>
						<v-flex>
							<v-menu menu-props='offsetY' transition='slide-y-transition'>
								<v-text-field :value='date' slot='activator' label='Date' prepend-icon='date_range'></v-text-field>
								<v-date-picker v-model='date'></v-date-picker>
							</v-menu>
						</v-flex>
						<v-text-field
							v-model='cost'
							lbael='Cost'
							prepend-icon='attach_money'
							hide-details
							single-line
							type='number'
						></v-text-field>
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
import { mapState } from 'vuex';

export default {
  data() {
		return {
			name: '',
			description: '',
			deadline: null,
			estHours: 0,
			task: null,
			date: '',
			cost: 0,
			dialog: false,
			loading: false,
		}
    },
    computed: {
		...mapState({
			user: 'user',
			currentProject: 'currentProject',
			projectMap: 'projectMap',
		})
	},
	methods: {
		submit() {
			this.loading = true;
			const uuidv4 = require('uuid/v4');
			const id = uuidv4();
			const description = this.description;
			const date = this.date;
			const userId = this.user.id
			const cost = this.cost;
			const links = [];
			const expenseSub = {id, description, date, userId, cost, links};
			const task = this.task;
			this.$store.commit('createExpenseSubmission', {task,expenseSub});
			updateProject(this.currentProject, this.projectMap[this.currentProject].tasks);
			this.loading = false;
			this.$refs.form.reset();
			this.dialog = false;
			// this.$emit('projectAdded');
		}
	}
}
</script>
