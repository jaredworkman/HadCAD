<template>
	<v-dialog max-width='600px' transition='dialog-transition' v-model='dialog' lazy>
		<v-btn small flat slot='activator' class='tertiary--text'>
			<v-icon class='mr-1'>timer</v-icon>
			<span>Time Submission</span>
		</v-btn>
		<v-card>
			<v-card-title>
				<h2 class='font-weight-light'>Add Time</h2>
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
					<v-text-field
						label='Time (mins)'
						prepend-icon='timer'
						v-model='time'
						hide-details
						single-line
						readonly
						type='number'
					></v-text-field>
					<v-layout>
						<v-flex>
							<v-menu menu-props='offsetY' transition='slide-y-transition'>
								<v-text-field :value='date' slot='activator' label='Date' prepend-icon='date_range'></v-text-field>
								<v-date-picker v-model='date'></v-date-picker>
							</v-menu>
						</v-flex>
						<v-flex class='mr-5 mt-2'>
							<v-btn color='primary' @click='clickFileUpload'>
								<input type='file' name='files' id='files' accept='image' @change='imageAdded' multiple/>
								<v-icon class='mr-1'>attach_file</v-icon>
								Upload File
							</v-btn>
							<span id='showImagesAdded'></span>
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
import {storage} from '../modules/firebaseController.js';
import { mapState } from 'vuex';

export default {
  data() {
		return {
			apiBaseURL: "https://74t3vol55c.execute-api.us-east-1.amazonaws.com/dev",
			name: '',
			description: '',
			date: null,
			estHours: 0,
			dialog: false,
			loading: false,
			task: null,
			imageCount: 0,
		}
	},
	computed: {
		...mapState({
			user: 'user',
			currentProject: 'currentProject',
			projectMap: 'projectMap',
			timers: state => state.timerModule.timers,
		}),
		time () {
			let timer = this.timers.find(tim => tim.taskId === this.task);
			if (timer == null) return 0;
			return timer.min + (timer.hr * 60);
		}
	},
	methods: {
		async addFile(id, name, links){
			const files = document.getElementById('files').files;
			let num = 0;
			console.log(num)
			for(let i = 0; i < files.length; i++){
				await this.uploadFile(files[i], id, name, num );
				links.push(name + '/' + id + '-' + num);
				num += 1;
			}
			return links

		},
		async submit() {
			this.loading = true;
			const uuidv4 = require('uuid/v4');
			const id = uuidv4();
			let links = [];
			links = await this.addFile(id, this.projectMap[this.currentProject].name, links);
			console.log(links)
			const description = this.description;
			const date = this.date;
			const userId = this.user.id
			const time = this.time;
			const timeSub = {id, description, date, userId, time, links};
			const task = this.task;
			this.$store.commit('createTimeSubmission', {task, timeSub});
			updateProject(this.currentProject, this.projectMap[this.currentProject].tasks);
			this.loading = false;
			this.$refs.form.reset();
			this.dialog = false;
		},
		async uploadFile(file, id, name, num){
				var storageRef = storage.ref( name + '/' + id + '-' +num);
				var file = file // use the Blob or File API
				storageRef.put(file).then(function(snapshot) {
					console.log('Uploaded a blob or file!');
				});
				var metadata = {
					contentType: 'image/jpeg',
				};
				// Upload the file and metadata
				console.log('heyehey');

				var uploadTask = storageRef.put(file, metadata);
		},
		clickFileUpload () {
			const FILE_BTN = document.getElementById('files');
			FILE_BTN.click();
		},
		imageAdded () {
			this.imageCount++
			let str = this.imageCount + 'Image(s) added';
			document.getElementById('showImagesAdded').innerText=str;
		}
		

	}
	}
</script>

<style scoped>
#files {
	display: none;
}
</style>