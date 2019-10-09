<template>
<div class='ma-5'>
	<v-card max-width='400px' class='mx-auto'>
		<v-layout column justify-center align-center>
			<v-flex>
				<v-card-title class='display-1 primary--text'>
					Sign In
				</v-card-title>
			</v-flex>
			<v-flex>
				<v-card-text>
					<v-form ref='signIn'>
						<v-text-field
							label='Email'
							v-model='userEmail'
							prepend-icon='mail'
							:rules='inputRules'
							required
						></v-text-field>
						<v-text-field
							label='Password'
							v-model='userPassword'
							prepend-icon='lock'
							:rules='inputRules'
							:type='show1 ? "text" : "password"'
							:append-icon="show1 ? 'visibility_off' : 'visibility'"
							@click:append="show1 = !show1"
							required
						></v-text-field>
						<v-btn
							block flat outline
							class='primary'
							@click='userSignIn'
							:loading='loading'
							>Submit</v-btn>
					</v-form>
				</v-card-text>
			</v-flex>
		</v-layout>
	</v-card>

	<v-card max-width='400px' class='mx-auto mt-4'>
		<v-card-text class='text-xs-center'>
			New to Caddy? <a href='#' @click='signUp = true'>Sign Up!</a>
		</v-card-text>
	</v-card>

	<v-dialog max-width='400px' transition='dialog-transition' v-model='signUp'>
		<v-card>
			<v-layout column justify-center align-center>
				<v-flex>
					<v-card-title class='display-1 primary--text'>
						Sign Up
					</v-card-title>
				</v-flex>
				<v-flex>
					<v-card-text>
						<v-form ref='signUp'>
							<v-text-field
								label='Name'
								v-model='newUserName'
								prepend-icon='person'
								:rules='inputRules'
								required
							></v-text-field>
							<v-text-field
								label='Email'
								v-model='newUserEmail'
								prepend-icon='mail'
								:rules='inputRules'
								required
							></v-text-field>
							<v-text-field
								label='Password'
								v-model='newUserPassword'
								prepend-icon='lock'
								:rules='inputRules'
								:type='show1 ? "text" : "password"'
								:append-icon="show1 ? 'visibility_off' : 'visibility'"
								@click:append="show1 = !show1"
								required
							></v-text-field>
							<v-select
								label='Role'
								v-model='newUserRole'
								:items='roles'
								prepend-icon='work'
								:menu-props="{
									offsetY: '',
									transition: 'slide-y-transition'
								}"
								required
							></v-select>
							<v-btn
								block flat outline
								class='primary'
								@click='userSignUp'
								:loading='loading'
								>Submit</v-btn>
						</v-form>
					</v-card-text>
				</v-flex>
			</v-layout>
		</v-card>
	</v-dialog>
</div>
</template>

<script>
// import { mapState } from 'vuex'
import {login, register} from '../modules/loginController.js';
import {createGroup, getGroup, deleteGroup, updateGroup} from '../modules/groupController.js';
import {createProject, getProject, updateProject, deleteProject} from '../modules/projectController.js';
import { mapState } from 'vuex';


export default {
	name: 'login',
	data() {
		return {
			show1: false,
			show2: false,
			signUp: false,
			loading: false,
			inputRules: [
				v => v.length >= 3 || 'Error'
			],
			roles: ['Employee', 'Client'],
			userEmail: '',
			userPassword: '',
			newUserEmail: '',
			newUserPassword: '',
			newUserName: '',
			newUserRole: null,
			settings: {
				permissions: [],
			}
		}
	},
	computed: {
		...mapState({
			user: 'user',
			groups: 'group',
			projects: 'projects',
		})
  	},
	methods: {
		async userSignIn() {
			//if (this.$refs.signIn.validate()) {
				this.loading = true;
				const res = await login(this.userEmail, this.userPassword);
				res.returnGroups.forEach(group => {
					this.$store.commit('createGroup', group);
				});
				res.returnProjects.forEach(project => {
					this.$store.commit('createProject', project);
				});				
				this.$store.commit('signInUser', res);
				this.getAllInfo();
				setTimeout(() => {
				this.loading = false;
				this.$router.push('Dashboard');
			}, 1500);
			//}
		},
		async userSignUp() {
			//if (this.$refs.signIn.validate()) {
				this.loading = true;
				let groups = [];
				let projects = [];

				const res = await register(this.newUserEmail, this.newUserPassword, this.settings, this.newUserName, groups, projects);
				if(res){
					const user = await login(this.newUserEmail, this.newUserPassword);
					this.$store.commit('signInUser', user);
					user.returnGroups.forEach(group => {
						this.$store.commit('createGroup', group);
					});
					user.returnProjects.forEach(project => {
						this.$store.commit('createProject', project);
					});
				}
				this.getAllInfo();
				setTimeout(() => {
				this.loading = false;
				this.$router.push('Dashboard');
			}, 1500);
			//}
		},
		async findProject(id) {
			const project = await getProject(id);
			console.log('project:', project);
			this.$store.commit('createProject', project);
		},
		async findGroup(id) {
			const group = await getGroup(id);
			console.log('group:', group);
			this.$store.commit('createGroup', group);
		},
		getAllInfo() {
			console.log(this.user);
			this.user.projects.forEach(id => {
			this.findProject(id);
			});
			this.user.groups.forEach(id => {
			this.findGroup(id);
			});
		},
  },
}
</script>
