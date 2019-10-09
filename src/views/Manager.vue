<template>
<div class="primary--text">
	<!-- Sidenav -->
	<v-navigation-drawer
		app
		temporary
		class='primary secondary--text'
		v-model='sidebar'
	>
		<!-- Overview -->
		<v-list dark>
			<v-list-tile @click='setView("overview")'>
				<v-list-tile-action>
					<v-icon>assessment</v-icon>
				</v-list-tile-action>
				<v-list-tile-title>Overview</v-list-tile-title>
			</v-list-tile>
			<v-divider></v-divider>
			<!-- Team -->
			<v-list-group prepend-icon='account_circle'>
				<v-list-tile slot='activator'>
					<v-list-tile-title>Team</v-list-tile-title>
				</v-list-tile>
				<v-divider></v-divider>
				<v-list-group sub-group>
					<v-list-tile slot='activator'>
						<v-list-tile-title>Owners</v-list-tile-title>
					</v-list-tile>
					<!-- Owners -->
					<v-list-tile
						v-for='(owner, i) in group.owners'
						:key='i'
						@click='setMember(owner)'
					>
						<v-list-tile-action>
							<v-icon>person</v-icon>
						</v-list-tile-action>
						<v-list-tile-title>{{ owner }}</v-list-tile-title>
					</v-list-tile>
				</v-list-group>
				<v-divider></v-divider>
				<!-- Members -->
				<v-list-group sub-group>
					<v-list-tile slot='activator'>
						<v-list-tile-title>Members</v-list-tile-title>
					</v-list-tile>
					<v-list-tile
						v-for='(member, i) in group.members'
						:key='i'
						@click='setMember(member)'
					>
						<v-list-tile-action>
							<v-icon>person</v-icon>
						</v-list-tile-action>
						<v-list-tile-title>{{ member }}</v-list-tile-title>
					</v-list-tile>
				</v-list-group>
				<v-list-tile class='pl-2'>
					<add-member :light='true'/>
				</v-list-tile>
			</v-list-group>
			<v-divider></v-divider>
			<!-- Projects -->
			<v-list-group prepend-icon='build'>
				<v-list-tile slot='activator'>
					<v-list-tile-title>Projects</v-list-tile-title>
				</v-list-tile>
				<v-divider></v-divider>
				<v-list-tile
					v-for='project in projects.filter(proj => proj.group === this.currentGroup)'
					:key='project.id'
					@click='setProject(project)'
				>
					<v-list-tile-action>
						<v-icon>domain</v-icon>
					</v-list-tile-action>
					<v-list-tile-title>{{ project.name }}</v-list-tile-title>
				</v-list-tile>
				<v-divider></v-divider>
				<v-list-tile class='pl-2'>
					<add-project :light='true'/>
				</v-list-tile>
			</v-list-group>
			<v-divider></v-divider>
		</v-list>
	</v-navigation-drawer>

	<!-- Overview -->
	<v-container v-if='view === "overview"' fluid>
		<h2 class='display-1'>{{ group.name }}</h2>
		<!-- Overview -->
		<People />
		<!-- List projects -->
		<v-card 
        class='my-1' 
        v-for="project in projects.filter(proj => proj.group === this.currentGroup)"
        :key="project.id"
        hover
      >
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs6 sm3 md2>
            <div class="caption grey--text">Project Title</div>
            <div class='subheading'>{{ project.name }}</div>
          </v-flex>
          <v-flex xs6 sm2 md2>
            <div class="caption grey--text">Client</div>
            <div class='subheading text-truncate mr-2'>{{ project.client || 'N/A' }}</div>
          </v-flex>
          <v-flex xs6 sm2 md2>
            <div class="caption grey--text">Deadline</div>
            <div class='subheading'>{{ project.deadline | date }}</div>
          </v-flex>
          <v-flex xs6 sm2 md2>
            <div class="caption grey--text">Tasks</div>
            <div class='subheading'>{{ project.tasks.length }}</div>
          </v-flex>
          <v-flex xs6 sm2 md2>
            <div class="caption grey--text">Time</div>
            <div class='subheading'>{{ project.tasks || '0' }}</div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
	</v-container>
	<!-- Project View -->
	<v-container v-else-if='view === "project"' fluid>
		<v-layout column>
			<v-flex xs12 lg6 order-lg-1 class='mx-2'>
				<Project />
			</v-flex>
			<v-flex xs12 lg6 order-lg-2 class='mx-2'>
				<v-card id='projectTotals'>
						<p class= 'subheading'>Expenses: $ {{projectExpenses}}</p>
						<v-divider></v-divider>
						<p class= 'subheading'>Hours Worked: {{projectTime}}</p>
						<v-divider></v-divider>
						<p class= 'subheading'>Total Expenses: $ {{totalProjectExpenses}} </p>
						<v-divider></v-divider>
						<p class= 'subheading'>Remaining Budget: {{remainingBudget}}</p>
						<v-divider></v-divider>
						<p class= 'subheading'>Percent Complete: {{ percentComplete.toPrecision(2) }}</p>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
	<!-- Member View -->
	<v-container v-else-if='view === "member"'>
		Member view
	</v-container>
	<v-btn
		fab
		bottom
		left
		fixed
		class='primary my-4'
		@click='sidebar = !sidebar'
	>
		<v-icon>menu</v-icon>
	</v-btn>
</div>
</template>

<script>
import Project from '@/components/Project.vue'
import People from '@/components/People.vue'
import addProject from '@/components/addProject.vue'
import addMember from '@/components/addMember.vue'

import {mapState} from 'vuex'


export default {
	components: {
		Project,
		People,
		addProject,
		addMember
	},
	data() {
		return {
			sidebar: false,
			view: 'overview',
		}
	},
	computed: {
		...mapState({
			user: 'user',
			groups: 'groups',
			projects: 'projects',
			currentProject: 'currentProject',
			projectMap: 'projectMap',
			groupMap: 'groupMap',
			group: state => state.groupMap[state.currentGroup],
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
		})
	},
	methods :{
		calculate(){
			this.$store.commit('getProjectInfo');
		},
		setMember(member) {
			this.setView('member');
			this.$store.commit('setCurrentMember', member);
		},
		setProject(project) {
			this.setView('project');
			this.$store.commit('setCurrentProject', project);
			this.calculate();
		},
		setView (view) {
			this.view = view;
			this.sidebar = false;
		}
		// async printReport(){
		// 	var pdf = new jsPDF('p', 'pt', 'letter');
		// 	pdf.canvas.height = 72 * 11;
		// 	pdf.canvas.width = 72 * 8.5;
		// 	pdf.fromHTML(document.getElementById('pdfDiv'));
		// 	window.print();
		// 	pdf.save('testing');
		// },
	}
}
</script>



