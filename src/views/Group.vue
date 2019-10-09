<template>
<div class="team">
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for='p in team' :key='p.name'>
        <v-card class='tertiary--text text-xs-center ma-3'>
          <v-responsive class='pt-4'>
            <v-avatar size='100' class='white'>
              <img :src='p.avatar'>
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="subheading">{{ p.name }}</div>
            <div class="tertiary--text">{{ p.role }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color='tertiary'>
              <v-icon small left>message</v-icon>
              <span>Message</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
export default {
	data() {
		return {
			team: [
				{ name: 'Connor Lindsey', role: 'Developer', avatar: '/avatar-1.png' },
				{ name: 'Jared Workman', role: 'Developer', avatar: '/avatar-2.png' },
				{ name: 'Ryker Haddock', role: 'Founder', avatar: '/avatar-3.png' },
				{ name: 'Riley White', role: 'Engineer', avatar: '/avatar-4.png' },
				{ name: 'Grant Hagen', role: 'Electrical Engineer', avatar: '/avatar-5.png' },
				{ name: 'Tab McLain', role: 'Mechanical Engineer', avatar: '/avatar-6.png' }			
			]
		}
	}
}
</script>

<style>
card {
	border-left: 9px solid #607D8B;
}
</style>