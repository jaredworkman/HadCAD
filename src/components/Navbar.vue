<template>
<nav>
	<v-snackbar color='secondary primary--text' v-model='snackbar' :timeout='2500' top>
		<span>Project added successfully!</span>
		<v-btn flat color='primary' @click='snackbar = false'>Close</v-btn>
	</v-snackbar>

	<v-snackbar color='secondary primary--text' v-model='logoutSnackbar' :timeout='2500' top>
		<span>Logged out successfully!</span>
		<v-btn flat color='primary' @click='logoutSnackbar = false'>Close</v-btn>
	</v-snackbar>

	<v-toolbar color="primary" app>
		<v-toolbar-side-icon class="secondary--text hidden-md-and-up" v-if='user.id != ""' @click="sidebar = !sidebar"></v-toolbar-side-icon>
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
				<v-btn small flat color='secondary' :to='link.route' slot='activator' @click='handleClick(link.text)'>
					<v-icon small>{{ link.icon }}</v-icon>
					<span class='hidden-lg-and-down'>{{ link.text }}</span>
				</v-btn>
				<span>{{ link.text }}</span>
			</v-tooltip>
		</v-toolbar-items>
	</v-toolbar>

	<v-navigation-drawer app temporary class="primary" v-model="sidebar">
		<v-layout 
			column 
			align-center
			v-if='user.id != ""'
		>
			<v-flex class='mt-5'>
				<v-avatar size='100'>
					<img src='/avatar-1.png'>
				</v-avatar>
				<p class="white--text subheading xs-text-center mt-2">{{ user.name }}</p>
			</v-flex>
		</v-layout>
		<v-list 
			v-for="l in links" 
			:key="l.text"
			dense
		>
			<v-list-tile 
				:to="l.route"
				@click='handleClick(l.text)'
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
import { mapState } from 'vuex';
import { auth } from '../modules/firebaseController'

export default {
	components: {
	},
	data() {
		return {
			sidebar: false,
			snackbar: false,
			logoutSnackbar: false,
			timerSidebar: false,
			allLinks: [
				{ icon: 'dashboard', text: 'Dashboard', route: '/dashboard', security: 'login' },
				// { icon: 'people', text: 'Team', route: '/group', security: 'login' },
				// { icon: 'person', text: 'Profile', route: '/profile', security: 'login' },
				// { icon: 'contacts', text: 'Client', route: '/client', security: 'login' },
				{ icon: 'logout', text: 'Logout', route: '/', security: 'login' }
			],
		}
	},
	computed: {
		...mapState([ 'user' ]),
		links () {
			if (this.user.id === '') return []
			return this.allLinks
		}
	},
	methods: {
		handleClick (txt) {
			if (txt === 'Logout') {
				this.sidebar = false;
				this.logout();
			}
		},
		logout() {
			auth.signOut().then(() => {
				this.logoutSnackbar = true;
				this.$store.commit('logout');
			})
		}
	}
}
</script>