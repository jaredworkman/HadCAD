<template>
<nav>
	<v-snackbar color='secondary primary--text' v-model='snackbar' :timeout='3000' top>
		<span>Project added successfully!</span>
		<v-btn flat color='primary' @click='snackbar = false'>Close</v-btn>
	</v-snackbar>

	<v-toolbar color="primary" app> <!-- App fixes toolbar -->
		<v-toolbar-side-icon class="secondary--text hidden-xl-and-up" @click="sidebar = !sidebar"></v-toolbar-side-icon>
		<v-toolbar-title class="secondary--text text-uppercase">
            <span class="font-weight-light">Caddy</span>
            <span>Workflow</span>
		</v-toolbar-title>
		<v-spacer></v-spacer>
		
		<v-toolbar-items 
			class="hidden-sm-and-down"
			v-for='link in links' :key='link.text'
		>
			<v-tooltip bottom>
				<v-btn small flat color='secondary' :to='link.route' slot='activator' @click='click'>
					<v-icon small>{{ link.icon }}</v-icon>
				</v-btn>
				<span>{{ link.text }}</span>
			</v-tooltip>
		</v-toolbar-items>
		<v-toolbar-side-icon class="secondary--text" icon='timer' @click="timerSidebar = !timerSidebar"></v-toolbar-side-icon>
	</v-toolbar>

	<v-navigation-drawer app temporary class="primary" v-model="sidebar">
		<v-layout column align-center>
			<v-flex class='mt-5'>
				<v-avatar size='100'>
					<img src='/avatar-4.png'>
				</v-avatar>
				<p class="white--text subheading mt1">Connor Lindsey</p>
			</v-flex>
		</v-layout>
		<v-list>
			<v-list-tile 
				v-for="l in links" 
				:key="l.text" 
				:to="l.route"
			>
				<v-list-tile-action>
					<v-icon left class="white--text">{{ l.icon }}</v-icon>
				</v-list-tile-action>

				<v-list-tile-content>
					<v-list-tile-title right v-text="l.text" class="white--text"></v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</v-navigation-drawer>
</nav>
</template>

<script>
import Timer from '@/components/timer'

export default {
	components: {
		Timer
	},
	data() {
		return {
			sidebar: false,
			snackbar: false,
			links: [
				{ icon: '360', text: 'Login', route: '/' },
				{ icon: 'dashboard', text: 'Dashboard', route: '/dashboard' },
				{ icon: 'business', text: 'Project', route: '/projects' },
				{ icon: 'people', text: 'Team', route: '/group' },
				{ icon: 'person', text: 'Profile', route: '/profile' },
				{ icon: 'equalizer', text: 'Manager', route: '/manager' },
				{ icon: 'contacts', text: 'Client', route: '/client' },
				{ icon: 'logout', text: 'Logout', route: '/' },
			]
		}
	},
	methods: {
		click (e) {
			console.log(e.value)
		}
	}
}
</script>