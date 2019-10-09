<template>
	<v-dialog max-width='600px' transition='dialog-transition' v-model='dialog' lazy>
		<v-btn slot='activator' class='primary'>
			<v-icon>add</v-icon>
			<span>List</span>
		</v-btn>
		<v-card>
			<v-card-title>
				<h2 class='font-weight-light'>Add List</h2>
			</v-card-title>
			<v-card-text>
				<v-form class='px-3' ref='form'>
					<v-text-field autofocus label='List name' v-model='name' prepend-icon='list'></v-text-field>
					<v-combobox
						label='Select Tag'
						v-model='tag'
            :items='tags'
						prepend-icon='dns'
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
import {createProject, getProject, updateProject, deleteProject, updateListsProject} from '../modules/projectController.js';
import { mapState } from 'vuex';

export default {
  data() {
		return {
			name: null,
			dialog: false,
			loading: false,
			tag: null,
      tags: ['Concept Development', 'Market Research', 'Modeling', 'CAD', 'Testing']
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
			console.log('New List');
			const name = this.name;
			const tag = this.tag;
			const newList = { id, name, tag };
			console.log(newList);
			this.dialog = false;
			this.$store.commit('createList', newList);
			updateListsProject(this.currentProject, this.projectMap[this.currentProject].lists);
			this.loading = false;
			this.$refs.form.reset();
			this.dialog = false;
				// this.$emit('projectAdded');
		}
	}
}
</script>
