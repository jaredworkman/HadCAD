<template>
	<div class="client">
		<v-stepper
			v-model='progress'
			alt-labels
			non-linear
		>
			<v-stepper-header>
				<template
					v-for='(list, i) in projectMap[currentProject].lists'	
				>
					<v-stepper-step
						:key='`${i}-step`'
						:complete='progress > i'
						:color='(progress > i) ? "green" : "primary" '
						:step='i'
					>{{ list.name }}
					</v-stepper-step>
					<v-divider
						v-if='(i + 1) < projectMap[currentProject].lists.length'
						:key='i'
					></v-divider>

				</template>
			</v-stepper-header>
		</v-stepper>

		<v-layout row wrap align-start justify-space-between fill-height class='mt-3'>
			<v-flex xs12 lg7 class='pr-2'>
				<Project page='Client'/>
			</v-flex>
			<v-flex xs12 lg5>
				<v-card id='chart'>
					<v-responsive>
						<GChart
							type="ColumnChart"
							:data="chartData"
							:options="chartOptions"
						/>
					</v-responsive>
					<v-card-text>
						<p class='subheading'>Expenses: {{projectExpenses}}</p>
						<v-divider></v-divider>
						<p class='subheading'>Hours Worked: {{projectTime}}</p>
						<v-divider></v-divider>
						<p class='subheading'>Total Expenses: {{totalProjectExpenses}} </p>
						<v-divider></v-divider>
						<p class='subheading'>Remaining Budget: {{remainingBudget}}</p>
						<v-divider></v-divider>
						<p class='subheading'>Percent Complete: {{percentComplete}}</p>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
		<v-timeline class='elevation-4 mt-3 mx-1' v-if='recentSubmissions.length > 0'>
			<v-timeline-item
				v-for="(sub, i) in pageSubmissions"
				:key="i"
				icon='check'
				color="primary"
				fill-dot
			>
				<span slot="opposite">{{ sub.userId }}</span>
				<v-card class="elevation-8 mx-3">
					<v-card-title class="title font-weight-light">{{ sub.date | date }}</v-card-title>
					<v-card-text>
						<v-layout row wrap>
							<v-flex>
								<div class="caption grey--text">Submission</div>
								<div class='subheading'>{{ sub.description }}</div>
							</v-flex>
							<v-flex>
								<div class="caption grey--text">Time</div>
								<div class='subheading'>{{ sub.time }}</div>
							</v-flex>
						</v-layout>
					</v-card-text>	
				</v-card>
			</v-timeline-item>
			<v-pagination
				v-model='page'
				:length='recentSubmissions.length % 5'
				circle
			></v-pagination>
		</v-timeline>
	</div>
</template>

<script>
import Project from '@/components/Project.vue'
import { GChart } from 'vue-google-charts'
import { mapState } from 'vuex';

export default {
	components: {
		GChart,
		Project
  },
	data() {
		return {
			chartData: [
				['Year', 'Sales', 'Expenses', 'Profit'],
				['December', 1000, 400, 200],
				['January', 2000, 460, 250],
				['February', 660, 1120, 300],
				['March', 1030, 540, 350]
			],
			chartOptions: {
				chart: {
					title: 'Company Performance',
					subtitle: 'Sales, Expenses, and Profit: 2014-2017',
				}
			},
			progress: 1,
			page: 1,
		}
	},
	created () {
		this.$store.commit('getProjectInfo');
	},
	computed: {
		...mapState({
			user: 'user',
			groups: 'groups',
			projects: 'projects',
			currentProject: 'currentProject',
			projectMap: 'projectMap',
			project: state => state.projectMap[state.currentProject],
			tasks: state => state.projectMap[state.currentProject].tasks,
			groupMap: 'groupMap',
			currentGroup: 'currentGroup',
			expenses: 'expenses',
			percentComplete: 'percentComplete',
			remainingBudget: 'remainingBudget',
			userTime: 'userTime',
			wage: 'wage',
			projectTime: 'projectTime',
			projectExpenses: 'projectExpenses',
			totalProjectExpenses: 'totalProjectExpenses',
			totalTime: 'totalTime',
			totalExpenses: 'totalExpenses',
		}),
		recentSubmissions () {
			let subs = [];
			for (let i = 0; i < this.tasks.length; i++) {
				for (let j = 0; j < this.tasks[i].timeSubmissions.length; j++) {
					subs.push(this.tasks[i].timeSubmissions[j])
				}
			}
			return subs;
		},
		pageSubmissions () {
			let i = (this.page * 5) - 5
			return this.recentSubmissions.slice(i, i + 5)
		}
	},
	methods: {
		stepper () {
			if (this.progress < this.projectMap[this.currentProject].lists.length) {
				this.progress++;
			} else {
				this.progress = 0;
			}
		},
		onPageChange () {

		}
	}
}
</script>
