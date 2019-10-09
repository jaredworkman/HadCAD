<template>
	<v-dialog max-width='600px' transition='dialog-transition' v-model='dialog' lazy>
		<v-btn small flat slot='activator' :class='`${color}--text`'>
			<v-icon>add</v-icon>
			<span>Member</span>
		</v-btn>
		<v-card>
			<v-card-title>
				<h2 class='font-weight-light'>Add Group Member</h2>
			</v-card-title>
			<v-card-text>
				<v-form class='px-3' ref='form'>
					<v-text-field autofocus label='Name' v-model='name' prepend-icon='person'></v-text-field>
					<v-text-field label='Email' v-model='email' prepend-icon='email'></v-text-field>
					<v-select
						label='Add to projects'
						:items='projects.filter(proj => proj.group === this.currentGroup)'
						item-text='name'
						item-value='id'
						chips
						deletable-chips
						hide-selected
						clearable
						multiple
						return-object
						v-model='userProjects'
						prepend-icon='domain'
						menu-props='offsetY'
						no-data-text='No projects to add'
					></v-select>
					<v-layout>
						<v-checkbox
							label='Owner'
							v-model='owner'
						></v-checkbox>
						<!-- <v-spacer></v-spacer> -->
						<v-btn
							flat outline 
							class='primary mx-0 mt-3 primary--text' 
							@click='submit'
							:loading='loading'
						>Submit</v-btn>
					</v-layout>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import {updateUserProject} from '../modules/loginController.js';
import {updateGroup, addMemberToGroup} from '../modules/groupController.js';
import {createProject, getProject, updateProject, deleteProject} from '../modules/projectController.js';
import { mapState } from 'vuex';

export default {
	props: ['light'],
  data() {
		return {
			email: '',
			name: '',
			id: '',
			owner: false,
			userProjects: [],
			dialog: false,
			loading: false
		}
	},
	computed: {
		...mapState({
			projects: 'projects',
			groupMap: 'groupMap',
			currentGroup: 'currentGroup',
			user: 'user'
	    }),
		color () {
			return (this.light) ? 'secondary' : 'tertiary'
		}
	},
	methods: {
		submit() {
			this.loading = true;
			this.addMember();
			this.loading = false;
			this.$refs.form.reset();
			this.dialog = false;
			this.$emit('memberAdded');
		},
		addMember() {
			const email = this.email;
			const projectList = this.userProjects;
			const groupId = this.currentGroup;
			addMemberToGroup(groupId, email);
			this.$store.commit('addMemberToGroup', this.email);
			// projectList.forEach(id => {
			// 	this.$store.commit('addProjectToGroup', {groupId, id});
			// });
			let projectIds = []
			this.groupMap[groupId].projects.forEach(project => {
				projectIds.push(project.id)
			})
			// updateGroup(groupId, projectIds);
			updateUserProject(email, projectIds);
		}
	}
}
</script>
