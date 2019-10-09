<template>
<div>
	<v-toolbar 
		color='white'
		flat>
		<v-toolbar-title>{{ project.name }}</v-toolbar-title>
		<v-spacer></v-spacer>
		<addTask :class="`displayIf ${this.page}`"/>
		<AddTimeSub :class="`displayIf ${this.page}`"/>
		<AddExpenseSub :class="`displayIf ${this.page}`"/>
		<v-btn icon @click='timerSidebar = !timerSidebar'  :class="`displayIf ${this.page}`">
			<v-icon>timer</v-icon>
		</v-btn>
	</v-toolbar>
	<v-navigation-drawer app temporary right class="primary" v-model="timerSidebar"  :class="`displayIf ${this.page}`">
		<v-layout column align-center>
			<!-- Main Timer -->
			<v-card class='my-5 text-xs-center' width='80%'>
				<v-card-title class='display-1 font-weight-thin ml-4'>{{ clockedIn }}</v-card-title>
				<v-divider></v-divider>
				<v-card-text class='display-1 font-weight-light'>{{ timeMain || '00:00:00' }}</v-card-text>
				<v-divider></v-divider>
				<v-card-actions class='mt-3'> 
					<v-btn flat @click='play_pause'>
						<v-icon>play_arrow</v-icon>
						<v-icon>pause</v-icon>
					</v-btn>
					<v-btn flat @click='reset'>
						<v-icon>autorenew</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
			<!-- Timers -->
			<v-card 
				class='text-xs-center ma-3'
				v-for='timer in timers'
				:key='timer.t'
				width='80%'
			>
				<v-card-title class='title font-weight-light'>
					{{ timer.taskName }}
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text :class="`title font-weight-regular ${timer.timerState}`">{{ timer.time || '00:00:00' }}</v-card-text>
				<v-divider></v-divider>
				<v-card-actions> 
					<v-btn small icon @click='play_pauseTimer(timer.taskId)' class='ml-auto'>
						<v-icon small>play_arrow</v-icon>
						<v-icon small>pause</v-icon>
					</v-btn>
					<v-btn small icon @click='resetTimer(timer.taskId)'>
						<v-icon small>autorenew</v-icon>
					</v-btn>
					<v-btn small icon @click='deleteTimer(timer)' class='mr-auto'>
						<v-icon small>clear</v-icon>
					</v-btn>
				</v-card-actions>			
			</v-card>
		</v-layout>
	</v-navigation-drawer>
	<!-- Tasks -->
	<v-card class='elevation-8 mx-auto my-3' style='width: 45%;' v-if='tasks.length == 0 && lists.length == 0'>
		<v-card-title class='headline'>Let's Get Started!</v-card-title>
		<v-card-text class='subheading font-weight-regular'>
			Select <code class='mx-1'>+ LIST</code> to start organizing your project.
			 Then, add a task using <code class='mx-1'>+ TASK</code>. From there, start tracking time, recording 
			 submissions, and creating the next big thing!
		</v-card-text>
	</v-card>
	<v-layout class='px-2' fluid>
		<v-flex> 
			<v-menu 
				offset-y
				close-on-click
				close-on-content-click
				full-width
				transition='scale-transition'
			>
				<v-btn
					color='primary'
					slot='activator'
					block
				>
					{{ list.name }}
				</v-btn>
				<v-list>
					<v-list-tile
						v-for='(list, i) in project.lists'
						:key='i'
						@click='setList(list)'
					>
						<v-list-tile-title>{{ list.name }}</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-menu>
		</v-flex>
		<v-flex xs3 sm1 md1 :class="`displayIf ${this.page}`">
			<add-list />
		</v-flex>
	</v-layout>
	<Task 
		v-for='t in tasks.filter(task => task.list.id === this.list.id)'
		@start-timer='play_pauseTimer'
		@update-status="changeProjectStatus"
		:key='t.id'
		:task='t'
	/>
</div>
</template>

<script>
import Task from '@/components/Task.vue'
import addTask from '@/components/addTask.vue'
import AddTimeSub from '@/components/AddTimeSub.vue'
import AddExpenseSub from '@/components/AddExpenseSub.vue'
import AddList from '@/components/AddList.vue'
import { mapState } from 'vuex'

export default {
	props: {
		page: String
	},
	components: {
		Task,
		addTask,
		AddTimeSub,
		AddExpenseSub,
		AddList
	},
	data() {
		return {
			active: 0,
			search: false,
			list: null,
			// Timer
			timerSidebar: false,
		}
	},
	created() {
		if (this.project.lists.length > 0) {
			this.list = this.project.lists[0];
		} else {
			this.list = {
				name: 'Add a list'
			}
		}
	},
	computed: {
    ...mapState({
      user: 'user',
      groups: 'groups',
			projects: 'projects',
			currentProject: 'currentProject', // ID
			projectMap: 'projectMap',
			project: state => state.projectMap[state.currentProject],
			lists: state => state.projectMap[state.currentProject].lists,
			tasks: state => state.projectMap[state.currentProject].tasks,
			// Timer Stuffs
			timerState: state => state.timerModule.mainTimer.timerState,
			timeMain: state => state.timerModule.mainTimer.time,
			timers: state => state.timerModule.timers
		}),
		clockedIn () {
			return (this.timerState === 'playing') ? 'Clocked In' : 'Clocked Out';
		}
	},
	methods: {
		changeProjectStatus(){
			console.log('payload');
		},
		setList (list) {
			this.list = list;
		},
		// Timer Methods
		play_pause () {
      if (this.timerState === 'stopped') {
				let t = setInterval(this.add, 1000);
				this.$store.commit('timerModule/playMain', t);
      } else if (this.timerState === 'playing') {
				this.$store.commit('timerModule/pauseMain');
      }
		},
		reset () {
			this.$store.commit('timerModule/resetMain');			
		},
		add () {
			this.$store.commit('timerModule/addMain');
		},
		play_pauseTimer (id) {
			let timer = this.timers.find(t => t.taskId === id);
			this.timerSidebar = true;
			if (timer.timerState === 'stopped') {
				// Check if main timer is running before starting sub timer
				// if (this.mainTimer.timerState !== 'playing') {
				// 	this.play_pause();
				// }
				let tmp = setInterval(this.runTimer, 1000, id);
				this.$store.commit('timerModule/playTimer', { id: id , t: tmp });
			} else if (timer.timerState === 'playing') {
				this.$store.commit('timerModule/pauseTimer', { id: id , t: timer.t });
			}
		},
		resetTimer (id) {
			this.$store.commit('timerModule/resetTimer', id);
		},
		runTimer (id) {
			this.$store.commit('timerModule/addTimer', id);
		},
		deleteTimer (timer) {
			this.$store.commit('timerModule/deleteTimer', timer);
		}
	}
}
</script>

<style>
.displayIf.Client {
	display: none;
}
.playing {
	color: rgb(71, 243, 71);
}
</style>