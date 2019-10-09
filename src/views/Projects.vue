<template>
<div>
	<Project />

</div>
</template>

<script>
import Project from '@/components/Project.vue'

export default {
	components: {
		Project
	},
	data() {
		return {
		}
	},
	methods: {
		next () {
			const active = parseInt(this.active);
			this.active = (active < 2 ? active + 1 : 0);
		},
		addTimeRecord(links){
			const uuidv4 = require('uuid/v4');
			const id = uuidv4();
			const description = this.description;
			const time = this.min + (this.hr * 60);
			const d = new Date();
			const date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
			const userId = this.user.id;
			const newSubmission = { id, description, time, userId, date, links};
			this.$store.commit('createTimeSubmission', newSubmission);
        	this.updateProject();
		},
		createExpenseRecord(links){
			const uuidv4 = require('uuid/v4');
			const id = uuidv4();
			const description = this.description;
			const cost = this.cost;
			const userId = this.user.id;
			const d = new Date();
			const date = d.getDate + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
			const newSubmission = { id, description, cost, userId, date, links};
			this.$store.commit('createExpenseSubmission', newSubmission);
			this.updateProject();
		},
		createTask(){
			const d = new Date();
			const name = this.name;
			const id = name + '_' +  this.taskName + '_' + (d.getMonth() + 1) + '_' + d.getFullYear();
			const description = this.description;
			const deadline = document.getElementById('deadline').value;
			const estHours = this.estHours;
			const status = this.status;
			const tag = this.tag;
			const list = {name, tag};
			const timeSubmissions = [];
			const expenseSubmissions = [];
			const newTask = {id, name, description, deadline, estHours, status, list, timeSubmissions, expenseSubmissions};
			this.$store.commit('createTask', newTask);
			this.updateProject();
		},
		async addFile(){
			let links = [];
			const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
			try {
			const images = document.querySelector('#images').files;
			const processImage = (files, valid) => {
				const promise = Array.from(files).map(async (file) => {
				const Key = `${'hadcad'}-${'job'}-${file.name}`;
	
				const imageParams = {
					ACL: 'public-read',
					Bucket: 'hadcad-files',
					Key,
					Body: file,
				};
				console.log(imageParams);
				links.push('https://s3.amazonaws.com/' +  'hadcad-files' + '/' + Key);
				await s3.upload(imageParams).promise();
				});
	
				return promise;
          };
  
          const imagePromises = processImage(images);
          console.log(links);
  
  
          try {
            await Promise.all(imagePromises.concat(imagePromises));
            this.createTimeRecord(links)
  
          } catch (error) {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
        }
	}
}
}
</script>
